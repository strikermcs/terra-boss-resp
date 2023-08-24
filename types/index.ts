export type TUserRole = 'Admin' | 'User'
export type TBossState = 'respawn' | 'timeToRespawn' | 'lost'
export type TServerName = 'Логрус' | 'Энигма' | 'Гранас'
export type TBossStatus = 'die' | 'respawn'

export interface IServer {
    id: number
    name: TServerName
}

export interface IUser {
    id?: string
    userId: string,
    username: string,
    email: string,
    soundAlert: boolean
    role: TUserRole
}

export interface IUserItem extends IUser {
    list?: number
}

export interface ITime {
    hours: number
    minutes: number
    seconds?: number
}
export interface IBoss {
    id: number,
    name: string,
    text: string,
    image: string,
    time: ITime
}

export interface IBossState {
    id?: string
    bossId: number
    time: Date
    date: Date
    autoResp: number
    isDown: boolean
    state: TBossState
    server: TServerName
    userAdd: string
    desc?: string
}
