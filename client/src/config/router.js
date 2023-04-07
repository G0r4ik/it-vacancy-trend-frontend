import { createRouter, createWebHistory } from 'vue-router'
import PageCompare from '../pages/PageCompare.vue'
import PageOther from '../pages/PageOther.vue'
import PageRating from '../pages/PageRating.vue'

const routes = [
  { path: '/', component: PageRating, alias: '/rating' },
  { path: '/other', component: PageOther },
  { path: '/compare', component: PageCompare },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
