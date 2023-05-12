import { createRouter, createWebHistory } from 'vue-router'
import PageCompare from '../pages/PageCompare.vue'
import PageOther from '../pages/PageOther.vue'
import PageToolsList from '../pages/PageToolsList.vue'

const routes = [
  { path: '/', component: PageToolsList, alias: '/rating' },
  { path: '/other', component: PageOther },
  { path: '/compare', component: PageCompare },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
