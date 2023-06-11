<template>
  <TheHeader />
  <div class="compare">
    <div class="container">
      <div class="compare__inner">
        <h1
          v-if="namesOfCompareTools.length > 0"
          class="compare__items-title"
          v-html="namesOfCompareTools"></h1>
        <h1 v-else>Compare tools</h1>
        <input
          v-model.trim="searchInput"
          class="compare__search-input"
          type="search"
          placeholder="Input tools"
          @keydown.enter="
            searchInput.length > 0 && addToCompare(filteredTools[0])
          " />
        <CompareSearchResults
          :tools="tools"
          :filtered-tools="filteredTools"
          :compare-tools="compareTools"
          :search-input="searchInput.toLowerCase()"
          @add-to-compare="addToCompare" />
        <!-- <div class="compare__items">
          <div class="compare__item"></div>
          <div class="compare__item"></div>
          <div class="compare__item"></div>
        </div> -->
        <div v-show="compareTools.length > 0" class="compare__chart">
          <canvas ref="chartNode"></canvas>
        </div>
        <div class="compare__another"></div>
      </div>
    </div>
  </div>
</template>

<script>
import autocolors from 'chartjs-plugin-autocolors'
import { shallowRef } from 'vue'
import TheHeader from '../shared/components/TheHeader.vue'
import { CompareSearchResults } from '../features/CompareTools'
import { useStore } from '../features/ToolsList'
import api from '../features/ToolsList/api'

export default {
  components: { TheHeader, CompareSearchResults },
  data() {
    return {
      searchInput: '',
      compareTools: [],
      chartNode: null,
      Chart: null,
      chart: null,
    }
  },
  computed: {
    filteredTools() {
      return this.tools
        .filter(
          tool =>
            tool.name_tool.toLowerCase().includes(this.searchInput) &&
            !this.compareTools.includes(tool)
        )
        .slice(0, 10)
    },
    // compareTools() {
    //   return useStore().tools
    // },
    namesOfCompareTools() {
      return this.compareTools
        .map(tool => tool.name_tool)
        .join(
          '<span style="font-weight: 700; color: var(--color-gray)">  &  </span> '
        )
    },
    tools() {
      return useStore().tools
    },
    dates() {
      return useStore().dates
    },
  },

  async mounted() {
    await import(/* webpackChunkName: "chartjs" */ 'chart.js/auto').then(
      module => {
        this.Chart = module.default
      }
    )
    this.Chart.register(autocolors)
    this.chartNode = this.$refs.chartNode
    if (useStore().tools.length === 0) await useStore().loadTools()
    if (useStore().dates.length === 0) await useStore().loadDates()

    if (this.$route.query.q) {
      const items = this.$route.query.q.split(',')
      for (const tool of this.tools) {
        if (items.includes(tool.name_tool)) this.compareTools.push(tool)
      }
    }
    this.createChar()
  },
  methods: {
    async addToCompare(tool) {
      if (this.chart) {
        const count = await api.getCountOfCurrentItem(tool.id_tool)
        this.chart.data.datasets.push({
          data: count.map(d => d.count_of_item),
          label: tool.name_tool,
          fill: false,
        })
        this.chart.update()
      }
      this.compareTools.push(tool)
      const a = this.$route.query.q
        ? `${this.$route.query.q}${tool.name_tool},`
        : `${tool.name_tool},`
      this.$router.push({ path: '/compare', query: { q: a } })
      this.searchInput = ''
      if (!this.chart) this.createChar()
    },
    async createChar(counts) {
      const { dates } = this
      const datasets = []
      for (const item of this.compareTools) {
        const count = await api.getCountOfCurrentItem(item.id_tool)
        datasets.push({
          data: count.map(d => d.count_of_item),
          label: item.name_tool,
          fill: false,
        })
      }
      this.chart = shallowRef(
        new this.Chart(this.chartNode, {
          type: 'line',
          data: {
            labels: dates.map(date => date.date_of_completion),
            datasets: [...datasets],
            // labels: sortedDates.map(date => {
            //   const date2 = new Date(date.date_of_completion)
            //   const day = String(date2.getDate()).padStart(2, '0')
            //   const month = String(date2.getMonth() + 1).padStart(2, '0')
            //   const year = String(date2.getFullYear()).padStart(2, '0')
            //   return `${year}-${month}-${day}`
            // }),
            // datasets: [
            //   {
            //     label: 'HHru',
            //     data: Object.values(copy.counts.HeadHunter),
            //     borderColor: ['rgba(255, 99, 132, 1)'],
            //     fill: false,
            //     // tension: 0.1,
            //   },
            //   // {
            //   //   label: 'Indeed',
            //   //   data: countsIndeed,
            //   //   borderColor: ['rgba(54, 162, 235, 1)'],
            //   //   borderWidth: 10,
            //   // },
            // ],
          },
          stepped: true,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            elements: {
              point: { radius: 0, hoverRadius: 10, hitRadius: 50 },
              line: { tension: 0.5 },
            },
            scales: {
              x: {
                //       beginAtZero: true,
                grid: { display: false },
                ticks: { display: false },
                border: { display: false },
              },
              y: {
                grid: { display: false },
                border: { display: false },
                // grace: '100%',
                // ticks: { stepSize: 5000 },
                // beginAtZero: true,
                // min: 0,
                // max: Math.floor((maxValue + (maxValue / 5)).toFixed(1)),
                // max: maxValue,
              },
            },
          },
        })
      )
    },
  },
}
</script>

<style>
.compare {
}
.container {
}
.compare__inner {
}
.compare__items-title {
  margin-top: calc(var(--unit) * 3);
}
.title {
}
.compare__title {
}
.compare__search-input {
  width: 100%;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.compare__search-result {
}
.search-result {
}
.search-result__item {
}
.compare__items {
}
.compare__item {
}
.compare__chart {
  width: 100%;
  height: 70vh !important;
  /* height: 50vh; */
  margin-bottom: calc(var(--unit) * 4);
}
.compare__chart canvas {
  height: 100% !important;
}
.compare__another {
}
</style>
