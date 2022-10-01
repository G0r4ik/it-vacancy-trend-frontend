<template>
  <ul class="categories">
    <li
      v-for="category of categories"
      class="categories__item"
      :class="
        selectedCategories.includes(category.id_category) &&
        `categories__item_${category.id_category}`
      "
      :key="category.id_category"
      @click="$emit('changeCategory', category.id_category)"
    >
      <button>
        {{ category.name_category }}
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    categories: Array,
    selectedCategories: Array,
  },
}
</script>

<style scoped>
.categories {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  margin-top: var(--margin-small);
}
.categories__item {
  display: inline-block;
  text-align: left;
  list-style: none;
  margin: 2.5px 0;
  margin-right: var(--margin-small);
  padding: 2.5px;
  cursor: pointer;
  border: 2px solid transparent;
  font-size: var(--text-middle);
}
.categories__item:last-child {
  margin-right: 0;
}
.categories__item button {
  text-align: left;
}
</style>
