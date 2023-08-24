<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useBossesStore } from '../stores/bosses'
import { useNotificationStore } from '@/stores/notification'
import { storeToRefs } from 'pinia'
import { bossesListToText } from '../helpers'
import { useRouter } from 'vue-router'

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
    <MainMenu 
        @copy-to-clipboard="copyBossListToClipboard"
        @add-boss="openAddBossModalHandler"
        @refresh="refreshBossesHandler"
        @config="openConfigModalHandler"
        @log-out="logOut"
    />
</template>


<style scoped>

</style>