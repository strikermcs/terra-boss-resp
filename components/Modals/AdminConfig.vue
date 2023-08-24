<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { DeleteFilled } from '@element-plus/icons-vue'

interface AddUserForm {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const userStore = useUserStore()

const { users, userDetails } = storeToRefs(userStore)
const loading = ref<boolean>(true)
const addUserFormRef = ref<FormInstance>()
const editUserFormRef = ref<FormInstance>()
const addUserForm = reactive<AddUserForm>({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const editUserForm = reactive<Partial<AddUserForm>>({
  username: '',
  password: '',
  confirmPassword: ''
})

//@ts-ignore
const validatePassword1 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (addUserForm.confirmPassword !== '') {
      if (!addUserFormRef.value) return
      addUserFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}

//@ts-ignore
const validatePassword2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== addUserForm.password) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}


const rules = reactive<FormRules<AddUserForm>>({
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
      validator: validatePassword1,
      trigger: 'blur'
    },
  ],
  confirmPassword: [
    {
      required: true,
      validator: validatePassword2,
      trigger: 'blur'
    },
  ]
})


const saveSettings = async () => {
  await userStore.updateUserSettings(userDetails.value!.soundAlert)
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      userStore.register(addUserForm.username, addUserForm.email, addUserForm.password)
    } else {
      console.log('error submit!', fields)
    }
  })
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

onMounted(async () => {
  await userStore.getAllUsers()
  loading.value = false
})

</script>

<template>
  <div class="loading" v-if="loading">
    <UILoader />
  </div>
  <div class="modal-content" v-else>
    <div class="admin-content">
      <div class="add-user">
        <h3 class="form-header">Добавить пользователя</h3>
        <el-form ref="addUserFormRef" :model="addUserForm" :rules="rules" class="demo-ruleForm" status-icon>
          <el-form-item prop="username">
            <el-input v-model="addUserForm.username" placeholder="Username" />
          </el-form-item>
          <el-form-item prop="email">
            <el-input v-model="addUserForm.email" placeholder="Email" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="addUserForm.password" type="password" placeholder="Enter password" />
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input v-model="addUserForm.confirmPassword" type="password" placeholder="Confirm password" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(addUserFormRef)">
              Добавить
            </el-button>
            <el-button @click="resetForm(addUserFormRef)">Сбросить</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="user-list">
        <h3 class="form-header">Список всех юзеров:</h3>
        <div>
          <ul class="user-list-ul">
            <li v-for="user in users" :key="user.id" class="user-list-item" :class="{ 'admin': user.role === 'Admin' }">
              <span class="username">{{ user.username }}</span>
              <el-icon v-if="user.role === 'User'" class="icon-delete">
                <DeleteFilled />
              </el-icon>
              <span>{{ user.role }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
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
.admin-content {
  display: flex;
  gap: 30px
}

.user-list-ul {
  padding: 5px;
  border: 1px solid gray;
  border-radius: 5px;
  width: 250px;
  height: 220px;
  overflow-y: scroll;
}

.sound-settings {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0px 10px 0px;
}

.icon-delete:hover {
  color: red;
}

.form-header {
  margin-bottom: 10px;
}

.user-list-item {
  display: flex;
  justify-content: space-between;
  padding: 5px;
  margin-bottom: 1px;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.4s ease;
}

.user-list-item:hover {
  border: 1px solid gray;
  border-radius: 3px;
  background: rgba(197, 197, 197, 0.586);
}

.admin {
  background: rgb(246, 68, 68);
  color: rgb(187, 187, 187);
}

.username {
  width: 100px;
}

@media screen and (max-width: 600px) {
  .admin-content {
    flex-direction: column;
  }

  .modal-content {
    height: 400px;
    width: 350px;
    padding: 5px;;
    overflow-y: auto;
  }
  .sound-settings {
    flex-wrap: wrap;
  }
}
</style>