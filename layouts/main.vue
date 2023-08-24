<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useBossesStore } from '@/stores/bosses'; 

const bossesStore = useBossesStore()
const userStore = useUserStore()
const loading  = ref<boolean>(true)


onMounted(async () => {
    await bossesStore.getAllBosses()
    await userStore.getUserDetails()
    loading.value = false
})

</script>

<template>
    <div v-if="loading" class="center">
        <UILoader />
    </div>
   <div class="common-layout" v-else>
    <el-container>
      <el-header class="header">
          <TheHeader />
      </el-header>
      <el-main class="main">
        <slot />
      </el-main>
    </el-container>
  </div>
  <div class="footer">
      <TheFooter />
  </div>        
</template>

<style scoped>
.header {
  background: #FF8D1D;
  box-shadow: 3px 7px 8px -7px rgba(0,0,0,0.75);
  overflow: hidden;  
}

.center {
    display: flex;
    position: absolute;
    z-index: 223;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
}

.footer {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  background: #FF8D1D;
  box-shadow: 3px 7px 8px -7px rgba(0,0,0,0.75);
  overflow: hidden;
  /* display: flex; */
  justify-content: center;
  padding: 10px 0px 10px 0px;  
}

@media screen and (max-width: 470px){
  .main {
    padding: 0;
  }

  .footer { 
    display: flex;
  }
}
</style>