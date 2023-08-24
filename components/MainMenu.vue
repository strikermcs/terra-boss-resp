<script setup lang="ts">
import { CopyDocument, Plus, RefreshRight, Tools, SwitchButton  } from '@element-plus/icons-vue'

const emits = defineEmits<{
    (e: 'copyToClipboard'): void,
    (e: 'addBoss'): void,
    (e: 'refresh'): void,
    (e: 'config'): void,
    (e: 'logOut'): void
}>()

const copyBossListToClipboard = () => {
    emits('copyToClipboard')
}

const openAddBossModalHandler = () => {
    emits('addBoss')
}

const refreshBossesHandler = () => {
    emits('refresh')
}

const openConfigModalHandler = () => {
    emits('config')
}

const logOut = () => {
    emits('logOut')
}

</script>

<template>
    <div class="items">
                    <ul class="menu-items-list">
                        <li class="item-li" @click="copyBossListToClipboard">
                            <el-icon :size="19" class="menu-icon">
                                <CopyDocument />
                            </el-icon>
                        </li>
                        <li class="item-li" @click="openAddBossModalHandler">
                            <el-icon :size="19" class="menu-icon">
                                <Plus />
                            </el-icon>
                        </li>
                        <li class="item-li" @click="refreshBossesHandler">
                            <el-icon :size="19" class="menu-icon" >
                                <RefreshRight />
                            </el-icon>
                        </li>
                        <li class="item-li" @click="openConfigModalHandler">
                            <el-icon :size="19" class="menu-icon" >
                                <Tools />
                            </el-icon>
                        </li>
                        <li class="item-li" @click="logOut">
                            <el-icon :size="19" class="menu-icon" >
                                <SwitchButton />
                            </el-icon>
                        </li>
                    </ul>
                </div>
</template>

<style scoped>
.items {
    display: flex;
    align-items: center;
}

.menu-icon {
    color: white;
}

.menu-items-list {
    display: flex;
    gap: 25px;
}

.item-li {
    padding: 5px 8px 5px 8px;
    border-radius: 5px;
    cursor: pointer;
}

.item-li:hover {
    background:  #f8a048;
}
</style>