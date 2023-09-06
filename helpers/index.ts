import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { Bosses } from '@/constants'
import { IBossState, TBossStatus, TServerName } from '@/types'

export const getTime = (value: any) => {
    
    if(value instanceof Date) {
        return dayjs(value).format("HH:mm:ss")
    }

    if(typeof(value) === 'string') {   
        const date = new Date(value)
        return dayjs(date).format("HH:mm:ss")
    }
  
    const date = new Date(value.seconds * 1000)

    return dayjs(date).format("HH:mm:ss")
}

export const getDate = (value: any) => {
      
    if(value instanceof Date) {
        return dayjs(value).format('DD.MM.YYYY')
    }

    if(typeof(value) === 'string') {   
        const date = new Date(value)
        return dayjs(date).format('DD.MM.YYYY')
    }

    const date = new Date(value.seconds * 1000)

    return dayjs(date).format('DD.MM.YYYY')
}

export const getFullDate = (value: any) => {
      
    if(value instanceof Date) {
        return dayjs(value).format('DD.MM.YYYY HH:mm:ss')
    }

    if(typeof(value) === 'string') {   
        const date = new Date(value)
        return dayjs(date).format('DD.MM.YYYY HH:mm:ss')
    }

    const date = new Date(value.seconds * 1000)

    return dayjs(date).format('DD.MM.YYYY HH:mm:ss')
}
       

export const getDiffTime = (value: any) => {
    dayjs.extend(duration)
    let temp
    
    if(value instanceof Date) {
        temp = value
    } 
    else if(typeof(value) === 'string') {
        temp = new Date(value)
    }
    else { 
        temp = new Date(value.seconds * 1000) 
    }  

    const now = new Date()
    const diffHour = dayjs(temp).diff(now, 'hour')
    const diffMinutes = dayjs(temp).diff(now, 'minutes')
    const diffSeconds = dayjs(temp).diff(now, 's')
   
    const timeDifference = dayjs.duration(dayjs(temp).diff(now))
    return {
        display: `${timeDifference.hours().toString().padStart(2, '0')}:${timeDifference.minutes().toString().padStart(2, '0')}:${timeDifference.seconds().toString().padStart(2, '0')}`,
        hour: diffHour,
        minutes: diffMinutes,
        seconds: diffSeconds
    }
} 


export const addTimeToBossResp = (bossId: number, time: Date, status: TBossStatus): Date => {
    
    if(status === 'die') {
        const hour = dayjs(time).add(Bosses[bossId].time.hours, 'hour')
        const minute = dayjs(hour).add(Bosses[bossId].time.minutes, 'minute')
     
    
        return minute.toDate()
    }
    
   return time
}

export const addTimeToBossAutoResp = (bossId: number) => {
    const date = new Date()

    const hour = dayjs(date).add(Bosses[bossId].time.hours, 'hour')
    const minute = dayjs(hour).add(Bosses[bossId].time.minutes, 'minute') 
    
    return minute.toDate()
}  

export const bossesToDisplay = (bosses: IBossState[], server: TServerName) => {  
    const bossesFiltered = bosses.filter(b => b.server === server)
    //@ts-ignore
    const sorted = bossesFiltered.sort((a, b) => a.time - b.time)
    const downBosses = sorted.filter(b => b.isDown === true) 
    const bosseslost = sorted.filter(b => b.state === 'lost')
    
    let listWithotDownBosses 

    if(downBosses) {
        listWithotDownBosses = sorted.filter(b => b.isDown === false)
        downBosses.forEach(b => {
            listWithotDownBosses.push(b)
        })
    } 

    if(bosseslost) {
        if(downBosses){
                const listWithoutLostBosses = listWithotDownBosses!.filter(b => b.state != 'lost')
                bosseslost.forEach(b => {
                listWithoutLostBosses.push(b)
            })

            return listWithoutLostBosses
        }
        
        const listWithoutLostBosses = sorted.filter(b => b.state != 'lost')
        bosseslost.forEach(b => {
            listWithoutLostBosses.push(b)
        })

        return listWithoutLostBosses
    }

    if(downBosses) {
        return listWithotDownBosses
    }

    return sorted
    
}

export const bossesListToText = (bosses: IBossState[]) => {
    let str: string = ''

    bosses.forEach(b => {
        str+= `
            //---------------------------------//
            Босс: ${Bosses[b.bossId].name}
            Описание: ${Bosses[b.bossId].text}
            Время респа: ${getFullDate(b.time)}
            Добавил: ${b.userAdd}
            Комментарий: ${b.desc}
            Дата: ${getDate(b.date)}
            //--------------------------------//
                                                    
        `
    })

    return str
}

export const isAutoRespawn = (boss: IBossState) => {
    if(boss.state === 'respawn') {
        if(getDiffTime(boss.time).minutes <= -2) {
            return true
        }
        return false
    }
   return false
}   