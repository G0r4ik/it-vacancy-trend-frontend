<template>
  <div class="filters">
    <div class="filters__inner">
      <div class="filters__top">
        <label for="select-date" class="select-container__label">
          Дата:
          <input id="select-date" class="select-date" />
        </label>
        <button
          class="filters__top-all"
          @click="$emit('changeCategory', 'all')"
        >
          {{ changeCategoryAll }}
        </button>
      </div>

      <app-categories
        :categories="categories"
        :currentCategories="currentCategories"
        @changeCategory="$emit('changeCategory', $event)"
      ></app-categories>

      <input
        type="search"
        class="filters__search-input"
        placeholder="Введите технологию"
        @input="$emit('changeSearch', $event)"
      />
    </div>
  </div>
</template>

<script>
import AppCategories from './AppCategories.vue'
import '~n/flatpickr/dist/flatpickr.css'
import flatpickr from 'flatpickr'

export default {
  components: { AppCategories },
  emits: ['changeCategory', 'changeSearch', 'changeSelectDate'],
  props: {
    categories: Array,
    currentCategories: Array,
    dates: Array,
    selectedDate: Object,
  },

  computed: {
    changeCategoryAll() {
      return this.currentCategories.length ? 'clear' : 'show all'
    },
  },
  mounted() {
    const availableDates = []
    for (let i = 0; i < this.dates.length; i++) {
      const idDate = this.dates[i].id_date
      const dateOfCompletion = this.dates[i].date_of_completion
      availableDates.push([idDate, dateOfCompletion])
    }
    const dates = this.dates
    const emit = this.$emit
    flatpickr('#select-date', {
      // altInput: true,
      // altFormat: 'F j, Y',
      // dateFormat: 'y-m-d',
      minDate: availableDates[0][1],
      defaultDate: this.selectedDate.date_of_completion, //
      maxDate: availableDates.at(-1)[1],
      enable: availableDates.map(d => d[1]),
      onChange: function (s, d, i) {
        for (let i = 0; i < dates.length; i++) {
          const fDate = new Date(dates[i].date_of_completion)
          const sDate = new Date(d)
          const firstDate = `${fDate.getFullYear()}${fDate.getMonth()}${fDate.getDay()}`
          const secondDate = `${sDate.getFullYear()}${sDate.getMonth()}${sDate.getDay()}`
          if (firstDate === secondDate) {
            emit('changeSelectDate', dates[i])
            break
          }
        }
      },
    })
  },
}
</script>

<style scoped>
.filters {
}
.filters__inner {
  padding: 15px;
  border: 5px solid var(--color-border);
  border-radius: 15px;
  margin-bottom: var(--margin-middle);
}
.filters__top {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: var(--margin-small);
}
.filters__top-all {
  border-bottom: 2px solid var(--color-border);
}
.select-container__label {
}
.select-date {
  width: 150px;
  text-align: center;
  border: 2px solid var(--color-border);
  background-color: transparent;
  line-height: 1.5;
  border-radius: 5px;
  color: var(--color-text);
  font-size: var(--text-middle);
  transition: all 0.25s;
}
.filters__search-input {
  width: 100%;
  border: 2px solid var(--color-border);
  background-color: transparent;
  line-height: 2;
  padding: 0 var(--padding-small);
  margin-top: var(--margin-small);
  border-radius: 5px;
  color: var(--color-text);
  font-size: var(--text-small);
  transition: all 0.25s;
}
@media (max-width: 760px) {
  .filters__top {
    margin-bottom: var(--margin-small);
    flex-direction: column;
    align-items: flex-start;
    align-content: flex-start;
  }
  .select-container__label {
    margin-bottom: var(--margin-extra-small);
  }
}
</style>
