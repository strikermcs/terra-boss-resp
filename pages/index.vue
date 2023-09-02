<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { bossesToDisplay } from '../helpers'
import { pusherClient } from '../libs/pusher'
import { IBossState, TBossState } from 'types';
import { Bosses } from '@/constants'

const bossesStore = useBossesStore()
const userStore = useUserStore()
const notify = useNotificationStore()

const { bosses, activeServer } = storeToRefs(bossesStore)
const { userDetails } = storeToRefs(userStore)

const bossList = computed(() => {
    return bossesToDisplay(bosses.value, activeServer.value)  
})

const addBoss = (data: IBossState) => {
    if(userDetails.value?.username != data.userAdd) {
            bosses.value.push(data)
            notify.SetNofication('Info', `${data.userAdd} добавил нового босса ${Bosses[data.bossId].name}!`, 'info')
    }
}

const deleteBoss = (data: IBossState) => {
    if(userDetails.value?.username != data.userAdd) {
            bosses.value = bosses.value.filter(b => b.id != data.id)
            notify.SetNofication('Info', `${data.userAdd} удалил босса ${Bosses[data.bossId].name}!`, 'info')
    }
}

const updateBoss = (data: IBossState) => {
    if(userDetails.value?.username != data.userAdd) {
            bosses.value.forEach(b => {
                    if(b.id === data.id) {
                        b.time = data.time as Date,
                        b.date = data.date as Date,
                        b.state = data.state as TBossState,
                        b.isDown = data.isDown as boolean,
                        b.userAdd = data.userAdd as string,
                        b.desc = data.desc
                    }
            })
            notify.SetNofication('Info', `${data.userAdd} переписал ${Bosses[data.bossId].name}!`, 'info')
    }
} 


onMounted(() => {
    pusherClient.subscribe('Bosses')

    pusherClient.bind('boss:add', addBoss)
    pusherClient.bind('boss:update', updateBoss)
    pusherClient.bind('boss:delete', deleteBoss)
})

onBeforeUnmount(() => {
    pusherClient.unsubscribe("Bosses")

    pusherClient.unbind('boss:add', addBoss)
    pusherClient.unbind('boss:update', updateBoss)
    pusherClient.unbind('boss:delete', deleteBoss)

})

definePageMeta({
  layout: "main",
  middleware: ['auth']
});
</script>

<template>

    <div v-if="bossList!.length == 0" class="center">
        <span style="font-style: italic;">Похоже актуальных данных нет, пора поспрашивать знакомых!</span>
    </div>
    <div v-else>
        <TransitionGroup name="list" tag="ul" class="items-list">
            <li 
                class="boss-list"
                v-for="boss in bossList"
                :key="boss.id"
                :class="{'boss-lost' : boss.state === 'lost', 'boss-respawn': boss.state == 'respawn' && !boss.isDown, 'boss-down' : boss.isDown}"
            >
                <BossInfo :boss="boss" />
            </li>
        </TransitionGroup>
    </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.boss-list {
    padding: 15px 10px 15px 10px;
    background: #A5D7AA;
    border-bottom: solid 1px gray;
    transition: all ease 0.5s;
}

.boss-lost {
    background: rgb(248, 162, 162);
}

.boss-respawn {
    background: rgb(164, 164, 222);
}

.boss-down {
    background:rgb(180, 180, 180);
}

.boss-list:hover {
    background:rgb(219, 219, 241);
}



.items-list {
    height:calc(100dvh - 100px);
    overflow-y: auto;
    overflow-x: hidden;
}

@media screen and (max-width: 470px){
    .items-list {
        height:calc(100dvh - 113px);
    }
}
</style>