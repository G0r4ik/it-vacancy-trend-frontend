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
          @add-to-compare="addToCompare"
          @select-first-item="addToCompare" />
      </div>
      <div v-show="compareTools.length > 0" class="compare__chart">
        <div v-if="compareToolsIsLoad">
          <JobBoardsRegions />
        </div>
        <ChartItemCount
          ref="chart"
          :current-tools="compareTools"
          :change-value="changeValue"
          :dates="dates"
          :is-show-legend="true" />
      </div>
      <!-- <div class="compare__another"></div> -->
      <!-- <LabelAndCheckbox
        v-if="compareTools.length > 0"
        id="show-table"
        v-model="isShowTable"
        text="Show table" /> -->
      <TableOfCountsOfItems
        v-if="isShowTable"
        :compare-tools="compareTools"
        :dates="dates" />
    </div>
  </div>
</template>

<script>
import SelectTools from './SelectTools.vue'
import { useStore, JobBoardsRegions } from '@/features/ToolsList'
import ComparePopularSearches from './ComparePopularSearches.vue'

export default {
  components: { SelectTools, ComparePopularSearches, JobBoardsRegions },
  data() {
    return {
      compareTools: [],
      isShowTable: false,
      compareToolsIsLoad: false,
      changeValue: 0,
    }
  },
  computed: {
    dates() {
      return useStore().dates
    },
    tools() {
      return useStore().tools
    },
    routeQ() {
      return this.$route.query.q
    },
    currentJobBoardsRegions() {
      return useStore().currentJobBoardsRegions
    },
  },
  watch: {
    routeQ() {
      this.urlToJs()
    },
    currentJobBoardsRegions: {
      handler() {
        this.urlToJs()
      },
      deep: true,
    },
  },
  async mounted() {
    await useStore().loadDates()
    await useStore().loadJobBoardsRegions()
    await useStore().loadTools(this.dates.at(-1).idDate)
    this.urlToJs()
    this.compareToolsIsLoad = true
  },
  methods: {
    async urlToJs() {
      const items = this.routeQ?.split(',') || []

      this.compareTools = []
      for (const tool of this.tools) {
        if (items.includes(tool.nameTool)) {
          this.compareTools.push(tool)
          await useStore().loadFullOfCurrentItem(tool.idTool)
        }
      }
      this.$refs.chart.createChar()
    },
    async addItemsOfPopularList(toolNames) {
      let query = ''
      for (const toolName of toolNames) {
        const findTool = this.tools.find(
          item => item.nameTool.toLowerCase() === toolName.toLowerCase()
        )
        query += `,${findTool.nameTool}`
      }
      await this.$router.push({
        path: '/compare',
        query: { q: query.slice(1) },
      })
    },
    async addToCompare(tool) {
      const qParameter = this.$route.query.q || ''
      const separator = qParameter ? ',' : ''
      const q = `${qParameter}${separator}${tool.nameTool}`
      await this.$router.push({ path: '/compare', query: { q } })
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
  max-height: 1000px;
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
