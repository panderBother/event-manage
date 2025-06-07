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
  return {
    token,
    setToken,
    removeToken
  }
},
  {
    persist: true // 持久化
  })