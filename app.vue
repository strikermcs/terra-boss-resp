<script setup lang="ts">
import { onBeforeMount, watch } from 'vue'
import { auth } from './libs/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import ShowNotification from './utils/notification'

const userStore = useUserStore()
const notify = useNotificationStore()

  watch(() => notify.trigger, () => {
    ShowNotification(notify.notification!.type,
       notify.notification!.title, notify.notification!.message)
  })

  onBeforeMount(() => {
    onAuthStateChanged(auth, (user) => {
        userStore.user = user
    })
  })
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
