import { DatabaseSync } from 'node:sqlite';
import bcrypt from "bcryptjs";

const database = new DatabaseSync('eurydice.db');

const initDatabase = `
CREATE TABLE IF NOT EXISTS scouts (
    scout_id INTEGER PRIMARY KEY AUTOINCREMENT,
    team INTEGER NOT NULL,
    name TEXT NOT NULL,
    settings BLOB NOT NULL
);

CREATE TABLE IF NOT EXISTS teams (
    team_id INTEGER PRIMARY KEY AUTOINCREMENT,
    team INTEGER NOT NULL,
    join_code INTEGER NOT NULL,
    admin_password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS events (
    team_id INTEGER NOT NULL,
    event TEXT NOT NULL,
    PRIMARY KEY (team_id, event)
);

CREATE TABLE IF NOT EXISTS data (
    data_id INTEGER PRIMARY KEY AUTOINCREMENT,
    team_id TEXT NOT NULL,
    scout_id TEXT NOT NULL,
    scouted_team TEXT NOT NULL,
    scouted_match TEXT,
    event TEXT NOT NULL,
    json BLOB NOT NULL
)
`;

database.exec(initDatabase);

export default defineEventHandler(async (event) => {
    let packet = await readBody(event)

    if (typeof packet !== "object") return

    let type = packet["packet"]
    let data = packet["data"]

    if (type == PacketTypes.PING) {
        return { "status": StatusCodes.GENERIC_SUCCESS, "data": "Pong" }
    } else if (type == PacketTypes.CREATE_TEAM) {
        if (database.prepare("SELECT * FROM teams WHERE team = ?").all(data["team"]).length > 0) {
            return { "status": StatusCodes.ACCOUNT_EXISTS}
        }

        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(packet["admin_password"], salt)
        database.prepare("INSERT INTO teams (team, join_code, admin_password) VALUES (?, ?, ?)").run(data["team"], 10000 + Math.floor(Math.random() * 90000), hash)
        
        return { "status": StatusCodes.ACCOUNT_CREATED }
    } else if (type == PacketTypes.CREATE_SCOUTER) {

    } else if (type == PacketTypes.TEST_CREDENTIALS_TEAM) {

    } else if (type == PacketTypes.TEST_CREDENTIALS_SCOUTER) {

    } else if (type == PacketTypes.GET_USERNAMES) {

    }
    return { "status": StatusCodes.GENERIC_ERROR }
})