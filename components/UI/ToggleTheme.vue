<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Sunny, Moon } from '@element-plus/icons-vue'

const isDark = ref(false)

const themeToggleHandler = () => {
    document.querySelector('html')!.classList.toggle('dark')
    if(document.querySelector('html')!.classList.contains('dark')){
        isDark.value = true
        localStorage.setItem('theme', 'dark')
        return
    }
    isDark.value = false
    localStorage.setItem('theme', 'light')
}

onMounted(() => {
    const theme = localStorage.getItem('theme')

    if(theme) {
        if(theme === 'dark') {
            document.querySelector('html')!.classList.add('dark')
        }
    }
})

</script>

<template>
    <el-icon :size="30" class="theme-button" @click="themeToggleHandler">
         <component :is="isDark ? Sunny : Moon" />
    </el-icon>
</template>

<style scoped>
.theme-button {
    cursor: pointer;
    transition: all 0.4s ease;
}

.theme-button:hover {
    color: rgb(54, 54, 189);
}
</style>