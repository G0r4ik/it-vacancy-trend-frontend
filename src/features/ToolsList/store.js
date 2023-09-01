import { defineStore } from 'pinia'
import api from './api.js'

export const useStore = defineStore('store', {
  state: () => ({
    tools: [],
    dates: [],
    jobBoardsRegions: [],
    currentJobBoardsRegions: JSON.parse(
      localStorage.getItem('currentJobBoardsRegions')
    ) || [1, 2],
    lastDate: null,
    selectedDate: { idDate: null, date_of_complition: null },
    isToolsLoaded: false,
  }),

  actions: {
    async loadJobBoardsRegions() {
      this.jobBoardsRegions = await api.getJobBoardsRegions()
      for (const jbr in this.jobBoardsRegions) {
        if (Object.hasOwnProperty.call(this.jobBoardsRegions, jbr)) {
          const element = this.jobBoardsRegions[jbr]
          if (this.currentJobBoardsRegions.includes(+element.id)) {
            element.status = true
          }
        }
      }
    },
    async loadFixMe() {
      console.log('loadFixMe', this.currentJobBoardsRegions)
      for (const jbr of this.currentJobBoardsRegions) {
        console.log('loadFixMe1', jbr)
        if (this.tools[0].counts[jbr]) continue
        console.log('loadFixMe2', jbr)
        const counts = await api.getLastCountOfAllItems(
          this.selectedDate.idDate,
          jbr
        )
        for (let i = 0; i < counts[jbr].counts.length; i++) {
          this.tools[i].diff[jbr] = {}
          this.tools[i].counts[jbr] = {}

          this.tools[i].counts[jbr][this.selectedDate.idDate] =
            counts[jbr].counts[i]
          this.tools[i].diff[jbr] = counts[jbr].diff[i]
        }
      }
    },

    async loadTools(dateId) {
      const res = await api.getTools(dateId)

      this.tools = res
      this.isToolsLoaded = true

      this.loadFixMe()

      const favTool = localStorage.getItem('favoritesTools')
      if (!favTool) return res
      const idsOfFav = favTool.split(' ')
      for (const tool of this.tools) {
        if (idsOfFav.includes(String(tool.idTool))) tool.isFav = true
      }

      return res
    },
    async loadDates() {
      await api
        .getDates()
        .then(res => {
          this.dates = res
          this.lastDate = res.at(-1)
          this.selectedDate = res.at(-1)
          return res
        })
        .catch(error => {
          throw new Error(error)
        })
    },
  },
})
