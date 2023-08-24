import PusherServer from "pusher"
import PusherClient from "pusher-js"

export const pusherServer = new PusherServer({
    appId: "1657332",
    key: "91da63c7e02dd1defc9a",
    secret: "7f0536a1e38ffeb4a427",
    cluster: 'eu',
    useTLS: true
})

export const pusherClient = new PusherClient(
    "91da63c7e02dd1defc9a",
    {
        cluster:  'eu'
    }
)