<template>
  <div class="technology-comparison">
    <div class="technology-comparison__top">
      <ControversialWord v-if="currentTool.is_controversial_word" />
      <h5 class="technology-comparison__name-tool">
        {{ currentTool.name_tool }}
      </h5>
    </div>
    <div class="buttons-fixmme">
      <button
        v-for="category of currentTool.categories"
        :key="category.id_category"
        class="categories__item"
        :class="`categories__item_${category.id_category}`">
        {{ category.name_category }}
      </button>
    </div>
    <AppSkeleton
      v-if="!isLoaded"
      width="100%"
      height="435px"
      :my-class="'skeleton__chart'"
      display="inline-block"
      br="0" />
    <div v-show="isLoaded" class="technology-comparison__chart">
      <canvas id="myChart" ref="myChart" width="800" height="300"></canvas>
    </div>
    <button
      class="technology-comparison__button"
      @click="goToCompare(currentTool)">
      compare with other technologies
    </button>

    <div
      class="technology-comparison__chevrons"
      :class="{
        'technology-comparison__chevrons_disabled': tools.length <= 1,
      }">
      <div
        class="technology-comparison__chevron-item"
        @click="$emit('openNewItemInModal', 'prev')">
        <IconChevron class="technology-comparison__go-prev" />
        prev
      </div>
      <div
        class="technology-comparison__chevron-item"
        @click="$emit('openNewItemInModal', 'next')">
        next
        <IconChevron class="technology-comparison__go-next" />
      </div>
    </div>
    <!-- <strong>Этих фильтров нет:</strong>
    <button
      v-for="category of categories"
      :key="category.id_category"
      @click="load(category.id_category)"
      class="categories__item"
      :class="`categories__item_${category.id_category}`">
      {{ category.name_category }}
    </button> -->
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import api from '../api.js'
import { formateDate, createChart } from '@/shared/helpers.js'

export default {
  props: {
    categories: { type: Array, default: () => [] },
    page: { type: Number, default: 1 },
    tools: { type: Array, default: () => [] },
    currentTool: { type: Object, default: Object },
    dates: { type: Array, default: () => [] },
  },
  emits: ['closeModal', 'openNewItemInModal'],
  data() {
    return {
      selectedTools: [],
      chartNode: null,
      chart: null,
      isLoaded: false,
      lastController: null,
      Chart: null,
    }
  },
  watch: {
    async currentTool() {
      const copy = { ...this.currentTool }
      const controller = new AbortController()
      if (!this.isLoaded) {
        this.lastController.abort()
      }
      this.isLoaded = false
      this.lastController = controller
      const counts = await api.getCountOfCurrentItem(
        this.currentTool.id_tool,
        controller.signal
      )
      if (!counts) return
      this.isLoaded = true
      for (const current of counts) {
        copy.counts.HeadHunter[current.date_of_completion] =
          current.count_of_item
      }
      const sortedDates = [...this.dates].sort(
        (a, b) =>
          new Date(a.date_of_completion) - new Date(b.date_of_completion)
      )
      this.chart.data.labels = sortedDates.map(date => {
        const date2 = new Date(date.date_of_completion)
        // const day = String(date2.getDate()).padStart(2, '0')
        // const month = String(date2.getMonth() + 1).padStart(2, '0')
        // const year = String(date2.getFullYear()).padStart(2, '0')
        //   // return `${year}-${month}-${day}`
        return formateDate(date2)
      })
      this.chart.data.datasets = [
        {
          label: 'HHru',
          data: Object.values(copy.counts.HeadHunter),
          borderColor: ['rgba(255, 99, 132, 1)'],
          fill: false,
          // tension: 0.1,
        },
        // {
        //   label: 'Indeed',
        //   data: countsIndeed,
        //   borderColor: ['rgba(54, 162, 235, 1)'],
        //   borderWidth: 10,
        // },
      ]
      this.chart.update()
    },
  },
  async mounted() {
    await import(/* webpackChunkName: "chartjs" */ 'chart.js/auto').then(
      module => (this.Chart = module.default)
    )
    document.addEventListener('keydown', this.FIXMEF)
    this.chartNode = this.$refs.myChart
    document.addEventListener('keydown', this.addCloseFunction)
    const counts = await api.getCountOfCurrentItem(this.currentTool.id_tool)
    this.isLoaded = true
    this.createChar(counts)
  },
  unmounted() {
    document.removeEventListener('keydown', this.addCloseFunction)
    document.removeEventListener('keydown', this.FIXMEF)
    this.chart?.destroy()
  },
  methods: {
    FIXMEF(event) {
      if (event.code === 'ArrowLeft') this.$emit('openNewItemInModal', 'prev')
      if (event.code === 'ArrowRight') this.$emit('openNewItemInModal', 'next')
    },
    async load(id_category) {
      console.log(
        `INSERT INTO  categories_tools (id_tool, id_category) VALUES(${this.currentTool.id_tool}, ${id_category});`
      )
      // await api.setCategory(this.currentTool.id_tool, id_category)
    },
    async createChar(counts) {
      const copy = { ...this.currentTool }
      for (const current of counts) {
        copy.counts.HeadHunter[current.date_of_completion] =
          current.count_of_item
      }
      const context = this.chartNode
      const sortedDates = [...this.dates]
        .sort(
          (a, b) =>
            new Date(a.date_of_completion) - new Date(b.date_of_completion)
        )
        .map(i => formateDate(i.date_of_completion))
      // eslint-disable-next-line no-new
      // fix2
      this.chart = shallowRef(
        new this.Chart(
          context,
          createChart(
            [
              {
                label: 'HHru',
                data: Object.values(copy.counts.HeadHunter),
                borderColor: ['rgba(255, 99, 132, 1)'],
                fill: false,
                // tension: 0.1,
              },
            ],
            sortedDates
          )
        )
      )
    },
    addCloseFunction(event) {
      if (event.key === 'Escape') {
        this.$emit('closeModal')
      }
    },
    goToCompare(currentTool) {
      this.$emit('closeModal', currentTool)
      this.$router.push({
        path: '/compare',
        query: { q: currentTool.name_tool },
      })
      // this.emitter.emit('changePage', 'compare')
    },
  },
}
</script>

<style>
.technology-comparison__top {
  display: flex;
  align-items: center;
}
.technology-comparison-wrapper {
  width: 100%;
  max-width: 900px;
  margin: calc(var(--unit) * 2);
}
.technology-comparison {
  position: relative;
  padding: calc(var(--unit) * 3);
  background-color: var(--color-background);
}
.technology-comparison__chevrons {
  display: flex;
  justify-content: space-between;
  margin-top: calc(var(--unit) * 5);
}
.technology-comparison__chevron-item {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.technology-comparison__chevrons_disabled .technology-comparison__chevron-item {
  cursor: default;
  opacity: 0.5;
}
.technology-comparison__go-prev,
.technology-comparison__go-next {
  width: var(--icon-size-large);
  height: var(--icon-size-large);
}
.technology-comparison__go-prev {
  left: 0;
  transform: rotate(180deg);
}
.technology-comparison__go-next {
  right: 0;
}
.technology-comparison__name-tool {
  font-size: var(--text-extra-large);
}
.technology-comparison__chart {
  margin-bottom: var(--unit);
}
#myChart {
  /* width: 100% !important; */
  /* height: 100% !important; */
  background: var(--color-background);
}
.technology-comparison__button {
  padding: var(--unit) var(--unit);
  margin-top: var(--unit);
  margin-left: auto;
  font-size: var(--text-extra-small);
  background: transparent;
  border: var(--border-width-extra-small) solid var(--color-border);
  border-radius: var(--border-radius-extra-small);
}
@media (max-width: 770px) {
  .technology-comparison {
    padding: var(--unit);
    padding-top: calc(var(--unit) * 3);
  }
  .skeleton__chart {
    /* display: none !important; */
    height: 165px !important;
  }
}
</style>
