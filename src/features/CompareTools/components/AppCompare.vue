<template>
  <section class="compare">
    <div class="container">
      <div class="compare__inner">
        <h1>Compare tools</h1>
        <ComparePopularSearches
          v-if="compareToolsIsLoad && compareTools.length === 0"
          @add-items-of-popular-list="addItemsOfPopularList" />

        <SelectTools
          :tools="tools"
          :compare-tools="compareTools"
          @add-to-compare="addToCompare"
          @select-first-item="addToCompare" />

        <br />
        <JobBoardsRegions />
        <div v-show="compareTools.length > 0" class="compare__chart">
          <ChartItemCount
            v-show="currentJobBoardsRegions.length > 0"
            ref="chart"
            :current-tools="compareTools"
            :dates="dates"
            :is-show-legend="true" />
        </div>

        <LabelAndCheckbox
          v-if="compareTools.length > 0 && currentJobBoardsRegions.length > 0"
          id="show-table"
          v-model="isShowTable"
          text="Show table" />
        <TableOfCountsOfItems
          v-if="isShowTable && currentJobBoardsRegions.length > 0"
          :tools="compareTools"
          :dates="dates" />
      </div>
    </div>
  </section>
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
    useStore().loadDates()
    useStore().loadJobBoardsRegions()
    await useStore().loadTools()
    this.urlToJs()
    this.compareToolsIsLoad = true
  },
  methods: {
    async urlToJs() {
      const items = this.routeQ?.split(',') || []
      this.compareTools = []

      for (const tool of this.tools) {
        if (items.includes(tool.nameTool)) this.compareTools.push(tool)
      }
      await useStore().loadFullOfCurrentItems(this.compareTools)
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
      this.$router.push({ path: '/compare', query: { q: query.slice(1) } })
    },
    async addToCompare(tool) {
      const qParameter = this.$route.query.q || ''
      const separator = qParameter ? ',' : ''
      const q = `${qParameter}${separator}${tool.nameTool}`
      this.$router.push({ path: '/compare', query: { q } })
    },
  },
}
</script>

<style>
.compare {
  margin-bottom: calc(var(--unit) * 10);
}
.compare__items-title {
  margin-top: calc(var(--unit) * 3);
}
.compare__chart {
  width: 100%;
  /* max-height: var(--max-height-chart); */
}
</style>
