import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import axios from 'axios'

const app = createApp(App)

// Vue3 挂载全局变量
app.config.globalProperties.$axios = axios.create({
  timeout: 3000
})

app.mount('#app')