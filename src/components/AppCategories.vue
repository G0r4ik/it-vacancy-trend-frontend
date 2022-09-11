<template>
  <ul class="categories">
    <li
      class="categories__item"
      :class="{ active: this.selectedCategory === 'all' }"
      @click="$emit('selectedCategory', 'all')">
      all
    </li>
    <li
      v-for="category of categories"
      class="categories__item"
      tabindex="0"
      :key="category.id_category"
      :class="
        selectedCategory.includes(+category.id_category)
          ? 'category' + category.id_category
          : ''
      "
      @click="$emit('selectedCategory', category.id_category)">
      {{ category.name_category }}
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    categories: Array,
    selectedCategory: [String, Array],
  },
}
</script>

<style scoped>
.categories {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}
.categories__item {
  display: inline-block;
  list-style: none;
  margin: 2.5px 5px;
  padding: 2.5px;
  cursor: pointer;
  background: rgba(92.9, 92.9, 91.4, 0.2);
  border: 2px solid transparent;
}

.active {
  border: 2px solid lightblue;
}
</style>
