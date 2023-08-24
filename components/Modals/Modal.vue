<script setup lang="ts">
import { Close } from '@element-plus/icons-vue';

interface Props {
    isOpen: boolean
    title: string
}

defineProps<Props>()
const emits = defineEmits<{(e: 'close'): void}>() 

const closeHandler = () => {
    emits('close')
}

</script>

<template>
    <Teleport to="body">
        <Transition name="bounce">
            <div class="modal" v-if="isOpen">
                <el-card class="box-card">
                    <template #header>
                        <div class="card-header">
                            <span>{{title}}</span>
                            <el-button :icon="Close" circle @click="closeHandler"/>
                        </div>
                    </template>
                    <slot />
                </el-card>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.modal {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
   
    display: flex;
    justify-content: center;
    z-index: 222;
    align-items: center;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box-card {
  min-width: 350px;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

/* @media screen and (max-width: 600px) {
  .box-card {
    width: 380px;
    height: 500px;
    overflow-y: auto;
  } */

</style>