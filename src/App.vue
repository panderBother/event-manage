<script setup>
import {useUserStore} from '@/stores/index'
const userStore = useUserStore()

</script>

<template>
<div> 
  <router-view></router-view>
  <hr>
  App
  {{ userStore.token }}
  <el-button @click="userStore.setToken('16584geuyrbfdhvcj')">登录</el-button>
  <el-button @click="userStore.removeToken()">退出</el-button>
</div>
</template>

<style scoped>

</style>
