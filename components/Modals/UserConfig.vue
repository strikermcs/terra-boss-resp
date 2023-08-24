<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

interface AddUserForm {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const userStore = useUserStore()
const { userDetails } = storeToRefs(userStore)

const editUserFormRef = ref<FormInstance>()

const editUserForm = reactive<Partial<AddUserForm>>({
  username: '',
  password: '',
  confirmPassword: ''
})


const rules = reactive<FormRules<Partial<AddUserForm>>>({
  username: [
    { required: true, message: 'Please input  username', trigger: 'blur' },
    { min: 3, max: 15, message: 'Length should be 3 to 15', trigger: 'blur' },
  ],
  email: [
    {
      required: true,
      message: 'Please enter email',
      trigger: 'change',
    },
    {
      type: 'email',
      message: 'Please input correct email address',
      trigger: ['blur', 'change'],
    },
  ],
  password: [
    {
      required: true,
      min: 3,
      max: 15, 
      message: 'Length should be 3 to 15', 
      trigger: 'blur'
    },
  ],
})


const saveSettings = async () => {
  await userStore.updateUserSettings(userDetails.value!.soundAlert)
}

const resetUpdateUserForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const submitUpdateUserForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      userStore.updateUser(editUserForm.username as string, editUserForm.password as string)
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>


<template>
    <div class="content">
        <div class="sound-settings">
            <span>Звуковое предупреждение:</span>
            <el-switch v-model="userDetails!.soundAlert" active-text="Вкл." inactive-text="Выкл." />
            <el-button type="primary" @click="saveSettings">Сохранить</el-button>
        </div>
        <div class="settings">
            <h3 class="form-header">Изменить пароль, ник</h3>
            <el-form ref="editUserFormRef" :model="editUserForm" :rules="rules" class="demo-ruleForm" status-icon>
                <el-form-item prop="username">
                    <el-input v-model="editUserForm.username" placeholder="Username" />
                </el-form-item>
                <el-form-item>
                    <el-input v-model="editUserForm.password" type="password" placeholder="Enter password" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitUpdateUserForm(editUserFormRef)">
                        Изменить
                    </el-button>
                    <el-button @click="resetUpdateUserForm(editUserFormRef)">Сбросить</el-button>
                </el-form-item>
        </el-form>
        </div>
    </div>
</template>

<style scoped>
.content {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.sound-settings {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0px 10px 0px;
    
}

.form-header {
    margin-bottom: 10px;
} 
</style>