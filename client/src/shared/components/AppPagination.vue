<template>
  <div v-if="pageCount" class="pagination">
    <div class="pagination__inner">
      <button
        class="pagination__button"
        :disabled="isFirstPage"
        @click="changePageWhenClickNumber(1)">
        <IconChevronDouble style="transform: rotate(180deg);" />
      </button>
      <button
        class="pagination__button"
        :disabled="isFirstPage"
        @click="changePageWhenClickNumber(currentPage - 1)">
        <IconChevron style="transform: rotate(180deg);" />
      </button>
      <button
        v-for="page of paginationItems"
        :key="page"
        class="pagination__button"
        :class="{ pagination__button_current: currentPage === page }"
        :disabled="page > pageCount"
        @click="changePageWhenClickNumber(page)">
        {{ page }}
      </button>
      <button
        class="pagination__button"
        :disabled="isLastPage"
        @click="changePageWhenClickNumber(currentPage + 1)">
        <IconChevron />
      </button>
      <button
        class="pagination__button"
        :disabled="isLastPage"
        @click="changePageWhenClickNumber(pageCount)">
        <IconChevronDouble />
      </button>
    </div>
    <label class="pagination__change" for="listing-per-pages">
      <select
        id="listing-per-pages"
        v-model="itemsPerPage"
        name="listing-per-pages"
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
    paginationTools: { type: Array, default: () => [] },
    modelValue: { type: Object, default: Object },
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
      return this.currentPage === this.pageCount
    },
    pageCount() {
      return Math.ceil(this.paginationTools.length / this.itemsPerPage)
    },
    paginationItems() {
      const paginationTool = []
      for (let i = 1; i <= this.pageCount; i++) {
        paginationTool.push(i)
      }

      if (this.currentPage <= Math.floor(Math.sqrt(this.visibleButtons))) {
        return paginationTool.slice(
          0,
          Math.min(this.visibleButtons, this.pageCount)
        )
      }
      if (
        this.currentPage === this.pageCount ||
        this.currentPage === this.pageCount - 1
      ) {
        return paginationTool.slice(
          Math.max(-this.visibleButtons, -this.pageCount)
        )
      }
      return paginationTool.slice(
        this.currentPage - Math.floor(Math.sqrt(this.visibleButtons)) - 1,
        this.currentPage + Math.floor(Math.sqrt(this.visibleButtons))
      )
    },
  },

  watch: {
    paginationTools: {
      handler(newValue, oldValue) {
        if (newValue.length === oldValue.length) {
          this.changePerPage(this.itemsPerPage, this.currentPage)
        } else {
          this.changePerPage(this.itemsPerPage, 1)
        }
      },
      deep: true,
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
    window.addEventListener('resize', () => {
      this.visibleButtons = window.innerWidth > 760 ? 5 : 3
      this.changePageWhenClickNumber(this.currentPage)
    })
  },

  methods: {
    changePerPage(value = 50, currentPage = 1) {
      this.currentPage = currentPage
      if (value.target) this.itemsPerPage = value.target.value
      if (!value.target) this.itemsPerPage = +value

      if (this.currentPage > this.pageCount && this.currentPage !== 1) {
        this.currentPage = this.pageCount || 1
      }
    },
    changePageWhenClickNumber(page) {
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
  width: var(--icon-height-middle);
  height: var(--icon-height-middle);
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
.pagination__button svg {
  /* fill: var(--color-text); */
}
.pagination__button:disabled svg {
  color: var(--color-border);
}
.pagination__change {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: var(--unit);
  font-size: var(--text-small);
}
.pagination__change select {
  padding-top: 4px;
  text-align: center;
  text-align-last: center;
}
.pagination__change option {
  text-align: center;
  text-align-last: center;
}
@media (width < 760px) {
  .pagination__button {
    /* margin: 0; */
  }
}
</style>
