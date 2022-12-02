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
        @click="$emit('changeCategory', category.id_category)"
      >
        <button class="categories__button">
          <img
            class="categories__icon"
            :src="require(`../assets/categories/${category.id_category}.svg`)"
          />
          {{ category.name_category }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    categories: Array,
    currentCategories: Array,
  },
  emits: ['changeCategory'],

  data() {
    return {}
  },

  computed: {
    filteredCategories() {
      let tmp = [...this.categories].sort(
        (a, b) => a.name_category.length - b.name_category.length
      )
      const res = []
      for (let i = 0; i < tmp.length / 2; i++) {
        if (tmp[i] === tmp.at(-i)) {
          res.push(tmp[i])
          continue
        }
        res.push(tmp.at(-i))
        res.push(tmp[i])
      }
      return res
    },
  },

  methods: {},
}
</script>
<style>
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
  margin: var(--margin-extra-extra-small) 0;
  margin-right: var(--margin-small);
  padding: var(--padding-extra-extra-small);
  cursor: pointer;
  font-size: var(--text-small);
  border: 2px solid transparent;
}
.categories__button {
  display: flex;
  align-items: center;
}
.categories__icon {
  height: var(--icon-height-small);
  width: var(--icon-width-small);
  margin-right: var(--margin-extra-small);
}
.categories__item:last-child {
  margin-right: 0;
}
.categories__item button {
  text-align: left;
}
</style>
