export async function sendPacket(packet = PacketTypes.PING, data = {}) {
    let fetched = await $fetch("/api/v0", {
        method: "POST",
        body: {
            packet,
            user_id: useCookie("password").value ?? null,
            team_id: useCookie("team_id").value ?? null,
            admin_password: useCookie("admin_password").value ?? null,
            data
        }
    })
    fetched["success"] = (fetched["status"] % 2) === 0
    return fetched
}