<script setup>
import { ref } from 'vue'
import { artArticleAddService, artArticleEditService } from '@/api/article'
// 默认不显示
const dialogVisible = ref(false)

const emit = defineEmits(['success'])
const formData = ref({
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9\u4e00-\u9fa5]{1,20}$/, message: '分类名称只能包含中文、英文和数字且长度为1-20个字符', trigger: 'blur' }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9\u4e00-\u9fa5]{1,20}$/, message: '分类别名只能包含中文、英文和数字且长度为1-20个字符', trigger: 'blur' }
  ]
})
const formRef = ref()
const openDialog = async (row) => {
  dialogVisible.value = true
  // 可以在这里处理 row 数据
  console.log('打开编辑对话框，行数据:', row)
  formData.value = {...row } // 将 row 数据赋值给 formData
}
// 对外提供 openDialog 方法
defineExpose({
  openDialog
})
// 提交表单数据
const handleSubmit = async () => {
  await formRef.value.validate() // 验证表单数据
  formData.value.id ? await artArticleEditService(formData.value) : await artArticleAddService(formData.value)
 ElMessage({
    type: 'success',
    message: formData.value.id ? '编辑成功' : '添加成功'
  })
  dialogVisible.value = false // 提交后关闭对话框
  // 通知父组件操作成功
  emit('success') // 触发 success 事件
}

</script>
<template>
  <el-dialog v-model="dialogVisible" title="编辑分类">
    <el-form ref="formRef">
      <el-form-item label="分类名称">
        <el-input v-model="formData.cate_name" minlength="1" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="分类别名">
        <el-input v-model="formData.cate_alias" minlength="1" maxlength="20"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </template>
  </el-dialog>
</template>