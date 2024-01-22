import zoomPlugin from 'chartjs-plugin-zoom'
import autocolors from 'chartjs-plugin-autocolors'
import { useStore } from '@/features/ToolsList'
import { formateDate } from '@/shared/helpers.js'
import { colors } from '@/shared/consts.js'

export default (await import('vue')).defineComponent({
  components: { LineChart },
  props: {
    currentTools: { type: Array, default: Array },
    dates: { type: Array, default: () => [] },
    isShowLegend: { type: Boolean, default: true },
    isShowJbr: { type: Boolean, default: true },
  },
  data() {
    return {
      ChartModule: null,
      chartOptions: {
        isCanScroll: false,
        isShowEvents: false,
        isShowByWeek: false,
        isUsingContrastColor: false,
        isUsingMovingAverage: true,
      },

      isLoaded: false,
      lastController: null,

      datasets: {},
      labels: {},
    }
  },
  computed: {
    isUsingContrastColor() {
      return this.chartOptions.isUsingContrastColor
    },
    datasets2() {
      let copy = JSON.parse(JSON.stringify(this.datasets))
      const tmp = []

      if (this.chartOptions.isUsingMovingAverage) {
        for (const data of copy) {
          const moveMean = [null]
          for (let i = 1; i < this.dates.length - 1; i++) {
            const [count1, count2, count3] = [
              data.data[i],
              data.data[i - 1],
              data.data[i + 1],
            ]
            const mean = count1 + count2 + count3
            const trutlyValuesLength = [count1, count2, count3].filter(item =>
              Number.isFinite(item)
            ).length
            moveMean.push(Math.round(mean / trutlyValuesLength))
          }
          tmp.push({
            data: moveMean,
            label: data.label,
            // borderColor: 'rgba(0,0,0)',
          })
        }
        copy = [...tmp]
      }

      for (let i = 0; i < this.datasets.length; i++) {
        const colorIndex = i % colors.length
        if (this.chartOptions.isUsingContrastColor) {
          copy[i].borderColor = colors[colorIndex]
          copy[i].backgroundColor = colors[colorIndex]
          copy[i].pointBackgroundColor = colors[colorIndex]
        } else {
          delete copy[i].borderColor
          delete copy[i].backgroundColor
          delete copy[i].pointBackgroundColor
        }

        // const points = this.dates.map(date => {
        //   return this.currentTools2[i].events
        //     .map(i => i.idDate)
        //     .includes(date.idDate)
        //     ? 10
        //     : 0
        // })
        // copy[i].pointRadius =
        //   this.isShowEvents && !this.isShowByWeek ? points : []
        // copy[i].data = this.isShowByWeek
        //   ? Object.values(
        //       this.currentTools2[i].countOfWeeks[`HeadHunter-Russia`]
        //     )
        //   : Object.values(this.currentTools2[i].counts[`HeadHunter-Russia`])
      }

      return copy
    },
    labels2() {
      const sortedDates = this.sortedDate(this.dates)
      const byweek = this.groupweek(sortedDates)
      return this.chartOptions.isShowByWeek
        ? Object.keys(byweek)
        : this.dates.map(item => formateDate(item.dateOfCompletion))
    },
    config() {
      const { isShowLegend, isUsingContrastColor } = this
      const isCanScroll = this.chartOptions.isCanScroll

      return {
        aspectRatio: 10,
        hover: { mode: 'nearest', intersect: false }, // or index
        animation: { duration: 0 },
        maintainAspectRatio: false,
        // responsive: true,
        // normalized: true,
        elements: {
          point: { radius: 0, hoverRadius: 5 },
          line: { tension: 0.4 },
        },
        scales: {
          x: {
            ticks: {
              maxTicksLimit: 3,
              //     align: 'start',
              //     // autoSkip: true,
              //     // autoSkipPadding: true,
              //     // maxRotation: 0,
              //     // includeBounds: true,
            },
            // border: { display: false },
          },
          y: {
            grid: { display: false },
            //   //   border: { display: false },
            //   //   grace: '10%',
            //   ticks: {
            //     //     precision: 0,
            beginAtZero: true,
            //     //     min: 0,
            // stepSize: 5000000,
            //   },
          },
        },

        plugins: {
          legend: { display: isShowLegend },
          // autocolors: !isUsingContrastColor,
          // colors: { enabled: isUsingContrastColor },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              // label: context => {
              //   const { dataIndex, dataset } = context
              //   console.log(dataset)
              //   for (let i = 0; i < this.currentJobBoardsRegions.length; i++) {
              //     const jobBoardRegion = this.currentJobBoardsRegions[i]
              //     // for (const jobBoardRegion of this.currentJobBoardsRegions) {
              //     const a = useStore().jobBoardsRegions.find(
              //       i => +i.id === +jobBoardRegion
              //     )
              //     const tool = this.currentTools2.find(
              //       item =>
              //         dataset.label ===
              //         `${item.nameTool}(${a.jobBoard}-${a.region})`
              //     )
              //     // console.log(`1c(${a.jobBoard}-${a.region})` === dataset.label)
              //     let event2 = null
              //     if (tool) {
              //       for (const event of tool.events) {
              //         if (event.idDate === dates[dataIndex].idDate) {
              //           event2 = event
              //           break
              //         }
              //       }
              //     }
              //     // if (dataset.pointRadius[dataIndex]) {
              //     //   return `${dataset.label} ${context.formattedValue} \nEvent: ${event2.eventText} `
              //     // }
              //   }
              // },
            },
          },
          zoom: {
            zoom: {
              pan: {
                enabled: true,
                mode: 'x',
              },
              wheel: {
                // enabled: true,
                // mode: 'x',
              },
              drag: {
                // enabled: true,
                // mode: 'x',
              },
              pinch: {
                // enabled: true,
                // mode: 'x',
              },
              zoom: {
                enabled: true,
              },
              // enabled: true,
              // mode: 'x',
            },
          },
          // zoom: {
          //   limits: { x: { min: 0, minRange: 10 } },
          //   pan: { enabled: isCanScroll, mode: 'x' },
          //   zoom: {
          //     wheel: { enabled: isCanScroll },
          //     // pinch: { enabled: isCanScroll },
          //     mode: 'x',
          //   },
          // },
        },
      }
    },
    currentJobBoardsRegions() {
      return useStore().currentJobBoardsRegions
    },
  },
  watch: {
    isUsingContrastColor(v) {
      if (v === false) {
        this.isLoaded = false
        setTimeout(() => (this.isLoaded = true), 0)
      }
    },
    // cga
  },
  async mounted() {
    await import(/* webpackChunkName: "chartjs" */ 'chart.js/auto').then(
      module => (this.ChartModule = module.default)
    )
    this.ChartModule.register(autocolors)
    this.ChartModule.register(zoomPlugin)
  },
  methods: {
    sortedDate(dates) {
      const sortedDates = [...dates].sort((a, b) => {
        const dateA = new Date(a.dateOfCompletion)
        const dateB = new Date(b.dateOfCompletion)
        return dateA - dateB
      })
      return sortedDates
    },
    getWeekNumber(date) {
      const target = new Date(date.valueOf())
      const dayNr = (date.getDay() + 6) % 7
      target.setDate(target.getDate() - dayNr + 3)
      const firstThursday = target.valueOf()
      target.setMonth(0, 1)
      if (target.getDay() !== 4) {
        target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7))
      }
      return 1 + Math.ceil((firstThursday - target) / 604800000) // 604800000 = 7 * 24 * 3600 * 1000
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
    // !!!
    async createChar() {
      const { dates, currentTools, isShowJbr, currentJobBoardsRegions } = this
      this.isLoaded = false
      const datasets = []
      const sortedDates = this.sortedDate(dates)
      const byweek = this.groupweek(sortedDates)

      let i = -1
      for (const item of currentTools) {
        for (const jbr of currentJobBoardsRegions) {
          if (!item.counts[jbr]) return
          const counts2 = Object.values(item.counts[jbr])
          item.counts[jbr] = {}
          for (const [index, element] of counts2.entries()) {
            item.counts[jbr][dates[index]?.idDate] = element
          }
          const a = useStore().jobBoardsRegions.find(
            jbrItem => +jbrItem.id === +jbr
          )
          datasets.push({
            data: Object.values(item.counts[jbr]),
            label: isShowJbr
              ? `${item.nameTool}(${a.jobBoard}-${a.region})`
              : item.nameTool,
            fill: false,
          })
          item.countOfWeeks = { [jbr]: {} }
          for (const date of Object.values(byweek)) {
            item.countOfWeeks[jbr][++i] = []
            for (const date2 of date) {
              item.countOfWeeks[jbr][i].push(item.counts[jbr][date2])
            }
            const l1 = item.countOfWeeks[jbr][i].filter(i2 => i2 !== null)

            let l2 = 0
            for (const item2 of item.countOfWeeks[jbr][i]) l2 += item2
            item.countOfWeeks[jbr][i] = Math.round(l2 / l1.length)
          }
        }
      }

      this.datasets = datasets
      this.isLoaded = true
    },
  },
})
