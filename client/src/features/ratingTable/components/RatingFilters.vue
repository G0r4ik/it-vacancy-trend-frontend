<template>
  <div class="filters">
    <div class="filters__inner">
      <div class="filters__top">
        <label for="select-date" class="select-container__label">
          Date:
          <input id="select-date" class="select-date" />
        </label>
        <button
          class="filters__top-all"
          @click="$emit('changeCategory', 'all')">
          {{ changeCategoryAll }}
        </button>
      </div>

      <CategoriesTools
        :categories="categories"
        :current-categories="currentCategories"
        @change-category="$emit('changeCategory', $event)" />

      <input
        type="search"
        class="filters__search-input"
        placeholder="Введите технологию"
        @input="$emit('changeSearch', $event)" />
    </div>
  </div>
</template>

<script>
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.css'
import CategoriesTools from './CategoriesTools.vue'

export default {
  components: { CategoriesTools },
  props: {
    categories: { type: Array, default: () => [] },
    currentCategories: { type: Array, default: () => [] },
    dates: { type: Array, default: () => [] },
    selectedDate: { type: Object, default: Object },
  },
  emits: ['changeCategory', 'changeSearch', 'changeSelectedDate'],

  computed: {
    changeCategoryAll() {
      return this.currentCategories.length > 0 ? 'clear' : 'show all'
    },
  },

  mounted() {
    const availableDates = []
    for (let i = 0; i < this.dates.length; i++) {
      const { id_date } = this.dates[i]
      const date_of_completion = this.dates[i].date_of_completion
      availableDates.push([id_date, date_of_completion])
    }
    const { dates, $emit, selectedDate } = this

    const maxDate = this.dates.at(-1).date_of_completion
    const minDate = this.dates[0].date_of_completion

    flatpickr('#select-date', {
      minDate,
      maxDate,
      defaultDate: selectedDate.date_of_completion,
      enable: availableDates.map(d => d[1]),
      onChange(s, d) {
        for (const date of dates) {
          const fDate = new Date(date.date_of_completion)
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
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--border-radius-middle);
}
.filters__top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: var(--unit);
}
.filters__top-all {
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
  border-radius: var(--border-radius-extra-small);
  transition: all var(--transition-small);
}
.filters__search-input {
  margin-top: var(--unit);
}
@media (width <= 760px) {
  .filters__top {
    flex-direction: column;
    align-content: flex-start;
    align-items: flex-start;
    margin-bottom: var(--unit);
  }
  .select-container__label {
    margin-bottom: var(--unit);
  }
}
</style>
