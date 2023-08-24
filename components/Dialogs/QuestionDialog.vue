<script setup lang="ts">

defineProps({
    visible: {type: Boolean, required: true },
    title: {type: String, default: 'Warning'},
    text: {type: String}
})

const emit = defineEmits<{(e: 'sendAnswer', answer: boolean ): void}>()

const sendAnswer = (answer: boolean) => {
    emit('sendAnswer', answer)
} 
</script>


<template>
    <el-dialog :model-value="visible" :title="title" width="30%" center :show-close="false">
        <span>{{text}}</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="sendAnswer(false)">Отмена</el-button>
                <el-button type="primary" @click="sendAnswer(true)">Подтвердить</el-button>
            </span>
        </template>
  </el-dialog>
</template>