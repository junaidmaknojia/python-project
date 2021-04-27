export const getMessages = async (channel_id) => {
    const response = await fetch(`/api/messages/${channel_id}`)
    return await response.json()
}