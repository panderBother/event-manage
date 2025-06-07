import { createPinia } from 'pinia'
// Import Pinia plugin for persisted state用于持久化状态
import persist from 'pinia-plugin-persistedstate'
export const pinia = createPinia().use(persist)
export * from './modules/user'