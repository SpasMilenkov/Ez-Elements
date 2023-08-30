import { createApp } from 'vue'
import "./assets/styles.css"
import App from './App.vue'
import { Icon } from '@iconify/vue'
import router from './router/index'

const app =createApp(App)
app.component('Icon', Icon)
app.use(router)
app.mount('#app')
        