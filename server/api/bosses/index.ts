import { pusherServer } from '@/libs/pusher'

export default defineEventHandler(async (event) => {
    if(event.method === 'POST') {
        const body = await readBody(event)
        
       await pusherServer.trigger('Bosses', 'boss:add', body)
    }

    if(event.method === 'PATCH') {
        const body = await readBody(event)

        await pusherServer.trigger('Bosses', 'boss:update', body)
    }

    if(event.method === 'PUT') {
        const body = await readBody(event)
        console.log(body)
        await pusherServer.trigger('Bosses', 'boss:delete', body)
    }
   
})