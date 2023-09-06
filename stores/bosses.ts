import { IBossState, TBossState, TServerName } from '../types'
import { servers } from '@/constants'
import { useNotificationStore } from './notification'
import { db } from '@/libs/firebase'

import { 
    collection, 
    addDoc, 
    query, 
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    Firestore, 
    getDoc } from 'firebase/firestore'


interface IBossesStore {
    bosses: IBossState[]
    activeServer: TServerName
}


export const useBossesStore = defineStore('bosses', {
    state: (): IBossesStore => ({
        bosses: [],
        activeServer: servers[2].name
    }),

    actions: {
       async addBossToList(bossState: IBossState) {
            try {            
                const docRef = await addDoc(collection(db, "bosses"), bossState)
                bossState.id = docRef.id
                this.bosses.unshift(bossState)
                await $fetch('/api/bosses', {
                    method: 'POST',
                    body: bossState
                })
            } catch (error) {
                console.log(error)
            }
       },

       async getAllBosses() {
            try {
                const q = query(collection(db, "bosses"))
                const rezult = await getDocs(q)

                rezult.forEach((doc) => {
                    this.bosses.push({id: doc.id, ...doc.data() as IBossState })
                })
                
            } catch (error) {
                console.log(error)
            }
       },

       async setBossSpawn(id: string) {
            try {
                const docRef = doc(db, "bosses", id)
                const docSnap = await getDoc(docRef)
                if(docSnap.exists()) {
                    const boss = docSnap.data() as IBossState
                    
                    let data: Partial<IBossState>
                    
                    if(boss.state === 'timeToRespawn') {
                        data = {
                            state: 'respawn'
                        }
                    } else return

                    updateDoc(docRef, data).then(() => {
                        this.bosses.forEach(b => {
                            if(b.id === id) {
                                b.state = data.state as TBossState
                            }  
                        })
                        $fetch('/api/resp', {
                            method: 'POST',
                            body: boss
                        })
                    }).catch(() => {
                        console.log('update boss error')
                    })
                }
            } catch (error) {
                console.log('change boss state error')
            }
           
       },
       
       async deleteBoss(id: string) {
            const notify = useNotificationStore()
            const docRef = doc(db, "bosses", id);
            const boss = this.bosses.find(b => b.id === id)
            deleteDoc(docRef).then(() => {
                this.bosses = this.bosses.filter(b => b.id != id)

                notify.SetNofication('Success', 'Удаленно успешно', 'success')
                $fetch('/api/bosses', {
                    method: 'PUT',
                    body: boss
                })
            }).catch(() => {
                notify.SetNofication('Error', 'Ошибка удаления', 'error')
            })  
       },

       async updateBoss(boss: IBossState) {
            const notify = useNotificationStore()
            const docRef = doc(db, "bosses", boss.id as string)

            const data: Partial<IBossState> = {
                time: boss.time,
                date: boss.date,
                state: boss.state,
                userAdd: boss.userAdd,
                isDown: boss.isDown,
                desc: boss.desc,
                autoResp: boss.autoResp
            }

            updateDoc(docRef, data).then(() => {
                this.bosses.forEach(b => {
                    if(b.id === boss.id) {
                        b.time = data.time as Date,
                        b.date = data.date as Date,
                        b.state = data.state as TBossState,
                        b.isDown = data.isDown as boolean,
                        b.userAdd = data.userAdd as string,
                        b.desc = data.desc
                        b.autoResp = data.autoResp as number 
                    }
                })

                // notify.SetNofication('Success', 'Босс обновлен', 'success')
                $fetch('/api/bosses', {
                    method: 'PATCH',
                    body: boss
                })
            }).catch(() => {
                
            })
       }
    },

})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useBossesStore, import.meta.hot));
}

