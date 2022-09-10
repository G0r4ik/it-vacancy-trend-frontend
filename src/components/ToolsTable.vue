<template>
  <div class="rating-table">
    <app-pagination
      :tools="tools"
      @changePerPage="changePerPage"
      @changeClick="changeClick">
    </app-pagination>

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

    <!-- <app-pagination
      :tools="tools"
      @changePerPage="changePerPage"
      @changeClick="changeClick">
    </app-pagination> -->
  </div>
</template>

<script>
import appTool from './AppTool.vue'
import AppPagination from './AppPagination.vue'

export default {
  components: { appTool, AppPagination },
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
      paginatedTools: [],
    }
  },

  methods: {
    isOpenModalFunction(tool) {
      this.isOpenModal = true
      this.toolInModal = tool
    },
    closeModal() {
      this.isOpenModal = false
    },
    changePerPage(start, end) {
      this.paginatedTools = this.tools.slice(start, end)
    },
    changeClick(currentPage, itemsPerPage) {
      this.paginatedTools = this.tools.slice(
        (currentPage - 1) * itemsPerPage,
        (currentPage - 1) * itemsPerPage + itemsPerPage
      )
    },
  },
}
</script>
<style scoped>
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
  background: rgba(112, 17, 245, 0.1);
  color: #7011f5;
  border: 2px solid #7011f5;
}
.category2 {
  background: rgb(95%, 24%, 18%, 0.1);
  color: #f13d2e;
  border: 2px solid #f13d2e;
}
.category3 {
  background: rgba(98%, 52%, 0%, 0.1);
  border: 2px solid #ffb703;
  color: #ffb703;
}
.category4 {
  background: rgb(90%, 22%, 27%, 0.1);
  border: 2px solid #e63946;
  color: #e63946;
}
.category5 {
  background: rgb(66, 185, 131, 0.1);
  border: 2px solid #42b983;
  color: #42b983;
}
.category6 {
  background: rgba(46, 196, 182, 0.1);
  color: #2ec4b6;
  border: 2px solid #2ec4b6;
}
.category7 {
  background: rgb(100%, 92%, 0%, 0.1);
  color: #ffea00;
  border: 2px solid #ffea00;
}
.category8 {
  background: rgba(253, 255, 182, 0.1);
  color: #fdffb6;
  border: 2px solid #fdffb6;
}
.category9 {
  background: rgba(38, 77, 228, 0.1);
  color: #264de4;
  border: 2px solid #264de4;
}
.category10 {
  background: rgb(46%, 69%, 80%, 0.1);
  color: #75afcc;
  border: 2px solid #75afcc;
}
.category11 {
  background: rgb(62%, 16%, 17%, 0.1);
  color: #9e2a2b;
  border: 2px solid #9e2a2b;
}
.category12 {
  background: rgb(47%, 16%, 6%, 0.1);
  color: #78290f;
  border: 2px solid #78290f;
}
.category13 {
  background: rgb(56%, 60%, 69%, 0.1);
  color: #8e9aaf;
  border: 2px solid #8e9aaf;
}
.category14 {
  background: rgb(96%, 89%, 52%, 0.1);
  color: #f4e285;
  border: 2px solid #f4e285;
}
.category15 {
  background: rgb(98%, 44%, 57%, 0.1);
  color: #fb6f92;
  border: 2px solid #fb6f92;
}

@media (max-width: 700px) {
  .rating-table__inner {
    font-size: 14px;
  }
}
</style>
