import { createRouter, createWebHistory } from 'vue-router'
import AppCompare from '@/components/AppCompare'
import AppRating from '@/components/AppRating'
import AppOther from '@/components/AppOther'

const routes = [
  { path: '/', component: AppRating, alias: '/rating' },
  { path: '/other', component: AppOther },
  { path: '/compare', component: AppCompare },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
