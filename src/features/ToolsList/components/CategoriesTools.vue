<template>
  <div>
    <ul class="categories">
      <li
        v-for="category of filteredCategories"
        :key="category.id_category"
        class="categories__item"
        :class="[
          currentCategories.includes(category.id_category) &&
            `categories__item_${category.id_category}`,
        ]"
        @click="$emit('changeCategory', category.id_category)">
        <button class="categories__button">
          {{ hasClass(category.id_category) }}
          <img
            class="categories__icon"
            :src="getImg(category.id_category)"
            :alt="`logo ${category.name_category}`" />
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
      console.log(temporary.length)
      for (let i = 0; i < temporary.length / 2 + 1; i++) {
        console.log(temporary[i])
        if (temporary[i] === temporary.at(-i)) {
          res.push(temporary[i])
        } else {
          res.push(temporary.at(-i), temporary[i])
        }
      }
      return res
    },
  },

  methods: {
    getCSS() {
      const allCSS = [...document.styleSheets]
        .map(styleSheet => {
          try {
            return [...styleSheet.cssRules].map(rule => rule.cssText).join('')
          } catch (e) {
            console.log(
              'Access to stylesheet %s is denied. Ignoring...',
              styleSheet.href
            )
          }
        })
        .filter(Boolean)
        .join('\n')
      return allCSS
    },
    hasClass(categoryId) {
      if (!this.getCSS().includes(`categories__item_${categoryId}`)) {
        console.log(1)
        const style = document.createElement('style')
        style.type = 'text/css'
        style.innerHTML = `.categories__item_${categoryId} {   color: #8e9aaf; background: rgb(56 60 69 / 0.1); border: var(--border-width-small) solid #8e9aaf !important; }`
        document.getElementsByTagName('head')[0].appendChild(style)
      }
    },
    getImg(id_category) {
      try {
        return require(`../assets/categories/${id_category}.svg`)
      } catch (error) {
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
