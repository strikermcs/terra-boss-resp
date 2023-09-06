<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted } from 'vue'
import { Bosses } from '../constants'
import { IBossState } from '../types';
import { useBossesStore } from '../stores/bosses'
import { useUserStore } from '../stores/user';
import { storeToRefs } from 'pinia';
import { getTime, getDiffTime, getDate, isAutoRespawn, addTimeToBossAutoResp } from '../helpers'
import alert5minutes from '~/assets/alerts/alert5minutes.wav'
import alert1minutes from '~/assets/alerts/alert1minutes.wav'
import { 
    Guide, 
    Bottom, 
    Delete, 
    EditPen, 
    More, 
    Timer,
    CircleCloseFilled,
    Cpu, 
    SuccessFilled } from '@element-plus/icons-vue';

interface Props {
    boss: IBossState
}

const bossesStore = useBossesStore()
const userStore = useUserStore()
const differentTime = ref<string>('')
const updateBossModal = ref<boolean>(false) 
const loading = ref<boolean>(false)
const columnSpan = ref<number>(12)

const props = defineProps<Props>() 

const { userDetails } = storeToRefs(userStore)

const diffTime = () => {
    if(props.boss.state === 'timeToRespawn') {
        const diffTime = getDiffTime(props.boss.time)
        
        if(userDetails.value?.soundAlert) {
            if(diffTime.seconds == 300) {
                const audio = new Audio(alert5minutes)           
                audio.play()
            }  
            if(diffTime.seconds == 60) {
                const audio = new Audio(alert1minutes)           
                audio.play()
            }
        }

        if(diffTime.seconds <= 0) {
                clearInterval(timeInterval)
                bossesStore.setBossSpawn(props.boss.id as string)
        }       differentTime.value = diffTime.display
    } else {
        clearInterval(timeInterval)
    }
}

const autoRespawnBoss = async () => {
    if(isAutoRespawn(props.boss)) {
        const boss: IBossState = {
        id: props.boss.id,    
        bossId: props.boss.bossId,
        time: addTimeToBossAutoResp(props.boss.bossId),
        date: props.boss.date as Date,
        state: "timeToRespawn",
        server: props.boss.server,
        autoResp: props.boss.autoResp + 1,
        isDown: false,
        userAdd: 'Auto Respawn',
        desc: props.boss.desc
      }

      
      await bossesStore.updateBoss(boss)

      timeInterval = setInterval(diffTime, 1000)
    }
}


let timeInterval = setInterval(diffTime, 1000)
let autoRespInterval = setInterval(autoRespawnBoss, 1000) 

const deleteBossHandler = async () => {
    loading.value = true
    await bossesStore.deleteBoss(props.boss.id as string)
    loading.value = false
}

const openUpdateBossModal = () => {
    updateBossModal.value = true
}

const closeUpdateBossModal = async () => {
    updateBossModal.value = false
    timeInterval = setInterval(diffTime, 1000)
}

const setBossDown = async () => {
    loading.value = true
    const boss = props.boss
    boss.isDown = true
    await bossesStore.updateBoss(boss)
    loading.value = false
}


const setBossStatusLost = async () => {
    loading.value = true
    const bossUpdated = props.boss
    bossUpdated.state = 'lost'
    await bossesStore.updateBoss(bossUpdated)
    loading.value = false
}

onMounted(() => {
    if (window.screen.width <= 756) {
        columnSpan.value = 24
    }
})

onBeforeUnmount(() => {
    clearInterval(timeInterval)
    clearInterval(autoRespInterval)
})
</script>

<template>
    <ModalsModal :is-open="updateBossModal" title="Переписать" @close="closeUpdateBossModal">
        <ModalsAddBoss :server="boss.server" update :boss="boss" @close="closeUpdateBossModal"/>
    </ModalsModal> 
    <el-row class="boss-info" :gutter="50">
        <div v-if="loading" class="loading">
            <UILoader />
        </div>
        <el-col :span="columnSpan" class="column">
            <el-tooltip :content="Bosses[boss.bossId].text" placement="top" effect="dark">
                <div class="boss-main">
                    <div>
                        <img
                            class="boss-img" 
                            :src="Bosses[boss.bossId].image" alt="boss_img"/>
                    </div>
                    <div class="boss-name">
                        {{Bosses[boss.bossId].name}}
                    </div>
                </div>
            </el-tooltip>
            <el-tooltip
                :content="`<span>Создал: ${boss.userAdd}<br/><strong>Дата: ${getDate(boss.date)}</strong><br/>Комент: ${boss.desc}</span>`"
                raw-content
            >
                <div class="boss-time">
                    <div class="time-item">{{getTime(boss.time)}}</div>
                    <div v-if="boss.state ==='timeToRespawn'" class="time-item">
                    <div class="auto-resp" v-if="boss.autoResp > 0">
                        <el-icon :size="30"><Cpu /></el-icon>
                        <div class="resp-val">{{boss.autoResp}}</div>  
                    </div>    
                    <span>{{differentTime}}</span>
                    <el-icon 
                        color="blue" 
                        :size="20" 
                        class="icon-info info-icon"
                        :class="{'icon-an' : getDiffTime(boss.time).seconds < 300, 
                                    'color-green': getDiffTime(boss.time).seconds < 300 && getDiffTime(boss.time).seconds >= 60, 
                                    'color-red': getDiffTime(boss.time).seconds < 60 }"
                        >
                            <Timer />
                        </el-icon> 
                    </div>
                    <div 
                        class="item-boss-state-info"
                        v-else-if="boss.state === 'respawn'"
                    >
                        <div class="time-item">
                            <span>Реснулся!</span>
                            <el-icon color="blue" :size="20" class="icon-info"><SuccessFilled /></el-icon>             
                        </div>
                    </div>
                    <div 
                        class="item-boss-state-info"
                        v-else
                    >
                        <div class="time-item">
                            <span>Потерян!</span>
                            <el-icon color="red" :size="20" class="icon-info"><CircleCloseFilled /></el-icon>
                        </div>
                    </div>
                </div>
            </el-tooltip>
        </el-col>
        <el-col :span="columnSpan" class="column">
            <div class="action-buttons">
                <el-button type="warning" plain :icon="EditPen" @click="openUpdateBossModal">Переписать</el-button>
                <el-button type="warning" plain :icon="Guide" @click=setBossStatusLost>Потерян!</el-button>
            </div>
            <div class="pc-actions">
                <el-button type="warning" plain :icon="Bottom" circle @click="setBossDown"/>
                <el-button type="warning" plain :icon="Delete" circle @click="deleteBossHandler"/>
            </div>
            <div class="mobile-actions">
                <el-dropdown>
                    <el-button type="warning" plain :icon="More" circle />
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item :icon="Bottom" @click="setBossDown">Потерян!</el-dropdown-item>
                            <el-dropdown-item :icon="Delete" @click="deleteBossHandler">Удалить</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>  
            </div>
        </el-col>
    </el-row>
</template>

<style scoped>
.boss-info {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: space-between;
}

.column {
    display: flex;
    justify-content: space-between;

}

.auto-resp {
    position: absolute;
    top: -8px;
    left: -15px;
}



.loading {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: 100%;
    top: -12px;
    left: 0;
}

.boss-main {
    display: flex;
    align-items: center;
    gap: 25px;
    width: 200px;
    cursor: pointer;
}

.boss-img {
    width: 50px;
    height: 50px;
    border-radius: 5px;
}

.boss-time {
    display: flex;
    width: 250px;
    align-items: center;
    cursor: pointer;
}

.item-boss-state-info {
    width:calc(250px / 2);
    text-align: center;
}

.time-item {
    text-align: center;
    width:calc(250px / 2);
    position: relative;
}

.icon-info {
    position: absolute;
    top: -2px;
    right: 0; 
}

.resp-val {
    position: absolute;
    top: 8px;
    left: 11px;
    color:crimson;
}

.color-red {
    color: red;
}

.color-green {
    color: green;
}

.icon-an {
    animation: glowing 1300ms infinite;
}

@keyframes glowing {
    0% { opacity: 0;}
    100% { opacity: 1;}
}

.mobile-actions {
    display: none;
}

@media screen and (max-width: 1024px) {
    .mobile-actions {
        display: block;
    }

    .pc-actions {
        display: none;
    }
}

@media screen and (max-width: 870px) {
    .boss-main {
        width: 100px;
        gap: 10px
    }
    
    .boss-time {
        width: 180px;
    }

    .time-item {
        text-align: center;
        width:calc(180px / 2);
        position: relative;
    }
    .icon-info {
        position: absolute;
        top: -2px;
        right: -10px; 
    }
}    

@media screen and (max-width: 756px){
    .boss-info {
        flex-direction: column;
        align-items: normal;
        min-width: 350px;
    }

    .info-icon {
        top: -4px;
        right: -4px;
    }

}

</style>