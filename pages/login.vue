<script setup lang="ts">
import { reactive,  ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import type { FormInstance, FormRules } from 'element-plus'
import anime from '~/assets/anime.png'

const router = useRouter()
const loginFormRef = ref<FormInstance>()
const userStore = useUserStore()

const loginForm = reactive({
    email: '',
    password: ''
})


const rules = reactive<FormRules>({
    email: [
        {
            type: 'email', 
            required: true,
            message: 'Email is required',
            trigger: 'change',
        }
    ],
    password: [
        {
            type: 'string',
            required: true,
            message: "Password is required",
            trigger: 'change'
        },
        
        {
            min: 6, 
            message: "Minimum password length 6 characters",
            trigger: 'change' 
        }
    ]
})


const onSubmit = async (formEl: FormInstance | undefined) => {
    if(!formEl) return
    await formEl.validate((valid) => {
        if(valid){
            userStore.login(loginForm.email, loginForm.password)
        }
    })
}

watch(() => userStore.user, (user) => {
    if(user){
        router.push('/')
    }
})



</script>


<template>
    <div class="page">
        <AuthTemplate>
            <template #card-header>Login</template>
            <template #content-image>
                <el-image style="height: 400px" :src="anime"/>
            </template>
            <template #content-form>
                <el-form
                    ref="loginFormRef"
                    label-position="top"
                    label-width="100px"
                    :model="loginForm"
                    :rules="rules"
                    style="min-width: 300px"
                    >
                        <el-form-item label="Введите email:"  prop="email">
                            <el-input 
                            type="email"
                            placeholder="Email"
                            v-model="loginForm.email"/>
                        </el-form-item>
                        <el-form-item label="Введите пароль:"  prop="password">
                            <el-input 
                            type="password"
                            placeholder="Password"
                            v-model="loginForm.password"
                            show-password
                            />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit(loginFormRef)">Авторизоваться</el-button>
                        </el-form-item>
                    </el-form>
            </template>
        </AuthTemplate>
    </div>
</template>

<style scoped>
.page {
   height: 100vh;
   width: 100vw;
   display: flex;
   justify-content: center;
   align-items: center; 
}
</style>