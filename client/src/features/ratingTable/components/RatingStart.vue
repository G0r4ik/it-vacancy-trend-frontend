<template>
  <TheHeader />
  <div class="container">
    <h2 class="title list-title">List</h2>
    <AppSkeleton
      v-if="tools.length === 0"
      width="calc(var(--unit) * 6);"
      height="calc(var(--unit) * 6);"
      display="inline-block"
      ml="var(--unit)" />
    <span v-else class="list-count"> ({{ filteredList.length }})</span>
    <AppSkeleton
      v-if="categories.length === 0"
      width="100%"
      height="250px"
      mb="var(--unit)"
      br="var(--radius)" />
    <RatingFilters
      v-if="dates.length > 0"
      :categories="categories"
      :current-categories="currentCategories"
      :dates="dates"
      :selected-date="selectedDate"
      @change-category="changeCategory"
      @change-search="changeSearch"
      @change-selected-date="changeSelectedDate" />
    <RatingSelectList
      :list="currentList"
      @change-current-list="changeCurrentList" />
    <AppSkeleton
      v-if="tools.length === 0"
      width="300px"
      height="calc(var(--unit) * 10)"
      mb="var(--unit)" />
    <AppPagination
      :pagination-tools="filteredList"
      :model-value="pagination"
      @update:model-value="pagination = $event" />

    <ToolsTable
      v-if="currentList"
      :selected-date="selectedDate"
      :pagination-tools="paginationTools"
      :tools="paginationTools"
      :dates="dates"
      :is-data-loaded="isDataLoaded"
      @add-to-favorite-tools="addToFavoriteTools"
      @add-to-studied-tools="addToStudiedTools"
      @list-sort="listSort" />

    <AppPagination
      :pagination-tools="filteredList"
      :model-value="pagination"
      @update:model-value="pagination = $event" />
  </div>
</template>

<script>
import RatingFilters from './RatingFilters.vue'
import RatingSelectList from './RatingSelectList.vue'
import TheHeader from '@client/shared/components/TheHeader.vue'
import ToolsTable from './ToolsTable.vue'
import api from '../api'
import { useStore } from '../store'

export default {
  components: {
    ToolsTable,
    RatingFilters,
    RatingSelectList,
    TheHeader,
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
      return useStore().tools
    },
    dates() {
      return useStore().dates
    },
    isDataLoaded() {
      return useStore().isToolsLoaded
    },
    paginationTools() {
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
    useStore().loadTools()
    useStore().loadDates()
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
    api
      .getCategories()
      .then(result => {
        this.categories = result
        this.currentCategories = result.map(c => c.id_category)
        return result
      })
      .catch(error => console.log(error))
  },

  methods: {
    async getDates() {
      this.dates = await useStore().dates
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
    changeSearch(event) {
      this.searchInput = event.target.value
    },
    changeCategory(category) {
      const index = this.currentCategories.indexOf(category)
      if (category === 'all' && this.currentCategories.length === 0) {
        this.currentCategories = this.categories.map(c => c.id_category)
      } else if (category === 'all' && this.currentCategories.length > 0) {
        this.currentCategories = []
      } else if (category !== 'all' && index === -1) {
        this.currentCategories.push(category)
      } else if (category !== 'all' && index !== -1) {
        this.currentCategories.splice(index, 1)
      }
    },
    sortName() {
      const { directionsForSorting } = this
      return function (a, b) {
        return directionsForSorting === 'DESC'
          ? a.name_tool.localeCompare(b.name_tool)
          : b.name_tool.localeCompare(a.name_tool)
      }
    },
    sortCategory() {
      const { directionsForSorting } = this
      return function (a, b) {
        return directionsForSorting === 'DESC'
          ? a.category.name_category.localeCompare(b.category.name_category)
          : b.category.name_category.localeCompare(a.category.name_category)
      }
    },
    sortCount() {
      const { directionsForSorting, selectedDate } = this
      const { id_date } = selectedDate
      return function (a, b) {
        if (!b.counts.HeadHunter[id_date]) {
          b.counts.HeadHunter[id_date] = 0
        }
        if (!a.counts.HeadHunter[id_date]) {
          a.counts.HeadHunter[id_date] = 0
        }
        return directionsForSorting === 'DESC'
          ? a.counts.HeadHunter[id_date] - b.counts.HeadHunter[id_date]
          : b.counts.HeadHunter[id_date] - a.counts.HeadHunter[id_date]
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
          .filter(t => +t !== tool.id_tool)
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
  margin-left: var(--unit);
  font-size: var(--text-large);
  color: var(--color-primary3);
}
</style>
