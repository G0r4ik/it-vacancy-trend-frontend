<template>
  <div class="filters">
    <div class="filters__inner">
      <div class="filters__top">
        <!-- <label for="select-date" class="select-container__label">
          Date:
          <input id="select-date" class="select-date" />
        </label> -->
        <button
          class="filters__top-all"
          @click="$emit('changeCategory', 'all')">
          {{ changeCategoryAll }}
        </button>
      </div>

      <CategoriesTools
        v-if="categories.length > 0"
        :categories="categories"
        :current-categories="currentCategories"
        @change-category="$emit('changeCategory', $event)" />

      <input
        type="search"
        class="filters__search-input"
        placeholder="Введите технологию"
        :value="searchInput"
        @input="$emit('changeSearch', $event)" />
    </div>
  </div>
</template>

<script>
import 'flatpickr/dist/flatpickr.css'
import CategoriesTools from './CategoriesTools.vue'
import { useStore } from '../store'

export default {
  components: { CategoriesTools },
  props: {
    searchInput: { type: String, default: '' },
    categories: { type: Array, default: () => [] },
    currentCategories: { type: Array, default: () => [] },
    dates: { type: Array, default: () => [] },
  },
  emits: ['changeCategory', 'changeSearch', 'changeSelectedDate'],

  data() {
    return {
      flatpickr: null,
    }
  },
  computed: {
    changeCategoryAll() {
      return this.currentCategories.length > 0 ? 'clear' : 'select all'
    },
    selectedDate() {
      return useStore().selectedDate
    },
  },

  async mounted() {
    // eslint-disable-next-line promise/catch-or-return
    const module = await import(/* webpackChunkName: "flatpickr" */ 'flatpickr')
    this.flatpickr = module.default
    const availableDates = []
    for (let i = 0; i < this.dates.length; i++) {
      const { idDate, dateOfCompletion } = this.dates[i]
      availableDates.push([idDate, dateOfCompletion])
    }

    const { dates, $emit, selectedDate } = this

    // eslint-disable-next-line unicorn/consistent-destructuring
    const maxDate = this.dates.at(-1).dateOfCompletion
    // eslint-disable-next-line unicorn/consistent-destructuring
    const minDate = this.dates[0].dateOfCompletion
    this.flatpickr('#select-date', {
      minDate,
      maxDate,
      defaultDate: selectedDate.dateOfCompletion,
      enable: availableDates.map(d => d[1]),
      onChange(d) {
        for (const date of dates) {
          const fDate = new Date(date.dateOfCompletion)
          const sDate = new Date(d)
          const firstDate = `${fDate.getFullYear()}_${fDate.getMonth()}_${fDate.getDate()}`
          const secondDate = `${sDate.getFullYear()}_${sDate.getMonth()}_${sDate.getDate()}`

          if (firstDate === secondDate) {
            $emit('changeSelectedDate', date)
            break
          }
        }
      },
    })
  },
}
</script>

<style>
.flatpickr-weekdays {
  display: none;
}
.filters__inner {
  padding: var(--unit);
  margin-bottom: calc(var(--unit) * 2);
}
.filters__top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: var(--unit);
}
.filters__top-all {
  margin-left: auto;
  border-bottom: var(--border-width-small) solid var(--color-border);
}
.select-date {
  width: 150px;
  font-size: var(--text-middle);
  line-height: 1.5;
  color: var(--color-text);
  text-align: center;
  background-color: transparent;
  border: var(--border-width-small) solid var(--color-border);
  border-radius: var(--radius);
  transition: all var(--transition-small);
}
.filters__search-input {
  margin-top: var(--unit);
}
@media (width <= 760px) {
  .select-container__label {
    margin-bottom: var(--unit);
  }
}
</style>
