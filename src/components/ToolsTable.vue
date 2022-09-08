<template>
  <div class="rating-table">
    <div class="wrapper-top-table">
      <div class="pagination">
        <button
          class="pagination__button"
          :disabled="currentPage === 1"
          @click="goFirst">
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
          @click="minusOne">
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
          :class="currentPage === page ? 'pagination__button_current' : ''"
          :disabled="page > pageCount"
          v-for="page of visible"
          :key="page"
          @click="changeClick(page)">
          {{ page }}
        </button>
        <button
          class="pagination__button"
          :disabled="currentPage === pageCount"
          @click="addOne">
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
          @click="goLast">
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
          @change="changePerPage($event)">
          <option value="10">10</option>
          <option value="25" selected="selected">25</option>
          <option value="50">50</option>
          <option value="10000">All</option>
        </select>
      </label>
    </div>

    <table class="rating-table__inner">
      <thead class="rating-table__thead">
        <tr class="rating-table__row">
          <th class="rating-table__th"></th>
          <th class="rating-table__th" @click="$emit('listSort', 'name_tool')">
            Название
            <span class="rating-table__icon-change-sort">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 400 400"
                xml:space="preserve">
                <path
                  d="M73.092 164.452h255.813c4.949 0 9.233-1.807 12.848-5.424 3.613-3.616 5.427-7.898 5.427-12.847s-1.813-9.229-5.427-12.85L213.846 5.424C210.232 1.812 205.951 0 200.999 0s-9.233 1.812-12.85 5.424L60.242 133.331c-3.617 3.617-5.424 7.901-5.424 12.85 0 4.948 1.807 9.231 5.424 12.847 3.621 3.617 7.902 5.424 12.85 5.424zm255.813 73.097H73.092c-4.952 0-9.233 1.808-12.85 5.421-3.617 3.617-5.424 7.898-5.424 12.847s1.807 9.233 5.424 12.848L188.149 396.57c3.621 3.617 7.902 5.428 12.85 5.428s9.233-1.811 12.847-5.428l127.907-127.906c3.613-3.614 5.427-7.898 5.427-12.848 0-4.948-1.813-9.229-5.427-12.847-3.614-3.616-7.899-5.42-12.848-5.42z" />
              </svg>
            </span>
          </th>
          <th
            class="rating-table__th"
            @click="$emit('listSort', 'id_category')">
            Категория
            <span class="rating-table__icon-change-sort">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 400 400"
                xml:space="preserve">
                <path
                  d="M73.092 164.452h255.813c4.949 0 9.233-1.807 12.848-5.424 3.613-3.616 5.427-7.898 5.427-12.847s-1.813-9.229-5.427-12.85L213.846 5.424C210.232 1.812 205.951 0 200.999 0s-9.233 1.812-12.85 5.424L60.242 133.331c-3.617 3.617-5.424 7.901-5.424 12.85 0 4.948 1.807 9.231 5.424 12.847 3.621 3.617 7.902 5.424 12.85 5.424zm255.813 73.097H73.092c-4.952 0-9.233 1.808-12.85 5.421-3.617 3.617-5.424 7.898-5.424 12.847s1.807 9.233 5.424 12.848L188.149 396.57c3.621 3.617 7.902 5.428 12.85 5.428s9.233-1.811 12.847-5.428l127.907-127.906c3.613-3.614 5.427-7.898 5.427-12.848 0-4.948-1.813-9.229-5.427-12.847-3.614-3.616-7.899-5.42-12.848-5.42z" />
              </svg>
            </span>
          </th>
          <th class="rating-table__th" @click="$emit('listSort', 'Indeed')">
            Indeed
            <span class="rating-table__icon-change-sort">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 400 400"
                xml:space="preserve">
                <path
                  d="M73.092 164.452h255.813c4.949 0 9.233-1.807 12.848-5.424 3.613-3.616 5.427-7.898 5.427-12.847s-1.813-9.229-5.427-12.85L213.846 5.424C210.232 1.812 205.951 0 200.999 0s-9.233 1.812-12.85 5.424L60.242 133.331c-3.617 3.617-5.424 7.901-5.424 12.85 0 4.948 1.807 9.231 5.424 12.847 3.621 3.617 7.902 5.424 12.85 5.424zm255.813 73.097H73.092c-4.952 0-9.233 1.808-12.85 5.421-3.617 3.617-5.424 7.898-5.424 12.847s1.807 9.233 5.424 12.848L188.149 396.57c3.621 3.617 7.902 5.428 12.85 5.428s9.233-1.811 12.847-5.428l127.907-127.906c3.613-3.614 5.427-7.898 5.427-12.848 0-4.948-1.813-9.229-5.427-12.847-3.614-3.616-7.899-5.42-12.848-5.42z" />
              </svg>
            </span>
          </th>
          <th class="rating-table__th" @click="$emit('listSort', 'HeadHunter')">
            HHru
            <span class="rating-table__icon-change-sort">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 400 400"
                xml:space="preserve">
                <path
                  d="M73.092 164.452h255.813c4.949 0 9.233-1.807 12.848-5.424 3.613-3.616 5.427-7.898 5.427-12.847s-1.813-9.229-5.427-12.85L213.846 5.424C210.232 1.812 205.951 0 200.999 0s-9.233 1.812-12.85 5.424L60.242 133.331c-3.617 3.617-5.424 7.901-5.424 12.85 0 4.948 1.807 9.231 5.424 12.847 3.621 3.617 7.902 5.424 12.85 5.424zm255.813 73.097H73.092c-4.952 0-9.233 1.808-12.85 5.421-3.617 3.617-5.424 7.898-5.424 12.847s1.807 9.233 5.424 12.848L188.149 396.57c3.621 3.617 7.902 5.428 12.85 5.428s9.233-1.811 12.847-5.428l127.907-127.906c3.613-3.614 5.427-7.898 5.427-12.848 0-4.948-1.813-9.229-5.427-12.847-3.614-3.616-7.899-5.42-12.848-5.42z" />
              </svg>
            </span>
          </th>
          <th class="rating-table__th"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(tool, i) of paginatedTools"
          :key="tool.id_tool"
          class="rating-table__row">
          <td class="rating-table__item rating-table__item_counter">
            {{ i + 1 }}
          </td>
          <td class="rating-table__item rating-table__item_name">
            <img
              class="rating-table__item-logo"
              :src="tool.srcImg ? tool.srcImg : '../assets/user-avatar.png'"
              :alt="`Logo ${tool.name_tool}`" />
            <span @click="isOpenModalFunction(tool)">
              {{ tool.name_tool }}
            </span>
            <span
              class="rating-table__item-star"
              :class="{
                'rating-table__item-star_active': favoritesTools?.find(
                  t => t.id_tool === tool.id_tool
                ),
              }"
              @click="$emit('clickIconFavoriteTools', tool)">
              &#9733;
            </span>
          </td>
          <td class="rating-table__item">
            <div
              class="rating-table__item_category"
              :class="'category' + tool.category.id_category">
              {{ tool.category.name_category }}
            </div>
          </td>
          <th class="rating-table__item rating-table__item_count">
            {{ tool.counts.Indeed?.[selectedDate.id_date] }}
          </th>
          <td class="rating-table__item rating-table__item_count">
            <!-- {{ tool.counts[selectedDate.id_date].countHeadHunter }} -->
          </td>
          <td class="rating-table__item rating-table__item_ready">
            <svg
              @click="$emit('clickIconStudiedTools', tool)"
              :class="{
                'rating-table__item_ready_active': studiedTools?.find(
                  t => t.id_tool === tool.id_tool
                ),
              }"
              class="rating-table__item_ready-svg"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16,31A15,15,0,1,1,31,16,15,15,0,0,1,16,31ZM16,3A13,13,0,1,0,29,16,13,13,0,0,0,16,3Z" />
              <path
                d="M13.67,22a1,1,0,0,1-.73-.32l-4.67-5a1,1,0,0,1,1.46-1.36l3.94,4.21,8.6-9.21a1,1,0,1,1,1.46,1.36l-9.33,10A1,1,0,0,1,13.67,22Z" />
            </svg>
          </td>
        </tr>
        <teleport to="body">
          <app-tool
            :tools="tools"
            :currentTool="toolInModal"
            :dates="dates"
            @closeModal="closeModal"
            v-if="isOpenModal">
          </app-tool>
        </teleport>
      </tbody>
    </table>
  </div>
</template>

<script>
import appTool from './AppTool.vue'

export default {
  components: { appTool },
  props: {
    dates: Array,
    tools: Array,
    favoritesTools: Array,
    studiedTools: Array,
    selectedDate: Object,
    selectedCategory: [String, Object],
    searchInput: String,
  },

  emits: ['clickIconFavoriteTools', 'clickIconStudiedTools', 'listSort'],

  data() {
    return {
      isOpenModal: false,
      currentPage: 1,
      itemsPerPage: 25,
      paginatedTools: [],
      visible: [],
      pageCount: null,
    }
  },

  computed: {},
  watch: {
    tools: {
      handler() {
        this.changePerPage(this.itemsPerPage)
      },
      deep: true,
    },
  },
  mounted() {},
  methods: {
    isOpenModalFunction(tool) {
      this.isOpenModal = true
      this.toolInModal = tool
    },
    closeModal() {
      this.isOpenModal = false
    },
    addOne() {
      this.currentPage++
      this.test()
      if (
        this.currentPage < 3 ||
        this.currentPage === this.pageCount - 1 ||
        this.currentPage === this.pageCount
      ) {
        return
      }

      this.visible = [
        this.currentPage - 2,
        this.currentPage - 1,
        this.currentPage,
        this.currentPage + 1,
        this.currentPage + 2,
      ]
    },
    minusOne() {
      this.currentPage--
      this.test()
      if (
        this.currentPage < 3 ||
        this.currentPage === this.pageCount - 1 ||
        this.currentPage === this.pageCount
      ) {
        return
      }

      this.visible = [
        this.currentPage - 2,
        this.currentPage - 1,
        this.currentPage,
        this.currentPage + 1,
        this.currentPage + 2,
      ]
    },
    goFirst() {
      this.currentPage = 1
      this.test()

      this.visible = []
      if (this.pageCount > 6) {
        for (let i = 1; i < 6; i++) this.visible.push(i)
      } else {
        for (let i = 1; i <= this.pageCount; i++) this.visible.push(i)
      }
    },
    goLast() {
      this.currentPage = this.pageCount
      this.test()
      this.visible = []
      if (this.pageCount > 6) {
        for (let i = this.pageCount; i > this.pageCount - 5; i--) {
          this.visible.unshift(i)
        }
      } else {
        for (let i = 1; i <= this.pageCount; i++) {
          this.visible.push(i)
        }
      }
    },
    test() {
      this.paginatedTools = []
      this.paginatedTools = this.tools.slice(
        (this.currentPage - 1) * this.itemsPerPage,
        (this.currentPage - 1) * +this.itemsPerPage + +this.itemsPerPage
      )
    },
    changePerPage(e = 25) {
      this.currentPage = 1
      if (e.target) this.itemsPerPage = e.target.value
      if (!e.target) this.itemsPerPage = +e

      this.pageCount = Math.ceil(this.tools.length / this.itemsPerPage)
      this.paginatedTools = []
      this.visible = []
      if (this.pageCount > 5) {
        this.visible = [1, 2, 3, 4, 5]
      } else {
        for (let i = 1; i <= this.pageCount; i++) {
          this.visible.push(i)
        }
      }
      this.paginatedTools = this.tools.slice(0, this.itemsPerPage)
    },
    changeClick(e) {
      this.currentPage = e
      this.paginatedTools = []

      this.paginatedTools = this.tools.slice(
        (this.currentPage - 1) * this.itemsPerPage,
        (this.currentPage - 1) * +this.itemsPerPage + +this.itemsPerPage
      )
      if (
        this.currentPage < 3 ||
        this.currentPage === this.pageCount - 1 ||
        this.currentPage === this.pageCount
      ) {
        return
      }

      this.visible = [
        this.currentPage - 2,
        this.currentPage - 1,
        this.currentPage,
        this.currentPage + 1,
        this.currentPage + 2,
      ]
    },
  },
}
</script>

<style scoped>
.wrapper-top-table {
  margin-bottom: var(--margin-small);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pagination {
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
.rating-table {
  overflow-x: auto;
}

.rating-table__inner {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  position: relative;
  /* font-size: 20px; */
}

.rating-table__thead {
  position: sticky;
  top: -1px;
  padding: 15px 0;
  background: var(--color-background);
  z-index: 10000;
  width: 100%;
}

.rating-table__row {
}

table {
  counter-reset: section;
  list-style-type: none;
}

.rating-table__th {
  color: #585858;
  font-weight: 700;
  cursor: pointer;
  padding-bottom: var(--padding-small);
  border-bottom: 2px solid #585858;
  padding-bottom: 15px;
  padding-left: 10px;
  padding-top: 15px;
  font-size: 16px;
}

.rating-table__icon-change-sort {
  width: 13px;
  display: inline-block;
  fill: gray;
  vertical-align: middle;
}

.rating-table__item {
  border-bottom: 2px solid #404149;
  padding: 10px;
  padding-bottom: var(--padding-small);
  padding-top: var(--padding-small);
  text-align: center;
  min-width: 130px;
  vertical-align: middle;
}

.rating-table__item_counter {
  width: 40px;
  min-width: auto;
  padding: 0;
}

.rating-table__item_counter::before {
  counter-increment: section;
  content: counters(section, '.') ' ';
}

.rating-table__item_name {
  /* text-align: left; */
}

.rating-table__item-logo {
  vertical-align: middle;
  width: 30px;
  height: 30px;
  margin-right: var(--margin-small);
}

.rating-table__item-star {
  margin-right: 10px;
}

.rating-table__item-star {
  /* max-width: 60px; */
  cursor: pointer;
  padding: 0;
  min-width: auto;
}

.rating-table__item-star_active {
  color: #f6b87e;
}

.rating-table__item_category {
  padding: 0 10px;
  margin: 0 auto;
  height: 40px;
  border-radius: 20px;
  max-width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}

.rating-table__item_count {
  min-width: auto;
}

.rating-table__item_ready {
  min-width: auto;
}

.rating-table__item_ready_active {
  background: green;
}

.rating-table__item_ready-svg {
  cursor: pointer;
  width: 42px;
  border-radius: 50%;
  fill: var(--color-text);
}

.category1 {
  background: #ff00ff;
}
.category2 {
  background: #ffff00;
  color: var(--color-background);
}
.category3 {
  background: #ff9900;
}
.category4 {
  background: #ea4335;
}
.category5 {
  background: #00ff00;
  color: var(--color-background);
}
.category6 {
  background: #00ffff;
  color: var(--color-background);
}
.category7 {
  background: #b6d7a8;
  color: var(--color-background);
}
.category8 {
  background: #46bdc6;
}
.category9 {
  background: #9900ff;
}
.category10 {
  background: #a4c2f4;
  color: var(--color-background);
}
.category11 {
  background: #34a853;
}
.category12 {
  background: #3d85c6;
}
.category13 {
  background: #ead1dc;
  color: var(--color-background);
}
.category14 {
  background: #f3f3f3;
  border: 5px solid red;
  color: var(--color-background);
}
.category15 {
  background: #cccccc;
  color: var(--color-background);
}

@media (max-width: 700px) {
  .rating-table__inner {
    font-size: 14px;
  }
}
</style>
