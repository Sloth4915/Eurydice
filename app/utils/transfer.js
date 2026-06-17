export async function sendPacket(packet = PacketTypes.PING, data = {}) {
    let fetched = await $fetch("/api/v0", {
        method: "POST",
        body: {
            packet,
            data
        }
    })
    return fetched
}