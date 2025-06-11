import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserStore = defineStore('user', () => {
  const token = ref('')
  //创建一个响应式的token变量，初始值为空字符串
  // token变量用于存储用户的身份验证令牌
  const setToken = (newToken) => {
    token.value = newToken
  }
  //移除token的函数
  //当用户登出或令牌过期时，可以调用此函数来清除token
  const removeToken = () => {
    token.value = ''
  }
  // 将用户信息存储在Pinia的store中
  const userInfo = ref({})
  const setUserInfo = (info) => {
    userInfo.value = info
  }
  return {
    token,
    setToken,
    removeToken,
    userInfo,
    setUserInfo
  }
},
  {
    persist: true // 持久化
  })