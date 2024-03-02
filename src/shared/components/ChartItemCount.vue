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
          v-model="chartOptions.isCanScroll"
          class-label="chart-settings-count__label"
          text="allow scrolling of the graph" />
        <labelAndCheckbox
          id="is-using-contrast-color"
          v-model="chartOptions.isUsingContrastColor"
          class-label="chart-settings-count__label"
          text="use contrasting colors instead of unique faded ones" />
        <labelAndCheckbox
          id="is-show-by-week"
          v-model="chartOptions.isShowByWeek"
          class-label="chart-settings-count__label"
          text="show by week, not by day" />
        <labelAndCheckbox
          v-show="!chartOptions.isShowByWeek"
          id="is-show-event"
          v-model="chartOptions.isShowEvents"
          class-label="chart-settings-count__label"
          text="show events" />
        <labelAndCheckbox
          id="is-using-moving-average"
          v-model="chartOptions.isUsingMovingAverage"
          class-label="chart-settings-count__label"
          text="Use a moving average" />
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
        :data="{ datasets: datasets2, labels }" />
    </div>
  </div>
</template>

<script>
import '@/shared/hammer.js'
import zoomPlugin from 'chartjs-plugin-zoom'
import autocolors from 'chartjs-plugin-autocolors'
import { Line as LineChart } from 'vue-chartjs'

import { useStore } from '@/features/ToolsList'
import { formateDate } from '@/shared/helpers.js'
import { colors } from '@/shared/consts.js'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

export default {
  components: { LineChart },
  props: {
    currentTools: { type: Array, default: () => [] },
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

      datasets: {},
    }
  },
  computed: {
    jobBoardsRegions() {
      return useStore().jobBoardsRegions
    },
    // Для watch
    isUsingContrastColor() {
      return this.chartOptions.isUsingContrastColor
    },
    // !!!
    datasets2() {
      let copyDataset = JSON.parse(JSON.stringify(this.datasets))
      if (this.chartOptions.isUsingMovingAverage) {
        copyDataset = this.createMoveingAverageDataset()
      }

      // for (let i = 0; i < this.datasets.length; i++) {
      //   const colorIndex = i % colors.length
      //   if (this.chartOptions.isUsingContrastColor) {
      //     copyDataset[i].borderColor = colors[colorIndex]
      //     copyDataset[i].backgroundColor = colors[colorIndex]
      //     copyDataset[i].pointBackgroundColor = colors[colorIndex]
      //   } else {
      //     delete copyDataset[i].borderColor
      //     delete copyDataset[i].backgroundColor
      //     delete copyDataset[i].pointBackgroundColor
      //   }

      // const points = this.dates.map(date => {
      //   return this.currentTools2[i].events
      //     .map(i => i.idDate)
      //     .includes(date.idDate)
      //     ? 10
      //     : 0
      // })

      // copyDataset[i].pointRadius =
      //   this.isShowEvents && !this.isShowByWeek ? points : []
      // copyDataset[i].data = this.isShowByWeek
      //   ? Object.values(
      //       this.currentTools2[i].countOfWeeks[`HeadHunter-Russia`]
      //     )
      //   : Object.values(this.currentTools2[i].counts[`HeadHunter-Russia`])
      // }

      return copyDataset
    },
    labels() {
      const byweek = this.groupweek(this.dates)
      const days = this.dates.map(item => formateDate(item.dateOfCompletion))
      return this.chartOptions.isShowByWeek ? Object.keys(byweek) : days
    },
    // !!!
    config() {
      const { isShowLegend, isUsingContrastColor } = this
      const isCanScroll = this.chartOptions.isCanScroll
      const maxValue = this.getMaxValueInAllDatasets()
      return {
        hover: { mode: 'index', intersect: false },
        animation: false,
        maintainAspectRatio: false,
        elements: {
          point: { radius: 0, hoverRadius: 5 },
          line: { tension: 0.4 },
        },
        scales: {
          x: {
            ticks: {
              maxTicksLimit: 3,
              autoSkip: true,
              autoSkipPadding: true,
              maxRotation: 0,
              includeBounds: true,
            },
            border: { display: false },
          },
          y: {
            grid: { display: false },
            ticks: { beginAtZero: true, precision: 0 },
          },
        },
        plugins: {
          // legend: { display: isShowLegend },
          // autocolors: isUsingContrastColor,
          // colors: { enabled: isUsingContrastColor },
          // tooltip: {
          //   mode: 'index',
          //   intersect: false,
          //   callbacks: {
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
        },

        zoom: {
          limits: {
            x: { min: 0, minRange: 25 },
            y: { max: maxValue, min: 0, minRange: 0 },
          },
          pan: { enabled: true, mode: 'xy' },
          zoom: {
            // overScaleMode: 'y',
            wheel: { enabled: isCanScroll },
            pinch: { enabled: false },
            mode: 'xy',
          },
        },
      }
    },
    currentJobBoardsRegions() {
      return useStore().currentJobBoardsRegions
    },
  },
  watch: {
    // !!!
    // isUsingContrastColor(v) {
    //   if (!v) {
    //     this.isLoaded = false
    //     setTimeout(() => (this.isLoaded = true), 0)
    //   }
    // },
  },
  async mounted() {
    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend
    )
    ChartJS.register(zoomPlugin)
    ChartJS.register(autocolors)
  },
  methods: {
    createMoveingAverageDataset() {
      const movingAverageDataset = []
      for (const itemDataset of JSON.parse(JSON.stringify(this.datasets))) {
        const averageData = []
        for (let i = 0; i < this.dates.length; i++) {
          const [c1, c2, c3] = itemDataset.data.slice(i - 1, i + 2)
          const existCounts = [c1, c2, c3].filter(item =>
            Number.isFinite(item)
          ).length
          const averageCount = Math.round((c1 + c2 + c3) / existCounts)
          averageData.push(averageCount)
        }
        movingAverageDataset.push({
          data: averageData,
          label: itemDataset.label,
        })
      }
      return movingAverageDataset
    },
    getMaxValueInAllDatasets() {
      const data = this.datasets2.map(i => i.data)
      let maxValue = 0
      for (const counts of data) {
        for (const count of counts) {
          if (Number.isNaN(count)) continue
          maxValue = Math.max(maxValue, count ?? 0)
        }
      }
      return maxValue
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
    createChar() {
      const { dates, currentTools, isShowJbr, currentJobBoardsRegions } = this
      this.isLoaded = false
      const datasets = []
      const byweek = this.groupweek(this.dates)

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
    clearChar(tool) {
      this.datasets = []
      this.datasets = []
      this.isLoaded = false

      console.log(this.jobBoardsRegions)
      for (const jbr of this.currentJobBoardsRegions) {
        const jbrC = this.jobBoardsRegions.find(
          jbr_ => jbr_.idJobBoardRegions === jbr
        )
        this.datasets.push({
          data: [],
          label: `${tool.nameTool}(${jbrC.jobBoard}-${jbrC.region})`,
        })
      }
    },
  },
}
</script>

<style>
.chart-settings-count__labels {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
  /* max-height: 1000px; */
  /* height: 70vh !important; */
}
.compare__chart canvas {
  height: 100% !important;
}
</style>
