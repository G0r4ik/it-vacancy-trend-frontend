<template>
  <div class="pagination" v-if="pageCount">
    <div class="pagination__inner">
      <button
        class="pagination__button"
        :disabled="isFirstPage"
        @click="changePageWhenClickNumber(1)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g data-name="Layer 2">
            <g data-name="arrowhead-left">
              <path
                d="M11.64 5.23a1 1 0 0 0-1.41.13l-5 6a1 1 0 0 0 0 1.27l4.83 6a1 1 0 0 0 .78.37 1 1 0 0 0 .78-1.63L7.29 12l4.48-5.37a1 1 0 0 0-.13-1.4z"
              />
              <path
                d="m14.29 12 4.48-5.37a1 1 0 0 0-1.54-1.28l-5 6a1 1 0 0 0 0 1.27l4.83 6a1 1 0 0 0 .78.37 1 1 0 0 0 .78-1.63z"
              />
            </g>
          </g>
        </svg>
      </button>
      <button
        class="pagination__button"
        :disabled="isFirstPage"
        @click="changePageWhenClickNumber(currentPage - 1)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g data-name="Layer 2">
            <path
              d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z"
              data-name="arrow-ios-back"
            />
          </g>
        </svg>
      </button>
      <button
        class="pagination__button"
        :class="{ pagination__button_current: currentPage === page }"
        :disabled="page > pageCount"
        v-for="page of paginationItems"
        :key="page"
        @click="changePageWhenClickNumber(page)"
      >
        {{ page }}
      </button>
      <button
        class="pagination__button"
        :disabled="isLastPage"
        @click="changePageWhenClickNumber(currentPage + 1)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g data-name="Layer 2">
            <path
              d="M10 19a1 1 0 0 1-.64-.23 1 1 0 0 1-.13-1.41L13.71 12 9.39 6.63a1 1 0 0 1 .15-1.41 1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19z"
              data-name="arrow-ios-forward"
            />
          </g>
        </svg>
      </button>
      <button
        class="pagination__button"
        :disabled="isLastPage"
        @click="changePageWhenClickNumber(pageCount)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g data-name="Layer 2">
            <g data-name="arrowhead-right">
              <path
                d="m18.78 11.37-4.78-6a1 1 0 0 0-1.41-.15 1 1 0 0 0-.15 1.41L16.71 12l-4.48 5.37a1 1 0 0 0 .13 1.41A1 1 0 0 0 13 19a1 1 0 0 0 .77-.36l5-6a1 1 0 0 0 .01-1.27z"
              />
              <path
                d="M7 5.37a1 1 0 0 0-1.61 1.26L9.71 12l-4.48 5.36a1 1 0 0 0 .13 1.41A1 1 0 0 0 6 19a1 1 0 0 0 .77-.36l5-6a1 1 0 0 0 0-1.27z"
              />
            </g>
          </g>
        </svg>
      </button>
    </div>
    <label class="pagination__change" for="listing-per-pages">
      <select
        name="listing-per-pages"
        id="listing-per-pages"
        @change="changePerPage"
      >
        <option value="25">25</option>
        <option value="50" selected="selected">50</option>
        <option value="100">100</option>
        <option value="1000">All</option>
      </select>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    tools: Array,
    paginationTools: Array,
  },

  data() {
    return {
      currentPage: 1,
      pageCount: null,
      paginationItems: [],
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
  },

  watch: {
    paginationTools: {
      handler(newValue, oldValue) {
        if (newValue.length !== oldValue.length) {
          this.changePerPage(this.itemsPerPage, 1)
        } else {
          this.changePerPage(this.itemsPerPage, this.currentPage)
        }
      },
      deep: true,
    },
  },

  methods: {
    changePerPage(e = 50, currentPage = 1) {
      this.currentPage = currentPage
      if (e.target) this.itemsPerPage = e.target.value
      if (!e.target) this.itemsPerPage = +e

      this.pageCount = Math.ceil(
        this.paginationTools.length / this.itemsPerPage
      )
      this.paginationItems = []
      if (this.pageCount > this.visibleButtons) {
        for (let i = 1; i <= this.visibleButtons; i++) {
          this.paginationItems.push(i)
        }
      } else {
        for (let i = 1; i <= this.pageCount; i++) {
          this.paginationItems.push(i)
        }
      }

      if (this.currentPage > this.pageCount && this.currentPage !== 1) {
        this.currentPage = this.pageCount || 1
        this.$emit('changePerPage', 0, this.itemsPerPage)
      } else {
        const start = (this.currentPage - 1) * this.itemsPerPage
        this.$emit('changePerPage', start, start + this.itemsPerPage)
      }
    },
    changePageWhenClickNumber(page) {
      this.currentPage = page

      this.paginationItems = []
      for (let i = 1; i <= this.pageCount; i++) {
        this.paginationItems.push(i)
      }
      if (this.currentPage <= Math.floor(Math.sqrt(this.visibleButtons))) {
        this.paginationItems = this.paginationItems.slice(
          0,
          Math.min(this.visibleButtons, this.pageCount)
        )
      } else if (
        this.currentPage === this.pageCount ||
        this.currentPage === this.pageCount - 1
      ) {
        this.paginationItems = this.paginationItems.slice(
          Math.max(-this.visibleButtons, -this.pageCount)
        )
      } else {
        this.paginationItems = this.paginationItems.slice(
          this.currentPage - Math.floor(Math.sqrt(this.visibleButtons)) - 1,
          this.currentPage + Math.floor(Math.sqrt(this.visibleButtons))
        )
      }
      this.$emit(
        'changePageWhenClickNumber',
        this.currentPage,
        +this.itemsPerPage
      )
    },
  },
  mounted() {
    this.visibleButtons = window.innerWidth > 760 ? 5 : 3
    window.addEventListener('resize', () => {
      this.visibleButtons = window.innerWidth > 760 ? 5 : 3
      this.changePageWhenClickNumber(this.currentPage)
    })
  },
  emits: ['changePageWhenClickNumber', 'changePerPage'],
}
</script>

<style>
.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: var(--margin-small);
}
.pagination__inner {
  display: inline-flex;
}
.pagination__button {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 var(--margin-extra-small);
  width: var(--icon-height-middle);
  height: var(--icon-height-middle);
  border-radius: var(--border-radius-extra-small);
  font-size: var(--text-small);
  color: var(--color-text);
}
.pagination__button_current {
  background: var(--color-border);
  font-weight: 600;
  color: var(--color-primary3);
}
.pagination__button:disabled {
  cursor: auto;
}
.pagination__button svg {
  fill: var(--color-text);
}
.pagination__button:disabled svg {
  fill: var(--color-border);
}
.pagination__change {
  margin-top: var(--margin-extra-small);
  font-size: var(--text-small);
  display: flex;
  align-items: center;
  justify-content: center;
}
.pagination__change select {
}
@media (width < 760px) {
  .pagination__button {
    /* margin: 0; */
  }
}
</style>
