<template>
  <div>
    <ul class="categories">
      <li
        v-for="category of filteredCategories"
        :key="category.id_category"
        class="categories__item"
        :class="
          currentCategories.includes(category.id_category) &&
          `categories__item_${category.id_category}`
        "
        @click="$emit('changeCategory', category.id_category)">
        <button class="categories__button">
          <img
            class="categories__icon"
            :src="
              require(`../assets/categories/${category.id_category}.svg`)
            " />
          {{ category.name_category }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    categories: { type: Array, default: () => [] },
    currentCategories: { type: Array, default: () => [] },
  },
  emits: ['changeCategory'],

  data() {
    return {}
  },

  computed: {
    filteredCategories() {
      const temporary = [...this.categories].sort(
        (a, b) => a.name_category.length - b.name_category.length
      )
      const res = []
      for (let i = 0; i < temporary.length / 2; i++) {
        if (temporary[i] === temporary.at(-i)) {
          res.push(temporary[i])
          continue
        }
        res.push(temporary.at(-i), temporary[i])
      }
      return res
    },
  },

  methods: {},
}
</script>
<style>
.categories {
  display: flex;
  flex-wrap: wrap;
  margin-top: var(--unit);
  list-style: none;
}
.categories__item {
  display: inline-block;
  padding: var(--unit);
  margin: var(--unit) 0;
  margin-right: var(--unit);
  font-size: var(--text-small);
  text-align: left;
  list-style: none;
  cursor: pointer;
  /* border: var(--border-width-small) solid transparent; */
}
.categories__button {
  display: flex;
  align-items: center;
}
.categories__icon {
  width: var(--icon-width-small);
  height: var(--icon-height-small);
  margin-right: var(--unit);
}
.categories__item:last-child {
  margin-right: 0;
}
.categories__item button {
  text-align: left;
}
</style>
