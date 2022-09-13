<template>
  <div class="filters">
    <div class="filters__inner">
      <div class="filters__top">
        <label for="select-date" class="select-container__label">
          Дата:
          <input
            id="select-date"
            class="select-date"
            @change="$emit('selectDate', $event)"
          />
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
        :selectedCategories="selectedCategories"
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

export default {
  components: { AppCategories },
  emits: ['changeCategory', 'changeSearch', 'selectDate'],
  props: {
    categories: Array,
    selectedCategories: Array,
  },
  computed: {
    changeCategoryAll() {
      return this.selectedCategories.length ? 'remove all' : 'show all'
    },
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
@media (max-width: 1000px) {
  .filters__top {
    margin-bottom: var(--margin-small);
  }
}
</style>
