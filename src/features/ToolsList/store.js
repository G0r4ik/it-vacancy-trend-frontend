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
    lastController: null,
    serverErrors: [],
  }),

  actions: {
    async loadJobBoardsRegions() {
      this.jobBoardsRegions = await api.getJobBoardsRegions()
      for (const jbr in this.jobBoardsRegions) {
        if (Object.hasOwn(this.jobBoardsRegions, jbr)) {
          const element = this.jobBoardsRegions[jbr]
          if (this.currentJobBoardsRegions.includes(+element.id)) {
            element.status = true
          }
        }
      }
    },

    async loadOneCounts() {
      for (const jbr of this.currentJobBoardsRegions) {
        if (
          Number.isFinite(this.tools[0].counts[jbr]?.[this.selectedDate.idDate])
        )
          continue
        api
          .getLastCountOfAllItems(this.selectedDate.idDate, jbr)
          .then(counts => {
            for (let i = 0; i < counts[jbr].counts.length; i++) {
              this.tools[i].diff[jbr] = {}
              this.tools[i].counts[jbr] = {}
              this.tools[i].counts[jbr][this.selectedDate.idDate] =
                counts[jbr].counts[i]
              this.tools[i].diff[jbr] = counts[jbr].diff[i]
            }
            return counts
          })
          .catch(error => console.log(error))
      }
    },

    // FIXME: скопировал у чата и не понимаю работу...
    getWeekNumber(date) {
      const target = new Date(date.valueOf())
      const dayNr = (date.getDay() + 6) % 7
      target.setDate(target.getDate() - dayNr + 3)
      const firstThursday = target.valueOf()
      target.setMonth(0, 1)
      if (target.getDay() !== 4) {
        target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7))
      }
      return 1 + Math.ceil((firstThursday - target) / 604_800_000) // 604800000 = 7 * 24 * 3600 * 1000
    },

    groupweek(dates) {
      const byweek = {}
      for (const sortedDate of dates) {
        const d = new Date(sortedDate.dateOfCompletion)
        const weekKey = `${d.getFullYear()}-${this.getWeekNumber(d)}`
        if (!byweek[weekKey]) byweek[weekKey] = []
        byweek[weekKey].push(sortedDate.idDate)
      }
      return byweek
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

      this.isLoaded = true
    },

    async loadTools() {
      const res = await api.getTools()

      this.tools = res
      this.isToolsLoaded = true

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
