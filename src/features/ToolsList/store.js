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
    async loadTools(dateId) {
      await api
        .getTools('Russia', 'HeadHunter', dateId)
        .then(res => {
          this.tools = res
          this.isToolsLoaded = true
          const favTool = localStorage.getItem('favoritesTools')
          if (!favTool) return res
          const idsOfFav = favTool.split(' ')
          for (const tool of this.tools) {
            if (idsOfFav.includes(String(tool.id_tool))) tool.isFav = true
          }
          return res
        })
        .catch(error => {
          throw new Error(error)
        })
    },
    async loadDates() {
      await api
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
