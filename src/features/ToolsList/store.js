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
    selectedDate: { idDate: null, date_of_complition: null },
    isToolsLoaded: false,
  }),

  actions: {
    changeSelectedDate(date) {
      this.selectedDate = date
    },
    changeCurrentJobBoardRegions(jbr) {
      this.currentJobBoardsRegions = jbr
    },
    async loadJobBoardsRegions() {
      this.jobBoardsRegions = await api.getJobBoardsRegions()
      for (const jbr in this.jobBoardsRegions) {
        const jbrItem = this.jobBoardsRegions[jbr]
        if (this.currentJobBoardsRegions.includes(+jbrItem.id)) {
          jbrItem.status = true
        }
      }
    },
    async loadOneCounts() {
      const promises = []
      for (const jbr of this.currentJobBoardsRegions) {
        promises.push(this.loadOneCount(jbr))
      }
      await Promise.all(promises)
    },
    async loadOneCount(jbr) {
      const lastCount = await api.getLastCountOfAllItems(
        this.selectedDate.idDate,
        jbr
      )
      for (let i = 0; i < lastCount[jbr].counts.length; i++) {
        this.tools[i].diff[jbr] = null
        this.tools[i].counts[jbr] = {}

        this.tools[i].diff[jbr] = lastCount[jbr].diff[i]
        this.tools[i].counts[jbr][this.selectedDate.idDate] =
          lastCount[jbr].counts[i]
      }
    },
    async loadFullOfCurrentItems(tools) {
      const promises = []
      for (const tool of tools) {
        for (const jbr of this.currentJobBoardsRegions) {
          promises.push(this.loadFullOfCurrentItem(tool, jbr))
        }
      }
      await Promise.all(promises)
    },
    async loadFullOfCurrentItem(tool, jbr) {
      const countOfCounts = Object.keys(tool.counts[jbr] || {}).length
      if (countOfCounts === this.dates.length) return
      const counts = await api.getCountOfCurrentItem(tool.idTool, jbr)
      tool.counts[jbr] = {}
      for (const [i, count] of counts.entries()) {
        tool.counts[jbr][this.dates[i].idDate] = count
      }

      // const byweek = this.groupweek(this.dates)
      // let i = -1
      // tool.countOfWeeks = { [jbr]: {} }
      // for (const date of Object.values(byweek)) {
      //   tool.countOfWeeks[jbr][++i] = []
      //   for (const date2 of date) {
      //     tool.countOfWeeks[jbr][i].push(tool.counts[jbr][date2])
      //   }
      //   const l1 = tool.countOfWeeks[jbr][i].filter(i2 => i2 !== null)
      //   let l2 = 0
      //   for (const item2 of tool.countOfWeeks[jbr][i]) l2 += item2
      //   tool.countOfWeeks[jbr][i] = Math.round(l2 / l1.length)
      // }
    },
    async loadTools() {
      const res = await api.getTools()
      this.tools = res
      this.isToolsLoaded = true
      const favTool = localStorage.getItem('favoritesTools')
      if (!favTool) return
      const idsOfFav = favTool.split(' ')
      for (const tool of this.tools) {
        if (idsOfFav.includes(String(tool.idTool))) tool.isFav = true
      }
    },
    async loadDates() {
      const dates = await api.getDates()
      this.dates = dates
      this.selectedDate = dates.at(-1)
    },
  },
})
