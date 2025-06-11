<script setup>
import { ref } from 'vue'
import {Plus} from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import {artArticleInsertService,artArticleDetailService,artArticleUploadService} from '@/api/article'
import axios from 'axios'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { VITE_BASE_URL } from '@/utils/request'
const drawer = ref(false)
const defaultForm = {
  title: '',
  cate_id: '',
  cover_img: '',
  content: '',
  state: ''
}
const formModel=ref({
  ...defaultForm
})
const formRef = ref()
const editorRef = ref()
const emit = defineEmits(['success'])
const imgUrl=ref()
const open = async (row) => {
  drawer.value = true
  console.log(row)
  if(row.id){
  const res= await artArticleDetailService(row.id)
      formModel.value=res.data.data
      imgUrl.value=VITE_BASE_URL+formModel.value.cover_img
       // 提交给后台，需要的是 file 格式的，将网络图片，转成 file 格式
    // 网络图片转成 file 对象, 需要转换一下
    formModel.value.cover_img = await imageUrlToFile(imgUrl.value, formModel.value.cover_img)
  }else{
    console.log('新增')
    formModel.value={...defaultForm}
    // 清空表单数据
     imgUrl.value = ''
    editorRef.value.setHTML('')
  }
}
//  上传图片(文件的预览)
const onUploadFile=(file)=>{
      imgUrl.value= URL.createObjectURL(file.raw)
      formModel.value.cover_img=file.raw
      // console.log(formModel.value)
}
// 将网络图片地址转换为File对象
async function imageUrlToFile(url, fileName) {
  try {
    // 第一步：使用axios获取网络图片数据
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const imageData = response.data;

    // 第二步：将图片数据转换为Blob对象
    const blob = new Blob([imageData], { type: response.headers['content-type'] });

    // 第三步：创建一个新的File对象
    const file = new File([blob], fileName, { type: blob.type });

    return file;
  } catch (error) {
    console.error('将图片转换为File对象时发生错误:', error);
    throw error;
  }
}
const onSubmit =async(state)=>{ 
  formModel.value.state=state
  // 转换 formData 数据
  const fd = new FormData()
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }
  if(formModel.value.id){
   await artArticleUploadService(fd)
   ElMessage({
    type: 'success',
    message: '修改成功'
  })
    emit('success','edit')
    drawer.value=false
  }else{
  await artArticleInsertService(fd)
  drawer.value=false
  ElMessage.success('发布成功')
   emit('success', 'add')
  }
 
}
//  暴露open方法给父组件调用
defineExpose({ open })
</script>

<template>
  <el-drawer
  size="50%"
    v-model="drawer"
   :title="formModel.id ? '编辑文章' : '添加文章'"
  >
     <!-- 发表文章表单 -->
    <el-form :model="formModel" ref="formRef" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <channel-select
          v-model="formModel.cate_id"
          width="100%"
        ></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img"> 
        <el-upload
        class="avatar-uploader"
        :auto-upload="false"
        :show-file-list="false"
        :on-change="onUploadFile"
        >
        <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>

         </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
  <quill-editor
    theme="snow"
    v-model:content="formModel.content"
    contentType="html"
  >
  </quill-editor>
</div>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit('已发布')" type="primary">发布</el-button>
        <el-button @click="onSubmit('草稿')" type="info">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor{
  width: 100%;
  :deep(.ql-editor){
    height: 240px;
  }
}
</style>