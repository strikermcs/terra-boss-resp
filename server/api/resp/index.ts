import { pusherServer } from '@/libs/pusher'

export default defineEventHandler(async (event) => {
    if(event.method === 'POST') {
        const body = await readBody(event)
        
       await pusherServer.trigger('Bosses', 'boss:respawn', body)
    }
})