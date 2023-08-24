<script setup lang="ts">
import { ref } from 'vue'
import { servers } from '../constants'
import { useUserStore } from '../stores/user'
import { useBossesStore } from '@/stores/bosses'
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router'
import { useNotificationStore } from '@/stores/notification'
import { bossesListToText } from '../helpers'


const userStore = useUserStore()
const bossesStore  = useBossesStore()
const notify = useNotificationStore()
const router = useRouter()
const addBossModal = ref<boolean>(false)
const configModal = ref<boolean>(false)

const { activeServer, bosses } = storeToRefs(bossesStore)
const { userDetails } = storeToRefs(userStore)

const logOut = () => {
    userStore.singOut()
    router.push('/login')
}


const openAddBossModalHandler = () => {
    addBossModal.value = true
}

const closeAddBossModalHandler = () => {
    addBossModal.value = false
}

const openConfigModalHandler = () => {
    configModal.value = true
}

const closeConfigModalHandler = () => {
    configModal.value = false
}

const refreshBossesHandler = async () => {
    bossesStore.bosses = []
    await bossesStore.getAllBosses()
}

const copyBossListToClipboard = () => {
    const list = bosses.value.filter(b => b.server === activeServer.value)
    navigator.clipboard.writeText(bossesListToText(list))
    notify.SetNofication('Success', 'Таблицу успешно скопированно в буфер!', 'success')
}

</script>

<template>
        <ModalsModal :is-open="addBossModal" title="Выберите Босса или Элиту" @close="closeAddBossModalHandler">
            <ModalsAddBoss :server="activeServer" @close="closeAddBossModalHandler"/>
        </ModalsModal>
        <ModalsModal :is-open="configModal" title="Настройки" @close="closeConfigModalHandler">
            <ModalsAdminConfig v-if="userDetails?.role === 'Admin'"/>
            <ModalsUserConfig v-else />
        </ModalsModal>
        <div class="header-menu">
            <div class="menu-items">
                <div>
                    <el-select v-model="activeServer" class="m-2">
                        <el-option
                            v-for="item in servers"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name"
                        />
                    </el-select>
                </div>
                <MainMenu 
                    @copy-to-clipboard="copyBossListToClipboard"
                    @add-boss="openAddBossModalHandler"
                    @refresh="refreshBossesHandler"
                    @config="openConfigModalHandler"
                    @log-out="logOut"
                    class="main-menu"
                />
            </div>
            <div class="header-user">
                <UIToggleTheme />
                <span class="user">{{userDetails?.username}}</span>
            </div>
        </div>
</template>

<style scoped>
.header-menu {
    display: flex;
    padding-top: 15px;
    justify-content: space-between;
    align-items: center;
}

.menu-items {
    display: flex;
    gap: 20px;
}

.menu-icon {
    color: white;
}

.user {
    color: white;
}

.header-user {
    display: flex;
    align-items: center;
    gap: 30px;
}

@media screen and (max-width: 740px){
    .header-user {
        display: none;
    }
}

@media screen and (max-width: 470px){
  .main-menu {
    display: none;
  }
}
</style>


