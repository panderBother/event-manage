<script setup>
import { ref } from 'vue';
import {useUserStore} from '@/stores/index'
import {userUploadAvatarService} from '@/api/user'
import { useRouter } from 'vue-router';
//  上传图片(文件的预览)
const uploadRef = ref()
const router = useRouter()
const userStore = useUserStore()
const imgUrl = ref(userStore.userInfo.user_pic)
const onUploadFile = (file) => {
  const reader = new FileReader()
  reader.readAsDataURL(file.raw)
  reader.onload = () => {
    imgUrl.value = reader.result
  }
}
const onUpdateAvatar = async () => {
  await userUploadAvatarService(imgUrl.value)
  router.push('/')
  ElMessage({ type: 'success', message: '更换头像成功' })
}
</script>
<template>
  <page-container title="更换头像">
    <el-row>
      <el-col :span="12">
        <el-upload
          ref="uploadRef"
          class="avatar-uploader"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onUploadFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <img v-else src="@/assets/avatar.jpg" width="278" />
        </el-upload>
        <br />
        <el-button type="primary" 
         @click="uploadRef.$el.querySelector('input').click()"
        :icon="Plus"
        size="large">
          选择图片
        </el-button>
        <el-button type="success" :icon="Upload" size="large" @click="onUpdateAvatar">
          上传头像
        </el-button>
      </el-col>
    </el-row>
  </page-container>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
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
      width: 278px;
      height: 278px;
      text-align: center;
    }
  }
}
</style>