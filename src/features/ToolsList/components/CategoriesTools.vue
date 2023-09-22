<template>
  <div>
    <ul class="categories">
      <li
        v-for="category of filteredCategories"
        :key="category.idCategory"
        class="categories__item"
        :class="[
          currentCategories.includes(category.idCategory) &&
            `categories__item_${category.idCategory}`,
        ]"
        @click="$emit('changeCategory', category.idCategory)">
        <button class="categories__button">
          {{ hasClass(category.idCategory) }}
          <img
            class="categories__icon"
            :src="getImg(category.idCategory)"
            :alt="`logo ${category.nameCategory}`" />
          {{ category.nameCategory }}
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
      return [...this.categories].sort(
        (a, b) => a.nameCategory.length - b.nameCategory.length
      )
    },
  },

  methods: {
    getCSS() {
      const allCSS = [...document.styleSheets]
        .map(styleSheet =>
          [...styleSheet.cssRules].map(rule => rule.cssText).join('')
        )
        .filter(Boolean)
        .join('\n')
      return allCSS
    },
    hasClass(categoryId) {
      if (!this.getCSS().includes(`categories__item_${categoryId}`)) {
        const style = document.createElement('style')
        style.type = 'text/css'
        style.innerHTML = `.categories__item_${categoryId} {   color: #8e9aaf; background: rgb(56 60 69 / 0.1); border: var(--border-width-small) solid #8e9aaf !important; }`
        document.querySelectorAll('head')[0].append(style)
      }
    },
    getImg(idCategory) {
      try {
        return require(`../assets/categories/${idCategory}.svg`)
      } catch {
        return require(`../assets/categories/13.svg`)
      }
    },
  },
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
  margin: calc(var(--unit) / 2) 0;
  margin-right: var(--unit);
  font-size: var(--text-small);
  text-align: left;
  list-style: none;
  cursor: pointer;
  border: var(--border-width-small) solid transparent;
}
.categories__button {
  display: flex;
  align-items: center;
}
.categories__icon {
  width: var(--icon-size-small);
  height: var(--icon-size-small);
  margin-right: var(--unit);
}
.categories__item:last-child {
  margin-right: 0;
}
.categories__item button {
  text-align: left;
}
</style>
