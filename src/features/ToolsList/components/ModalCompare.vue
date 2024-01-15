<template>
  <div class="technology-comparison">
    <div class="technology-comparison__top">
      <!-- <ControversialWord v-if="currentTool.is_controversial_word" /> -->
      <h2 class="technology-comparison__name-tool">
        {{ currentTool.nameTool }}
      </h2>
      <span class="technology-comparison__search-query">
        <!-- ({{ currentTool.search_query }}) -->
      </span>
    </div>
    <div class="buttons-fixmme">
      <button
        v-for="category of currentTool.categories"
        :key="category.idCategory"
        class="categories__item"
        :class="`categories__item_${category.idCategory}`">
        {{ category.nameCategory }}
      </button>
    </div>

    <ChartItemCount
      ref="chart1"
      :current-tools="[currentTool]"
      :dates="dates" />

    <button
      class="technology-comparison__button"
      @click="goToCompare(currentTool)">
      compare with other technologies
    </button>

    <br />
    <hr />
    <br />

    <LabelAndCheckbox id="show-table" v-model="isShowTable" text="Show table" />
    <TableOfCountsOfItems
      v-if="isShowTable"
      :tools="[currentTool]"
      :dates="dates" />

    <div
      class="technology-comparison__chevrons"
      :class="{
        'technology-comparison__chevrons_disabled': tools.length <= 1,
      }">
      <div
        class="technology-comparison__chevron-item"
        @click="$emit('openNewItemInModal', 'prev')">
        <IconSvg
          icon-name="IconChevron"
          custom-class="technology-comparison__go-prev" />
        prev
      </div>
      <span class="technology-comparison__chevron-placeholder hint">
        You can press the arrows on the keyboard to change the technology
      </span>
      <div
        class="technology-comparison__chevron-item"
        @click="$emit('openNewItemInModal', 'next')">
        next
        <IconSvg
          icon-name="IconChevron"
          custom-class="technology-comparison__go-next" />
      </div>
    </div>
    <!-- <strong>There are no such filters:</strong>
    <button
      v-for="category of categories"
      :key="category.idCategory"
      @click="load(category.idCategory)"
      class="categories__item"
      :class="`categories__item_${category.idCategory}`">
      {{ category.nameCategory }}
    </button> -->
  </div>
</template>

<script>
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
      isShowTable: false,

      selectedTools: [],
    }
  },

  mounted() {
    document.addEventListener('keydown', this.FIXMEF)
    document.addEventListener('keydown', this.addCloseFunction)
  },
  unmounted() {
    document.removeEventListener('keydown', this.addCloseFunction)
    document.removeEventListener('keydown', this.FIXMEF)
  },
  methods: {
    FIXMEF(event) {
      if (event.code === 'ArrowLeft') this.$emit('openNewItemInModal', 'prev')
      if (event.code === 'ArrowRight') this.$emit('openNewItemInModal', 'next')
    },
    async load(idCategory) {
      console.log(
        `INSERT INTO  categories_tools (idTool, idCategory) VALUES(${this.currentTool.idTool}, ${idCategory});`
      )
      // await api.setCategory(this.currentTool.idTool, idCategory)
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
        query: { q: currentTool.nameTool },
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
  margin: calc(var(--unit) * 2);
}
.technology-comparison {
  position: relative;
  padding: calc(var(--unit) * 3);
  background-color: var(--color-background);
}
.technology-comparison__chevrons {
  display: flex;
  align-items: center;
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
.technology-comparison__chevron-placeholder {
  padding: 0 calc(var(--unit) * 3);
  text-align: center;
}
.technology-comparison__go-prev {
  left: 0;
  transform: rotate(180deg);
}
.technology-comparison__go-next {
  right: 0;
}
.technology-comparison__name-tool {
  max-width: 260px;
  font-size: var(--text-extra-large);
}
.technology-comparison__search-query {
  margin-left: calc(var(--unit) * 2);
  font-size: var(--text-extra-small);
  font-weight: 700;
}
#myChart {
  background: var(--color-background);
}
.technology-comparison__button {
  padding: var(--unit) var(--unit);
  margin-top: var(--unit);
  /* margin-left: auto; */
  margin-right: auto;
  font-size: var(--text-extra-small);
  background: transparent;
  border: var(--border-width-extra-small) solid var(--color-border);
  border-radius: var(--radius);
}
@media (width < 768px) {
  .technology-comparison__chevron-placeholder {
    display: none;
  }
  .technology-comparison {
    padding: var(--unit);
    padding-top: calc(var(--unit) * 3);
  }
}
</style>
