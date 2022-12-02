<template>
  <div class="container">
    <h2 class="title list-title">List</h2>
    <VueSkeleton
      v-if="!tools.length"
      width="30px"
      height="30px"
      display="inline-block"
      ml="var(--margin-small)"
    />
    <span v-else class="list-count"> ({{ filteredList.length }})</span>
    <VueSkeleton
      v-if="!categories.length"
      width="100%"
      height="250px"
      mb="var(--margin-small)"
      br="var(--radius)"
    />
    <RatingFilters
      v-if="dates.length"
      :categories="categories"
      :current-categories="currentCategories"
      :dates="dates"
      :selected-date="selectedDate"
      @changeCategory="changeCategory"
      @changeSearch="changeSearch"
      @changeSelectedDate="changeSelectedDate"
    />
    <RatingSelectList
      :list="currentList"
      @changeCurrentList="changeCurrentList"
    />
    <VueSkeleton
      v-if="!tools.length"
      width="300px"
      height="50px"
      mb="var(--margin-small)"
    />
    <rating-pagination
      :pagination-tools="filteredList"
      :model-value="pagination"
      @update:modelValue="pagination = $event"
    ></rating-pagination>

    <ToolsTable
      v-if="currentList"
      :selected-date="selectedDate"
      :pagination-tools="paginationTools"
      :tools="paginationTools"
      :dates="dates"
      :is-data-loaded="isDataLoaded"
      @addToFavoriteTools="addToFavoriteTools"
      @addToStudiedTools="addToStudiedTools"
      @listSort="listSort"
    />
    <rating-pagination
      :pagination-tools="filteredList"
      :model-value="pagination"
      @update:modelValue="pagination = $event"
    ></rating-pagination>
  </div>
</template>

<script>
import ToolsTable from './ToolsTable.vue'
import RatingPagination from './RatingPagination.vue'
import RatingFilters from './RatingFilters.vue'
import RatingSelectList from './RatingSelectList.vue'
import VueSkeleton from './VueSkeleton.vue'
// import ToolsList from './ToolsList.vue'
import api from '../api'

export default {
  components: {
    ToolsTable,
    RatingPagination,
    RatingFilters,
    RatingSelectList,
    VueSkeleton,
  },

  data() {
    return {
      pagination: { page: 1, itemsPerPage: 50 },
      categories: [],
      selectedDate: {
        id_date: null,
        date_of_complition: null,
      },
      currentCategories: [],
      searchInput: '',
      sortList: '',
      currentList: 'tools',
      directionsForSorting: 'DESC',
      // currentJobBoard: 'Indeed',
    }
  },

  computed: {
    tools() {
      return this.$store.getters.tools
    },
    dates() {
      return this.$store.getters.dates
    },
    isDataLoaded() {
      return this.$store.getters.isToolsLoaded
    },
    paginationTools() {
      console.log()
      return this.filteredList.slice(
        (this.pagination.page - 1) * this.pagination.itemsPerPage,
        (this.pagination.page - 1) * this.pagination.itemsPerPage +
          this.pagination.itemsPerPage
      )
    },
    filteredList() {
      let list = this.tools.filter(t => {
        const inputCheck = t.name_tool
          .toLowerCase()
          .includes(this.searchInput.toLowerCase())
        const categoryCheck = this.currentCategories.includes(
          t.category.id_category
        )
        return inputCheck && categoryCheck
      })

      if (this.sortList === 'name_tool') list.sort(this.sortName())
      if (this.sortList === 'id_category') {
        list.sort(this.sortCategory())
      }
      if (this.sortList === 'HeadHunter') list.sort(this.sortCount())
      if (this.currentList === 'favoritesTools') {
        list = list.filter(t => t.isFav)
      }
      if (this.currentList === 'studiedTools') {
        list = list.filter(t => t.isStudied)
      }
      return list
    },
  },

  // WHY BOTTOM
  watch: {
    dates(newValue) {
      this.selectedDate = newValue.at(-1)
    },
  },
  // WHY TOP

  mounted() {
    // api.logoutUser()

    // console.log(
    //   registrationUser('egor', 'sdsdsd', 'egorgorlushkin0@gmail.com').then(
    //     res => res.data
    //   )
    // )
    // console.log(
    //   api
    //     .loginUser('egorgorlushkin0@gmail.com', 'mega0password')
    //     .then(res => res)
    // )

    // console.log(
    //   api
    //     .refreshToken(
    //       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo4OCwidXNlcl9lbWFpbCI6ImVnb3Jnb3JsdXNoa2luMEBnbWFpbC5jb20iLCJpc19hY3RpdmUiOmZhbHNlLCJkYXRlX29mX3JlZ2lzdHJhdGlvbiI6IjIwMjItMTAtMzBUMjE6MDA6MDAuMDAwWiIsImlhdCI6MTY2NzI5NDYwNiwiZXhwIjoxNjY5ODg2NjA2fQ.68enP7vHc1YLCyRSmSM9OhHi6OvTfFqiTqv7IReodrY'
    //     )
    //     .then(res => res)
    // )

    // api
    //   .registrationUser('egorgorlushkin0@gmail.com', 'mega0password')
    //   .then(res => console.log(res))

    // this.selectedDate = this.lastDate
    api.getCategories().then(res => {
      this.categories = res
      this.currentCategories = res.map(c => c.id_category)
    })
  },

  methods: {
    async getDates() {
      this.dates = await this.$store.getters.dates
    },
    async getLast() {
      this.selectedDate = await this.dates
    },
    changeSelectedDate(selectDate) {
      this.selectedDate = selectDate
    },
    changeCurrentList(list) {
      this.currentList = list
    },
    changeSearch(e) {
      this.searchInput = e.target.value
    },
    changeCategory(category) {
      const index = this.currentCategories.indexOf(category)
      if (category === 'all' && !this.currentCategories.length) {
        this.currentCategories = this.categories.map(c => c.id_category)
      } else if (category === 'all' && this.currentCategories.length) {
        this.currentCategories = []
      } else if (category !== 'all' && index === -1) {
        this.currentCategories.push(category)
      } else if (category !== 'all' && index !== -1) {
        this.currentCategories.splice(index, 1)
      }
    },
    sortName() {
      const directionsForSorting = this.directionsForSorting
      return function (a, b) {
        return directionsForSorting === 'DESC'
          ? a.name_tool.localeCompare(b.name_tool)
          : b.name_tool.localeCompare(a.name_tool)
      }
    },
    sortCategory() {
      const directionsForSorting = this.directionsForSorting
      return function (a, b) {
        return directionsForSorting === 'DESC'
          ? a.category.name_category.localeCompare(b.category.name_category)
          : b.category.name_category.localeCompare(a.category.name_category)
      }
    },
    sortCount() {
      const directionsForSorting = this.directionsForSorting
      const id_date = this.selectedDate.id_date
      return function (a, b) {
        if (!b.counts.HeadHunter[id_date]) {
          b.counts.HeadHunter[id_date] = 0
        }
        if (!a.counts.HeadHunter[id_date]) {
          a.counts.HeadHunter[id_date] = 0
        }
        return directionsForSorting === 'DESC'
          ? a?.counts?.HeadHunter?.[id_date] - b?.counts?.HeadHunter?.[id_date]
          : b?.counts?.HeadHunter?.[id_date] - a?.counts?.HeadHunter?.[id_date]
      }
    },
    listSort(v = this.sortList, saveSort = false) {
      this.sortList = v
      if (!saveSort) {
        this.directionsForSorting =
          this.directionsForSorting === 'DESC' ? 'ASC' : 'DESC'
      }
      this.sortList = v
    },
    addToFavoriteTools(tool) {
      if (tool.isFav) {
        const f = localStorage
          .getItem('favoritesTools')
          .split(' ')
          .filter(t => {
            return +t !== tool.id_tool
          })
          .join(' ')
        localStorage.setItem('favoritesTools', f)
      } else {
        const favoritesTools = localStorage.getItem('favoritesTools')
        if (favoritesTools === null) {
          localStorage.setItem('favoritesTools', `${tool.id_tool}`)
        } else {
          localStorage.setItem(
            'favoritesTools',
            `${favoritesTools} ${tool.id_tool}`
          )
        }
      }
      tool.isFav = !tool.isFav
    },
    addToStudiedTools(tool) {
      if (tool.isStudied) {
        const f = localStorage
          .getItem('studiedTools')
          .split(' ')
          .filter(t => +t !== tool.id_tool)
          .join(' ')
        localStorage.setItem('studiedTools', f)
      } else {
        const studiedTools = localStorage.getItem('studiedTools')
        if (studiedTools === null) {
          localStorage.setItem('studiedTools', `${tool.id_tool}`)
        } else {
          localStorage.setItem(
            'studiedTools',
            `${studiedTools} ${tool.id_tool}`
          )
        }
      }
      tool.isStudied = !tool.isStudied
    },
  },
}
</script>

<style>
.list-title {
  display: inline-block;
}
.list-count {
  margin-left: var(--margin-extra-small);
  color: var(--color-primary3);
  font-size: var(--text-large);
}
</style>
