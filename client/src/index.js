import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index'
const app = createApp(App)
// import mitt from 'mitt'
// const emitter = mitt()
// app.config.globalProperties.emitter = emitter
import router from './router/router'
app.use(store)
app.use(router)
app.mount('#app')
import './style/main.css'
