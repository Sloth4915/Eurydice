import { DatabaseSync } from 'node:sqlite';
import bcrypt from "bcryptjs";

const database = new DatabaseSync('eurydice.db');

const API_KEY = process.env.NUXT_TBA_KEY

const initDatabase = `
CREATE TABLE IF NOT EXISTS scouts (
    scout_id INTEGER PRIMARY KEY AUTOINCREMENT,
    organization_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    settings BLOB NOT NULL,
    token TEXT,
    session_start INTEGER
);

CREATE TABLE IF NOT EXISTS organizations (
    organization_id INTEGER PRIMARY KEY AUTOINCREMENT,
    team_num INTEGER NOT NULL,
    email TEXT NOT NULL,
    join_code TEXT NOT NULL,
    admin_password TEXT NOT NULL,
    token TEXT,
    session_start INTEGER
);

CREATE TABLE IF NOT EXISTS events (
    event_id INTEGER PRIMARY KEY AUTOINCREMENT,
    organization_id INTEGER,
    event_name TEXT NOT NULL,
    event_code TEXT NOT NULL,
    data_format_id INTEGER NOT NULL,
    teams BLOB,
    matches BLOB,
    scout_schedule BLOB
);

CREATE TABLE IF NOT EXISTS data_format (
    data_format_id INTEGER PRIMARY KEY AUTOINCREMENT,
    organization_id INTEGER NOT NULL,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS data (
    data_id INTEGER PRIMARY KEY AUTOINCREMENT,
    organization_id TEXT NOT NULL,
    scout_id TEXT NOT NULL,
    event_id INTEGER NOT NULL,
    data_format_id INTEGER NOT NULL,
    scouted_team TEXT NOT NULL,
    scouted_match TEXT,
    json BLOB NOT NULL
);
`;

database.exec(initDatabase);

export default defineEventHandler(async (event) => {
    let packet = await readBody(event)

    if (typeof packet !== "object") return

    let type = packet["packet"]
    let data = packet["data"]

    try {
        if (type == PacketTypes.PING) {
            return { "status": StatusCodes.SUCCESS, "data": "Pong" }
        } else if (type == PacketTypes.CREATE_ORGANIZATION) {
            if (database.prepare("SELECT * FROM organizations WHERE team_num = ? OR email = ?").all(data["team"], data["email"]).length > 0) {
                return { "status": StatusCodes.EXISTS_ERROR }
            }

            let salt = bcrypt.genSaltSync(10)
            let hash = bcrypt.hashSync(data["password"], salt)

            let result = database.prepare("INSERT INTO organizations (team_num, email, join_code, admin_password) VALUES (?, ?, ?, ?)").run(data["team"], data["email"], ("" + (+10000 + Math.floor(Math.random() * 90000))), hash)
            console.log(result)
            return { "status": StatusCodes.SUCCESS, "team": data["team"], "email": data["email"], "token": loginOrg(result.lastInsertRowid) }
        } else if (type == PacketTypes.LOGIN_ORGANIZATION) {
            console.log(data)
            let org = database.prepare("SELECT * FROM organizations WHERE team_num = ? OR email = ?").all(data["team"], data["email"])
            if (org.length == 1) {
                console.log(org)
                if (bcrypt.compareSync(data["password"], org[0]["admin_password"])) {
                    return { "status": StatusCodes.SUCCESS, token: loginOrg(org[0]["organization_id"]) }
                } return { "status": StatusCodes.BAD_CREDENTIALS }
            }
            return { "status": StatusCodes.BAD_CREDENTIALS }
        } 
        else if (type == PacketTypes.TBA_REQUEST) {
            if (!data["suburl"].startsWith("/")) data["suburl"] = "/" + data["suburl"]
            try {
                let response = await $fetch("https://www.thebluealliance.com/api/v3" + data["suburl"], { headers: {"X-TBA-Auth-Key": API_KEY} })
                return { "status": StatusCodes.SUCCESS, "data": response }
            } catch (e) {
                console.log("TBA Error")
                return { "status": StatusCodes.GENERIC_ERROR }
            }
        }
    } catch (e) {
        console.log("ERROR!!! WEE WOO WEE WOO")
        console.log(e)
        return { "status": StatusCodes.GENERIC_ERROR }
    }
    return { "status": StatusCodes.GENERIC_ERROR }
})

function loginOrg(orgId) {
    let tokenSalt = bcrypt.genSaltSync(10)
    let token = bcrypt.hashSync(Math.random() + "", tokenSalt)
    
    database.prepare(`
        UPDATE organizations
        SET token = ?, session_start = ?
        WHERE organization_id = ?;
    `).run(token, Date.now(), orgId)
    
    return token
}

// database.prepare("INSERT INTO teams (team, join_code, admin_password) VALUES (?, ?, ?)").run(data["team"], 10000 + Math.floor(Math.random() * 90000), hash)
