import './assets/main.scss'
import { pinia } from '@/stores/index'
import { createApp } from 'vue'
import '@/assets/main.scss'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
