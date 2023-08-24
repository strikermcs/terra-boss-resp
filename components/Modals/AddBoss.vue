<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useBossesStore } from '@/stores/bosses';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

import { addTimeToBossResp } from '@/helpers'

import { Bosses } from '@/constants'
import { TServerName, IBossState, TBossStatus } from '@/types';

interface BossForm {
  bossId: number
  date: Date | null
  time: Date | null
  status: TBossStatus
  desc: string
}

interface Props {
  server: TServerName
  boss?: IBossState
  update?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{(e: 'close'): void}>()

const userStore = useUserStore()
const { userDetails } = storeToRefs(userStore)

const bossFormRef = ref<FormInstance>()
const bossesStore = useBossesStore()

const bossForm = reactive<BossForm>({
  bossId: props.boss?.bossId || 0,
  date: new Date(),
  time: null,
  status: 'die',
  desc: '',
})

const rules = reactive<FormRules<BossForm>>({
  bossId: [
    {
      required: true,
      message: 'Please select the boss',
      trigger: 'change',
    },
  ],
  date: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ],
  time: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a time',
      trigger: 'change',
    },
  ],
  status: [
    {
      required: true,
      message: 'Please select boss status',
      trigger: 'change',
    },
  ],
  desc: [
    {  message: 'Please input activity form', trigger: 'blur' },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      
      const boss: IBossState = {
        bossId: bossForm.bossId,
        time: addTimeToBossResp(bossForm.bossId, bossForm.time as Date, bossForm.status),
        date: bossForm.date as Date,
        state: "timeToRespawn",
        server: props.server,
        autoResp: 0,
        isDown: false,
        userAdd: userDetails.value?.username as string,
        desc: bossForm.desc
      }
      if(props.update) {
        boss.id = props.boss?.id
        bossesStore.updateBoss(boss)
        closeHandler()
      } else {
        bossesStore.addBossToList(boss)
        closeHandler()
      }
      
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const closeHandler = () => {
  emit('close')
}

</script>

<template>
    <el-form
    ref="bossFormRef"
    :model="bossForm"
    :rules="rules"
    status-icon
  >
    <el-form-item  prop="boss">
      <el-select v-model="bossForm.bossId" :disabled="update" placeholder="Выберите босса">
        <el-option 
            v-for="boss in Bosses"
            :key="boss.id"
            :label="boss.name" :value="boss.id" />
      </el-select>
    </el-form-item>
    <el-form-item  prop="date">
      <el-date-picker
        v-model="(bossForm.date as Date)"
        type="date"
        label="Pick a date"
        placeholder="Выберите дату"
        
      />
    </el-form-item>  
    <el-form-item prop="time">
      <el-time-picker
        v-model="(bossForm.time as Date)"
        label="Pick a time"
        placeholder="Установите время"
      />
    </el-form-item>
    <el-form-item prop="status">
      <el-radio-group v-model="bossForm.status">
        <el-radio label="die">Время смерти</el-radio>
        <el-radio label="respawn">Время респа</el-radio>
      </el-radio-group>
    </el-form-item>
    <!-- <el-form-item label="Activity type" prop="type">
      <el-checkbox-group v-model="ruleForm.type">
        <el-checkbox label="Online activities" name="type" />
        <el-checkbox label="Promotion activities" name="type" />
        <el-checkbox label="Offline activities" name="type" />
        <el-checkbox label="Simple brand exposure" name="type" />
      </el-checkbox-group>
    </el-form-item> -->
    <el-form-item  prop="desc">
      <el-input v-model="bossForm.desc" type="textarea" placeholder="Комментарий"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(bossFormRef)">
        Подтвердить
      </el-button>
      <el-button @click="resetForm(bossFormRef)">Сбросить</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>