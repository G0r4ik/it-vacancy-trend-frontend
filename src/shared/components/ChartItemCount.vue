<template>
  <div>
    <details class="chart-settings-count">
      <summary class="chart-settings-count__summary">
        Click to
        <span class="chart-settings-open">show</span>
        <span class="chart-settings-close">hide</span>
        the settings
      </summary>
      <div class="chart-settings-count__labels">
        <labelAndCheckbox
          id="is-can-scroll"
          v-model="isCanScroll"
          class-label="chart-settings-count__label"
          text="allow scrolling of the graph" />
        <labelAndCheckbox
          id="is-using-contrast-color"
          v-model="isUsingContrastColor"
          class-label="chart-settings-count__label"
          text="use contrasting colors instead of unique faded ones" />
        <labelAndCheckbox
          id="is-show-by-week"
          v-model="isShowByWeek"
          class-label="chart-settings-count__label"
          text="show by week, not by day" />
        <labelAndCheckbox
          v-show="!isShowByWeek"
          id="is-show-event"
          v-model="isShowEvents"
          class-label="chart-settings-count__label"
          text="show events" />
      </div>
    </details>
    <AppSkeleton
      v-if="!isLoaded"
      width="100%"
      :height="`var(--height-chart)`"
      :my-class="'skeleton__chart'"
      display="block"
      br="0" />
    <div v-if="isLoaded" class="chart-wrapper">
      <LineChart
        id="my-chart-id"
        :options="config"
        :data="{ datasets: datasets2, labels: labels2 }" />
    </div>
  </div>
</template>

<script>
import zoomPlugin from 'chartjs-plugin-zoom'
import autocolors from 'chartjs-plugin-autocolors'
// import { CategoryScale } from 'chart.js'
import { Line as LineChart } from 'vue-chartjs'
import { useStore } from '@/features/ToolsList'
import { formateDate } from '@/shared/helpers.js'
import { colors } from '@/shared/consts.js'

export default {
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

      isCanScroll: false,
      isShowEvents: false,
      isShowByWeek: false,
      isUsingContrastColor: false,

      isLoaded: false,
      lastController: null,

      datasets: {},
      labels: {},
    }
  },
  computed: {
    datasets2() {
      console.log('computed datasets change')

      const copy = JSON.parse(JSON.stringify(this.datasets))

      for (let i = 0; i < this.datasets.length; i++) {
        const colorIndex = i % colors.length
        if (this.isUsingContrastColor) {
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
      console.log('start')

      return copy
    },
    labels2() {
      const sortedDates = this.sortedDate(this.dates)
      const byweek = this.groupweek(sortedDates)
      return this.isShowByWeek
        ? Object.keys(byweek)
        : this.dates.map(item => formateDate(item.dateOfCompletion))
    },
    config() {
      console.log('computed config change')
      const { dates, isCanScroll, isShowLegend } = this

      return {
        hover: { mode: 'nearest', intersect: false },
        animation: { duration: 0 },
        maintainAspectRatio: false,
        responsive: true,
        elements: {
          point: { radius: 0, hoverRadius: 10 },
          line: { tension: 0.4 },
        },
        // scales: {
        //   x: {
        //     ticks: {
        //       //   maxTicksLimit: 3,
        //       // align: 'start',
        //       //   autoSkip: true,
        //       //   autoSkipPadding: true,
        //       maxRotation: 0,
        //       //   includeBounds: true,
        //     },
        //     border: { display: false },
        //   },
        //   y: {
        //     grid: { display: false },
        //     border: { display: false },
        //     grace: '10%',
        //     // ticks: { precision: 0, beginAtZero: true, min: 0 },
        //   },
        // },
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
            limits: { x: { min: 0, minRange: 10 } },
            pan: { enabled: false, mode: 'x' },
            zoom: {
              wheel: { enabled: isCanScroll },
              pinch: { enabled: false },
              mode: 'x',
            },
          },
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
  },
  async mounted() {
    await import(/* webpackChunkName: "chartjs" */ 'chart.js/auto').then(
      module => (this.ChartModule = module.default)
    )
    this.ChartModule.register(autocolors)
    this.ChartModule.register(zoomPlugin)
    // this.ChartModule.register(CategoryScale)
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
}
</script>

<style>
.chart-settings-count__labels {
  display: flex;
  flex-direction: column;
}
.chart-settings-count__label {
  margin-top: var(--unit);
}
.chart-settings-count {
  padding: calc(var(--unit) * 3);
  margin: calc(var(--unit) * 2) 0;
  overflow: hidden;
  border-radius: var(--radius);
}
.chart-settings-count__summary {
  position: relative;
  display: block;
  padding-left: calc(var(--unit) * 4);
  cursor: pointer;
}
.chart-settings-count[open] .chart-settings-count__summary {
  margin-bottom: calc(var(--unit) * 2);
}
.chart-settings-count__summary::before {
  position: absolute;
  top: 50%;
  left: var(--unit);
  content: '';
  border-color: transparent transparent transparent var(--color-text);
  border-style: solid;
  border-width: var(--unit);
  transition: var(--transition-small) transform ease;
  transform: translateY(-50%);
}
.chart-settings-close {
  display: none;
}
.chart-settings-count[open] .chart-settings-open {
  display: none;
}
.chart-settings-count[open] .chart-settings-close {
  display: inline;
}
.chart-settings-count[open] > .chart-settings-count__summary::before {
  transform: rotate(90deg);
}
.chart-settings-count__summary::-webkit-details-marker {
  display: none;
}
.chart-wrapper {
  height: var(--height-chart);
}
</style>
