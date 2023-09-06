import { createRouter, createWebHistory } from 'vue-router'
import PageCompare from '@/pages/PageCompare.vue'
import PageOther from '@/pages/PageOther.vue'
import PageToolsList from '@/pages/PageToolsList.vue'
import PageAuth from '@/pages/PageAuth.vue'
import { SERVER_PROD } from '../shared/consts.js'

const routes = [
  {
    path: '/',
    component: PageToolsList,
    meta: {
      title: 'IT Vacancy Trend — IT Tech Frequency in Vacancies',
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
    path: '/auth',
    component: PageAuth,
    meta: {
      title: 'Auth',
      description: 'Login or registration',
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
  const linkTag = document.querySelector('link[rel="canonical"]')
  if (linkTag) {
    linkTag.setAttribute('href', `${SERVER_PROD}${to.path}`)
  } else {
    const newMetaTag = document.createElement('link')
    newMetaTag.setAttribute('rel', `canonical`)
    newMetaTag.setAttribute('href', `${SERVER_PROD}${to.path}`)
    document.head.append(newMetaTag)
  }
  const descriptionTag = document.querySelector('meta[name="description"]')
  if (descriptionTag) {
    descriptionTag.setAttribute('content', to.meta.description)
  } else {
    const newMetaTag = document.createElement('meta')
    newMetaTag.setAttribute('name', 'description')
    newMetaTag.setAttribute('content', to.meta.description)
    document.head.append(newMetaTag)
  }
  next()
})

export default router
