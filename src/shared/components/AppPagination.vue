<template>
  <div v-if="countOfPages" class="pagination">
    <div class="pagination__inner">
      <button
        :id="`go-to-first-page-${uniqId}`"
        :aria-label="`go-to-first-page-${uniqId}`"
        class="pagination__button"
        :disabled="isFirstPage"
        @click="changeCurrentPage(1)">
        <IconChevronDouble style="transform: rotate(180deg)" />
      </button>
      <button
        :id="`go-to-prev-page-${uniqId}`"
        :aria-label="`go-to-prev-page-${uniqId}`"
        class="pagination__button"
        :disabled="isFirstPage"
        @click="changeCurrentPage(currentPage - 1)">
        <IconChevron style="transform: rotate(180deg)" />
      </button>
      <button
        v-for="page of paginationItems"
        :id="`go-to-${page}-page-${uniqId}`"
        :key="page"
        :aria-label="`go-to-${page}-page-${uniqId}`"
        class="pagination__button"
        :class="{ pagination__button_current: currentPage === page }"
        @click="changeCurrentPage(page)">
        {{ page }}
      </button>
      <button
        :id="`go-to-next-page-${uniqId}`"
        :aria-label="`go-to-next-page-${uniqId}`"
        class="pagination__button"
        :disabled="isLastPage"
        @click="changeCurrentPage(currentPage + 1)">
        <IconChevron />
      </button>
      <button
        :id="`go-to-last-page-${uniqId}`"
        :aria-label="`go-to-last-page-${uniqId}`"
        class="pagination__button"
        :disabled="isLastPage"
        @click="changeCurrentPage(countOfPages)">
        <IconChevronDouble />
      </button>
    </div>
    <label class="pagination__change" :for="`listing-per-pages-${uniqId}`">
      <select
        :id="`listing-per-pages-${uniqId}`"
        v-model="itemsPerPage"
        :name="`listing-per-pages-${uniqId}`"
        @change="changePerPage">
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="1000">All</option>
      </select>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    itemsLength: { type: Number, required: true },
    modelValue: { type: Object, required: true },
    uniqId: { type: Number, required: true },
  },

  emits: ['update:modelValue'],

  data() {
    return {
      currentPage: 1,
      itemsPerPage: 50,
      visibleButtons: 3,
    }
  },

  computed: {
    isFirstPage() {
      return this.currentPage === 1
    },
    isLastPage() {
      return this.currentPage === this.countOfPages
    },
    countOfPages() {
      return Math.ceil(this.itemsLength / this.itemsPerPage)
    },
    paginationItems() {
      const paginationTool = []
      for (let i = 1; i <= this.countOfPages; i++) {
        paginationTool.push(i)
      }

      if (this.currentPage <= Math.floor(Math.sqrt(this.visibleButtons))) {
        return paginationTool.slice(
          0,
          Math.min(this.visibleButtons, this.countOfPages)
        )
      }
      if (
        this.currentPage === this.countOfPages ||
        this.currentPage === this.countOfPages - 1
      ) {
        return paginationTool.slice(
          Math.max(-this.visibleButtons, -this.countOfPages)
        )
      }
      return paginationTool.slice(
        this.currentPage - Math.floor(Math.sqrt(this.visibleButtons)) - 1,
        this.currentPage + Math.floor(Math.sqrt(this.visibleButtons))
      )
    },
  },

  watch: {
    itemsLength: {
      handler(newValue, oldValue) {
        if (newValue === oldValue) {
          this.changePerPage(this.itemsPerPage, this.currentPage)
        } else {
          this.changePerPage(this.itemsPerPage, 1)
        }
      },
    },
    modelValue: {
      handler() {
        this.currentPage = this.modelValue.page
        this.itemsPerPage = this.modelValue.itemsPerPage
      },
      deep: true,
    },

    currentPage: {
      handler() {
        const { currentPage } = this
        const { itemsPerPage } = this
        this.$emit('update:modelValue', {
          page: currentPage,
          itemsPerPage,
        })
      },
      deep: true,
    },
    itemsPerPage: {
      handler() {
        this.changePerPage(this.itemsPerPage, 1)
        const { currentPage } = this
        const { itemsPerPage } = this
        this.$emit('update:modelValue', {
          page: currentPage,
          itemsPerPage,
        })
      },
      deep: true,
    },
  },

  mounted() {
    this.visibleButtons = window.innerWidth > 760 ? 5 : 3
    window.addEventListener('resize', this.changeFIXME)
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.changeFIXME)
  },

  methods: {
    changeFIXME() {
      this.visibleButtons = window.innerWidth > 760 ? 5 : 3
      this.changeCurrentPage(this.currentPage)
    },
    changePerPage(value = 50, currentPage = 1) {
      this.currentPage = currentPage
      if (value.target) this.itemsPerPage = value.target.value
      if (!value.target) this.itemsPerPage = +value

      if (this.currentPage > this.countOfPages && this.currentPage !== 1) {
        this.currentPage = this.countOfPages || 1
      }
    },
    changeCurrentPage(page) {
      this.currentPage = page
    },
  },
}
</script>

<style>
.pagination {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-top: var(--unit);
  margin-bottom: var(--unit);
}
.pagination__inner {
  display: inline-flex;
}
.pagination__button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--icon-size);
  height: var(--icon-size);
  margin: 0 var(--unit);
  font-size: var(--text-small);
  color: var(--color-text);
  border-radius: var(--border-radius-extra-small);
}
.pagination__button_current {
  font-weight: 600;
  color: var(--color-primary3);
  background: var(--color-border);
}
.pagination__button:disabled {
  cursor: auto;
}
.pagination__button:disabled svg {
  color: var(--color-border);
}
.pagination__change {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: var(--unit);
  margin-left: auto;
  font-size: var(--text-small);
}
.pagination__change select {
  padding-top: var(--unit);
  text-align: center;
  text-align-last: center;
}
.pagination__change option {
  text-align: center;
  text-align-last: center;
}
</style>
