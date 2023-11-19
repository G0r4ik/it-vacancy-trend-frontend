import './style/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router.js'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')

const requireComponent = require.context('../shared/components', true, /\.vue$/)
for (const fileName of requireComponent.keys()) {
  const componentConfig = requireComponent(fileName)
  const componentName = fileName.split('/').pop().split('.')[0]
  app.component(componentName, componentConfig.default || componentConfig)
}
