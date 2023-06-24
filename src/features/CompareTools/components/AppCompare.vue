<template>
  <div class="compare">
    <div class="container">
      <div class="compare__inner">
        <!-- <h1
          v-if="namesOfCompareTools.length > 0"
          class="compare__items-title"
          v-html="namesOfCompareTools"></h1> -->
        <h1>Compare tools</h1>
        <ComparePopularSearches
          v-if="compareToolsIsLoad && compareTools.length === 0"
          :compare-tools-length="compareTools.length"
          @add-items-of-popular-list="addItemsOfPopularList" />

        <SelectTools
          :tools="tools"
          :compare-tools="compareTools"
          @add-to-compare="addToCompare" />
      </div>
      <div v-show="compareTools.length > 0" class="compare__chart">
        <canvas ref="chartNode"></canvas>
      </div>
      <!-- <div class="compare__another"></div> -->
      <LabelAndCheckbox
        v-if="compareTools.length > 0"
        id="show-table"
        v-model="isShowTable"
        text="Show table" />
      <TableOfCountsOfItems
        v-if="isShowTable"
        :compare-tools="compareTools"
        :dates="dates" />
    </div>
  </div>
</template>

<script>
import autocolors from 'chartjs-plugin-autocolors'
import { shallowRef } from 'vue'
import SelectTools from './SelectTools.vue'
import { useStore, api } from '@/features/ToolsList'
import { createChart, formateDate } from '@/shared/helpers.js'
import ComparePopularSearches from './ComparePopularSearches.vue'

export default {
  components: { SelectTools, ComparePopularSearches },
  data() {
    return {
      compareTools: [],
      chartNode: null,
      Chart: null,
      chart: null,
      isShowTable: false,
      compareToolsIsLoad: false,
    }
  },
  computed: {
    // namesOfCompareTools() {
    //   return this.compareTools
    //     .map(tool => tool.name_tool)
    //     .join(
    //       '<span style="font-weight: 700; color: var(--color-gray)">  &  </span> '
    //     )
    // },
    tools() {
      return useStore().tools
    },
    dates() {
      return useStore().dates
    },
  },

  async mounted() {
    if (useStore().dates.length === 0) await useStore().loadDates()
    if (useStore().tools.length === 0) await useStore().loadTools()
    await import(/* webpackChunkName: "chartjs" */ 'chart.js/auto').then(
      module => (this.Chart = module.default)
    )
    this.Chart.register(autocolors)
    this.chartNode = this.$refs.chartNode
    if (this.$route.query.q) {
      const items = this.$route.query.q.split(',')
      for (const tool of this.tools) {
        if (items.includes(tool.name_tool)) this.compareTools.push(tool)
      }
    }
    this.compareToolsIsLoad = true
    this.createChar()
  },
  methods: {
    selectFirstItem(item) {
      this.addToCompare(item)
    },
    async addItemsOfPopularList(toolNames) {
      for (const toolName of toolNames) {
        const findTool = this.tools.find(
          item => item.name_tool.toLowerCase() === toolName.toLowerCase()
        )
        await this.addToCompare(findTool)
      }
    },
    async addToCompare(tool) {
      this.compareTools.push(tool)
      const count = await api.getCountOfCurrentItem(tool.id_tool)
      tool.counts3 = count

      const query = `${this.$route.query.q || ''}${tool.name_tool},`
      this.$router.push({ path: '/compare', query: { q: query } })
      if (this.chart) {
        this.chart.data.datasets.push({
          data: count.map(d => d.count_of_item),
          label: tool.name_tool,
          fill: false,
        })
        this.chart.update()
      } else {
        await this.createChar()
      }
    },
    async createChar() {
      const { dates, compareTools, chartNode } = this
      const datasets = []
      for (const item of compareTools) {
        const count = await api.getCountOfCurrentItem(item.id_tool)
        item.counts3 = count
        datasets.push({
          data: count.map(d => d.count_of_item),
          label: item.name_tool,
          fill: false,
        })
      }

      if (datasets.length === 0) return

      const dates2 = dates.map(date => formateDate(date.date_of_completion))
      const createdChart = createChart(datasets, dates2)
      this.chart = shallowRef(new this.Chart(chartNode, createdChart))
    },
  },
}
</script>

<style>
.compare {
  margin-bottom: calc(var(--unit) * 10);
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

.compare__variants {
  margin-bottom: calc(var(--unit) * 3);
}
.compare__variants-title {
  display: inline-block;
  margin-bottom: var(--unit);
  font-size: var(--text-large);
}
.compare__variants-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.compare__variants-item {
  display: inline;
  color: var(--color-link);
  cursor: pointer;
  border-bottom: 1px solid transparent;
  transition: 0.1s all;
}
.compare__variants-item:hover {
  border-bottom: 1px solid var(--color-link);
  transition: 0.2s all;
}
</style>
