<template>
  <div>
    <ul class="categories">
      <li
        v-for="category of filteredCategories"
        class="categories__item"
        :class="
          currentCategories.includes(category.id_category) &&
          `categories__item_${category.id_category}`
        "
        :key="category.id_category"
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
  props: {
    categories: Array,
    currentCategories: Array,
  },
  methods: {},
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
.categories__button {
  display: flex;
  align-items: center;
}
.categories__icon {
  width: 30px;
  height: 30px;
  margin-right: var(--margin-extra-small);
}
.categories__item:last-child {
  margin-right: 0;
}
.categories__item button {
  text-align: left;
}
</style>
