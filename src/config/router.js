import { createRouter, createWebHistory } from 'vue-router'
import PageCompare from '@/pages/PageCompare.vue'
import PageOther from '@/pages/PageOther.vue'
import PageToolsList from '@/pages/PageToolsList.vue'

const routes = [
  {
    path: '/',
    component: PageToolsList,
    meta: {
      title: 'List',
      description:
        'A list of technologies sorted by the number of occurrences in vacancies on the HeadHunter website',
    },
  },
  {
    path: '/other',
    component: PageOther,
    meta: {
      title: 'Other',
      description: 'Information about this site',
    },
  },
  {
    path: '/compare',
    component: PageCompare,
    meta: {
      title: 'Compare technologies',
      description:
        'Compare the number of vacancies in which a certain technology is found. Data in the form of a graph',
    },
  },
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  const metaDescription = to.meta.description
  if (metaDescription) {
    const metaTag = document.querySelector('meta[name="description"]')
    if (metaTag) {
      metaTag.setAttribute('content', metaDescription)
    } else {
      const newMetaTag = document.createElement('meta')
      newMetaTag.setAttribute('name', 'description')
      newMetaTag.setAttribute('content', metaDescription)
      document.head.append(newMetaTag)
    }
  }
  next()
})

export default router
