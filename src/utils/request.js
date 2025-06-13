import axios from 'axios'
import { useUserStore} from '@/stores/index'
import router from '@/router';
const VITE_BASE_URL = 'http://big-event-vue-api-t.itheima.net'
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // 基础地址
  timeout: 5000, // 超时时间
})
// 添加请求拦截器
instance.interceptors.request.use( 
  (config)=> {
  const userStore = useUserStore()
    // 在发送请求之前做些什么
  if (userStore.token) {
    config.headers.Authorization=userStore.token; // 设置请求头中的Authorization字段
  }
    return config;
  }, 
  (error)=>Promise.reject(error)
  );

// 添加响应拦截器
instance.interceptors.response.use( (response)=> {
  if(response.data.code === 0) {
    return response;
  }
  console.log('response', response);
  
  ElMessage({message: response.data.message || '请求失败', type: 'error'});
  // alert(response.data.message || '请求失败');
    return Promise.reject(response.data);
  }, (error) => {
    ElMessage({message: error.response.data.message || '网络异常', type: 'error'});
    if(error.response.status === 401) {
      // 如果是 401 错误 ,跳转到登录页
      router.push('/login');
    }
    return Promise.reject(error);
  });

export default instance
export { VITE_BASE_URL } // 导出基础地址