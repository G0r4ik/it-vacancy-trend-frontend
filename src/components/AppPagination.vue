<template>
  <div class="pagination" v-if="pageCount">
    <div class="pagination__inner">
      <button
        class="pagination__button"
        :disabled="currentPage === 1"
        @click="changeClick(1)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g data-name="Layer 2">
            <g data-name="arrowhead-left">
              <path
                d="M11.64 5.23a1 1 0 0 0-1.41.13l-5 6a1 1 0 0 0 0 1.27l4.83 6a1 1 0 0 0 .78.37 1 1 0 0 0 .78-1.63L7.29 12l4.48-5.37a1 1 0 0 0-.13-1.4z" />
              <path
                d="m14.29 12 4.48-5.37a1 1 0 0 0-1.54-1.28l-5 6a1 1 0 0 0 0 1.27l4.83 6a1 1 0 0 0 .78.37 1 1 0 0 0 .78-1.63z" />
            </g>
          </g>
        </svg>
      </button>
      <button
        class="pagination__button"
        :disabled="currentPage === 1"
        @click="changeClick(currentPage - 1)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g data-name="Layer 2">
            <path
              d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z"
              data-name="arrow-ios-back" />
          </g>
        </svg>
      </button>
      <button
        class="pagination__button"
        :class="{ pagination__button_current: currentPage === page }"
        :disabled="page > pageCount"
        v-for="page of paginationItems"
        :key="page"
        @click="changeClick(page)">
        {{ page }}
      </button>
      <button
        class="pagination__button"
        :disabled="currentPage === pageCount"
        @click="changeClick(currentPage + 1)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g data-name="Layer 2">
            <path
              d="M10 19a1 1 0 0 1-.64-.23 1 1 0 0 1-.13-1.41L13.71 12 9.39 6.63a1 1 0 0 1 .15-1.41 1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19z"
              data-name="arrow-ios-forward" />
          </g>
        </svg>
      </button>
      <button
        class="pagination__button"
        :disabled="currentPage === pageCount"
        @click="changeClick(pageCount)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g data-name="Layer 2">
            <g data-name="arrowhead-right">
              <path
                d="m18.78 11.37-4.78-6a1 1 0 0 0-1.41-.15 1 1 0 0 0-.15 1.41L16.71 12l-4.48 5.37a1 1 0 0 0 .13 1.41A1 1 0 0 0 13 19a1 1 0 0 0 .77-.36l5-6a1 1 0 0 0 .01-1.27z" />
              <path
                d="M7 5.37a1 1 0 0 0-1.61 1.26L9.71 12l-4.48 5.36a1 1 0 0 0 .13 1.41A1 1 0 0 0 6 19a1 1 0 0 0 .77-.36l5-6a1 1 0 0 0 0-1.27z" />
            </g>
          </g>
        </svg>
      </button>
    </div>
    <label for="listing-per-pages">
      <select
        name="listing-per-pages"
        id="listing-per-pages"
        @change="changePerPage">
        <option value="10">10</option>
        <option value="25" selected="selected">25</option>
        <option value="50">50</option>
        <option value="10000">All</option>
      </select>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    tools: Array,
  },

  data() {
    return {
      currentPage: 1,
      pageCount: null,
      paginationItems: [],
      currentPage: 1,
      itemsPerPage: 25,
    }
  },

  watch: {
    tools: {
      handler() {
        this.changePerPage(this.itemsPerPage, this.currentPage)
      },
      deep: true,
    },
  },

  mounted() {
    // this.count = this.pageCount
  },
  methods: {
    changePerPage(e = 25, currentPage = 1) {
      this.currentPage = currentPage
      if (e.target) this.itemsPerPage = e.target.value
      if (!e.target) this.itemsPerPage = +e

      this.pageCount = Math.ceil(this.tools.length / this.itemsPerPage)
      this.paginationItems = []
      if (this.pageCount > 5) {
        this.paginationItems = [1, 2, 3, 4, 5]
      } else {
        for (let i = 1; i <= this.pageCount; i++) {
          this.paginationItems.push(i)
        }
      }

      if (this.currentPage > this.pageCount && this.currentPage !== 1) {
        this.currentPage = this.pageCount
        console.log(2)
        this.$emit('changePerPage', 0, this.itemsPerPage)
      } else {
        console.log('ba2')
        const start = (this.currentPage - 1) * this.itemsPerPage
        this.$emit('changePerPage', start, start + this.itemsPerPage)

        // this.paginatedTools = this.tools.slice(
        //   currentPage * itemsPerPage,
        //   itemsPerPage
        // )
      }
    },
    changeClick(page) {
      this.currentPage = page

      this.paginationItems = []
      for (let i = 1; i <= this.pageCount; i++) this.paginationItems.push(i)
      if (this.currentPage <= 2) {
        this.paginationItems = this.paginationItems.slice(
          0,
          Math.min(5, this.pageCount)
        )
      } else if (
        this.currentPage === this.pageCount ||
        this.currentPage === this.pageCount - 1
      ) {
        this.paginationItems = this.paginationItems.slice(
          Math.max(-5, -this.pageCount)
        )
      } else {
        this.paginationItems = this.paginationItems.slice(
          this.currentPage - 3,
          this.currentPage + 2
        )
      }
      this.$emit('changeClick', this.currentPage, +this.itemsPerPage)
    },
  },
}
</script>

<style scoped>
.pagination {
  margin-bottom: var(--margin-small);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.pagination__inner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 300px;
}
.pagination__button {
  color: var(--color-text);
  margin: 0 5px;
  width: 10%;
  max-width: 35px;
  height: 35px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.pagination__button_current {
  background: #bbbbbb6c;
}

.pagination__button:disabled {
  cursor: auto;
}

.pagination__button svg {
  fill: var(--color-text);
}

.pagination__button:disabled svg {
  fill: gray;
}
</style>
