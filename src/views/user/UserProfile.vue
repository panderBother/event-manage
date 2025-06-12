<script setup>
import { ref} from 'vue'
import {userUpdateService } from '@/api/user'
import { useUserStore } from '@/stores/index'
import { useRouter } from 'vue-router'

const store = useUserStore()
const {username, nickname, email, id} = store.userInfo
const router = useRouter()
const form=ref({
  username, nickname, email, id
})
const formRef=ref()

const rules = {
  nickname: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    {
      pattern: /^\S{2,10}$/,
      message: '昵称必须是2-10位的非空字符串',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入用户邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ]
}
const handleSubmit = async() => { 
   const valid = await formRef.value.validate()
   if(valid) {
    await userUpdateService(form.value)
    ElMessage.success('用户资料修改成功')
    router.push('/')
   }
}

</script>
<template>
  <el-card>
    <template #header>基本资料</template>
    <el-form ref="formRef" :rules="rules" :model="form" label-width="80px" style="max-width:400px">
      <el-form-item label="用户名">
        <el-input v-model="form.username" disabled />
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.nickname" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交修改</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>