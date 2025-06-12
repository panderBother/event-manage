<script setup>
import { ref } from 'vue'
import { userUpdatePasswordService } from '@/api/user'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const router=useRouter()

const form = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})

const rules = {
  old_pwd: [
    { required: true, message: '请输入旧密码', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度6-15位', trigger: 'blur' }
  ],
  new_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度6-15位', trigger: 'blur' }
  ],
  re_pwd: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    { validator: (rule, value, callback) => {
      if (value !== form.value.new_pwd) {
        callback(new Error('两次输入的新密码不一致'))
      } else {
        callback()
      }
    }, trigger: 'blur' }
  ]
}

const formRef = ref()

const handleSubmit = async () => {
    await formRef.value.validate()
    await userUpdatePasswordService(form.value)
    ElMessage.success('密码修改成功')
    form.value.old_pwd = ''
    form.value.new_pwd = ''
    form.value.re_pwd = ''
    router.push('/')
}
</script>
<template>
  <el-card>
    <template #header>修改密码</template>
    <el-form :model="form" :rules="rules" ref="formRef" label-width="100px" style="max-width:400px">
      <el-form-item label="旧密码" prop="old_pwd">
        <el-input v-model="form.old_pwd" type="password" />
      </el-form-item>
      <el-form-item label="新密码" prop="new_pwd">
        <el-input v-model="form.new_pwd" type="password" />
      </el-form-item>
      <el-form-item label="确认新密码" prop="re_pwd">
        <el-input v-model="form.re_pwd" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">修改密码</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>