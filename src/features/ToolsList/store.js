import { defineStore } from 'pinia'
import api from './api.js'

export const useStore = defineStore('store', {
  state: () => ({
    tools: [],
    dates: [],
    lastDate: null,
    isToolsLoaded: false,
  }),

  actions: {
    loadTools(dateId) {
      api
        .getTools('Russia', 'HeadHunter', dateId)
        .then(res => {
          this.tools = res
          this.isToolsLoaded = true
          const idsOfFav = localStorage.getItem('favoritesTools').split(' ')
          for (const tool of this.tools) {
            if (idsOfFav.includes(String(tool.id_tool))) tool.isFav = true
          }
          return res
        })
        .catch(error => {
          throw new Error(error)
        })
    },
    loadDates() {
      api
        .getDates()
        .then(res => {
          this.dates = res
          this.lastDate = res.at(-1)
          return res
        })
        .catch(error => {
          throw new Error(error)
        })
    },
  },
})
