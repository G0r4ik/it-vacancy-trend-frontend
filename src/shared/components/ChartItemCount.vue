<template>
  <details class="chart-settings-count">
    <summary class="chart-settings-count__summary">
      Нажмите, чтобы
      <span class="open">показать</span>
      <span class="close">скрыть</span>
      настройки
    </summary>
    <div class="chart-settings-count__labels">
      <labelAndCheckbox
        id="is-can-scroll"
        v-model="isCanScroll"
        class-label="chart-settings-count__label"
        text=" разрешить скролл" />
      <!-- <labelAndCheckbox
        id="is-using-contrast-color"
        v-model="isUsingContrastColor"
        class-label="chart-settings-count__label"
        text="использовать контрасные цвета вместо уникальных блеклых?" /> -->
      <labelAndCheckbox
        id="is-show-by-week"
        v-model="isShowByWeek"
        class-label="chart-settings-count__label"
        text="показывать по неделям а не по дням" />
      <labelAndCheckbox
        v-show="!isShowByWeek"
        id="is-show-event"
        v-model="isShowEvents"
        class-label="chart-settings-count__label"
        text="показать события" />
    </div>
  </details>
  <AppSkeleton
    v-if="!isLoaded"
    width="100%"
    height="435px"
    :my-class="'skeleton__chart'"
    display="inline-block"
    br="0" />
  <div v-if="isLoaded" class="technology-comparison__chart">
    <LineChart
      id="my-chart-id"
      :options="config"
      :data="{ datasets: datasets2, labels: labels2 }"
      width="800"
      height="300" />
  </div>
</template>

<script>
import zoomPlugin from 'chartjs-plugin-zoom'
import autocolors from 'chartjs-plugin-autocolors'
import { Line as LineChart } from 'vue-chartjs'
import { api } from '@/features/ToolsList'
import { formateDate } from '@/shared/helpers.js'
import { colors } from '@/shared/consts.js'

export default {
  components: { LineChart },
  props: {
    currentTools: { type: Array, default: Array },
    dates: { type: Array, default: () => [] },
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
      currentTools2: [], // copy !!!
    }
  },
  computed: {
    // !!!
    datasets2() {
      console.log('computed datasets change')
      const points = this.dates.map(date => (date.events ? 10 : 0))

      const copy = JSON.parse(JSON.stringify(this.datasets))

      for (let i = 0; i < this.datasets.length; i++) {
        const extendedColors = []
        const colorIndex = i % colors.length
        extendedColors.push(colors[colorIndex])
        const item = copy[i]
        if (this.isUsingContrastColor) {
          item.borderColor = extendedColors[i]
          item.backgroundColor = extendedColors[i]
          item.pointBackgroundColor = extendedColors[i]
        } else {
          delete item.borderColor
          delete item.backgroundColor
          delete item.pointBackgroundColor
        }
        item.pointRadius = this.isShowEvents && !this.isShowByWeek ? points : []
        item.data = this.isShowByWeek
          ? Object.values(this.currentTools2[i].countOfWeeks.HeadHunter)
          : Object.values(this.currentTools2[i].counts.HeadHunter)
      }

      return copy
    },
    labels2() {
      const byweek = []
      const sortedDates = this.sortedDate(this.dates)
      for (const sortedDate of Object.values(sortedDates)) {
        this.groupweek(sortedDate, byweek)
      }
      return this.isShowByWeek
        ? Object.keys(byweek)
        : this.dates.map(item => formateDate(item.date_of_completion))
    },
    config() {
      console.log('computed config change')
      const { dates, isCanScroll } = this
      const specialEvents = dates.filter(date => date.events)
      const eventIndices = new Set(
        specialEvents.map(event => dates.indexOf(event))
      )

      return {
        hover: { mode: 'nearest', intersect: false },
        animation: { duration: 0 },
        maintainAspectRatio: false,
        responsive: true,
        elements: {
          point: { radius: 0, hoverRadius: 10 },
          line: { tension: 0.4 },
        },
        scales: {
          x: {
            ticks: {
              //   maxTicksLimit: 3,
              // align: 'start',
              //   autoSkip: true,
              //   autoSkipPadding: true,
              maxRotation: 0,
              //   includeBounds: true,
            },
            border: { display: false },
          },
          y: {
            grid: { display: false },
            border: { display: false },
            grace: '10%',
            // ticks: { precision: 0, beginAtZero: true, min: 0 },
          },
        },
        plugins: {
          // legend: { display: isUsingContrastColor },
          // autocolors: !isUsingContrastColor,
          // colors: { enabled: isUsingContrastColor },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              title: context => {
                const { dataIndex } = context[0]
                if (eventIndices.has(dataIndex)) {
                  const event = specialEvents.find(
                    event_ => dates[dataIndex] === event_
                  )
                  return `${context[0].label} \nEvent: ${event.events} `
                }
                return context.formattedValue
              },
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
  },
  watch: {
    // !!!
    currentTools: {
      handler() {
        console.log('currentTools поменялись')
        this.currentTools2 = JSON.parse(JSON.stringify(this.currentTools))

        this.createChar()
      },
      deep: true,
    },
  },
  async mounted() {
    await import(/* webpackChunkName: "chartjs" */ 'chart.js/auto').then(
      module => (this.ChartModule = module.default)
    )
    this.currentTools2 = JSON.parse(JSON.stringify(this.currentTools))
    this.ChartModule.register(autocolors)
    this.ChartModule.register(zoomPlugin)
    this.createChar()
  },
  methods: {
    sortedDate(dates) {
      const sortedDates = [...dates].sort((a, b) => {
        const dateA = new Date(a.date_of_completion)
        const dateB = new Date(b.date_of_completion)
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
    groupweek(value, byweek) {
      const d = new Date(value.date_of_completion)
      const weekKey = `${d.getFullYear()}-${this.getWeekNumber(d)}`
      if (!byweek[weekKey]) byweek[weekKey] = []
      byweek[weekKey].push(value.id_date)
    },
    // !!!
    async createChar() {
      const { dates, currentTools2 } = this
      this.isLoaded = false
      const datasets = []
      const byweek = {}
      const sortedDates = this.sortedDate(dates)
      for (const sortedDate of sortedDates.values()) {
        this.groupweek(sortedDate, byweek)
      }

      let i = -1

      for (const item of currentTools2) {
        const counts = await api.getCountOfCurrentItem(item.id_tool)
        for (const count of counts) {
          item.counts.HeadHunter[count.date_of_completion] = count.count_of_item
        }
        datasets.push({
          data: Object.values(item.counts.HeadHunter),
          label: item.name_tool,
          fill: false,
        })
        item.countOfWeeks = { HeadHunter: {} }
        for (const date of Object.values(byweek)) {
          item.countOfWeeks.HeadHunter[++i] = []
          for (const date2 of date) {
            item.countOfWeeks.HeadHunter[i].push(item.counts.HeadHunter[date2])
          }
          const l1 = item.countOfWeeks.HeadHunter[i].filter(i2 => i2 !== null)
          const l2 = item.countOfWeeks.HeadHunter[i].reduce(
            (accumulator, item2) => (accumulator += item2),
            0
          )
          item.countOfWeeks.HeadHunter[i] = Math.round(l2 / l1.length)
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
  margin-top: calc(var(--unit) * 2);
}
.chart-settings-count {
  padding: calc(var(--unit) * 3);
  margin: calc(var(--unit) * 2) 0;
  overflow: hidden;
  border-radius: 5px;
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
  transition: 0.25s transform ease;
  transform: translateY(-50%);
}
.chart-settings-count .chart-settings-count__summary .close {
  display: none;
}
.chart-settings-count[open] .chart-settings-count__summary .open {
  display: none;
}
.chart-settings-count[open] .chart-settings-count__summary .close {
  display: inline;
}
.chart-settings-count[open] > .chart-settings-count__summary::before {
  transform: rotate(90deg);
}
.chart-settings-count .chart-settings-count__summary::-webkit-details-marker {
  display: none;
}
</style>
<!-- 414 -->
