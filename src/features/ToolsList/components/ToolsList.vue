<template>
  <div class="container">
    <h1 class="list-title">
      <span>IT Technology in vacancies</span>
      <AppSkeleton
        v-if="tools.length === 0"
        width="var(--width-count-tools)"
        height="var(--height-count-tools)"
        display="inline-block"
        ml="var(--unit)" />
      <span v-else class="list-count">({{ filteredList.length }})</span>
    </h1>

    <AppSkeleton
      v-if="
        categories.length === 0 ||
        !currentCategories ||
        dates.length < 0 ||
        !selectedDate.idDate
      "
      width="100%"
      height="var(--height-filters)"
      mb="calc(var(--unit) * 2)"
      br="var(--radius)" />

    <RatingFilters
      v-if="dates.length > 0 && selectedDate.idDate && currentCategories"
      :categories="categories"
      :current-categories="currentCategories"
      :dates="dates"
      :search-input="searchInput"
      @change-category="changeCategory"
      @change-search="changeSearch"
      @change-selected-date="changeSelectedDate" />
    <AppSkeleton
      v-if="tools.length === 0"
      :count="2"
      width="25%"
      height="24px"
      display="inline-block"
      mb="var(--unit)"
      mr="var(--unit)" />
    <JobBoardsRegions v-if="tools.length > 0" />

    <RatingSelectList
      :list="currentList"
      @change-current-list="changeCurrentList" />
    <AppSkeleton
      v-if="tools.length === 0"
      width="var(--width-pagination-5)"
      height="var(--height-pagination)"
      mb="var(--unit)" />
    <div ref="invisibleStartTable"></div>
    <AppPagination
      :uniq-id="1"
      :items-length="filteredList.length"
      :model-value="pagination"
      @update:model-value="changePagination" />

    <ToolsTable
      :filtered-list="filteredList"
      :page="pagination.page"
      :items-per-page="pagination.itemsPerPage"
      :pagination-tools="paginationTools"
      :tools="paginationTools"
      :dates="dates"
      :is-data-loaded="isDataLoaded"
      :categories="categories"
      @add-to-favorite-tools="addToFavoriteTools"
      @list-sort="listSort"
      @clear-filters="clearFilters" />

    <AppPagination
      :uniq-id="2"
      :items-length="filteredList.length"
      :model-value="pagination"
      @update:model-value="changePagination" />
  </div>
</template>

<script>
import RatingFilters from './RatingFilters.vue'
import RatingSelectList from './RatingSelectList.vue'
import JobBoardsRegions from './JobBoardsRegions.vue'
import ToolsTable from './ToolsTable.vue'
import api from '../api.js'
import { useStore } from '../store.js'

export default {
  components: { ToolsTable, RatingFilters, RatingSelectList, JobBoardsRegions },

  data() {
    return {
      pagination: { page: 1, itemsPerPage: 50 },
      categories: [],
      currentCategories: [],
      searchInput: '',
      sortList: '',
      currentList: 'tools',
      directionsForSorting: 'ASC',
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
    selectedDate() {
      return useStore().selectedDate
    },
    filteredList() {
      let list = this.tools.filter(t => {
        const inputCheck = t.nameTool
          .toLowerCase()
          .includes(this.searchInput.toLowerCase())

        const categoryCheck = this.currentCategories.some(category =>
          t.categories?.find(cat => cat.idCategory === category)
        )
        return t.categories ? inputCheck && categoryCheck : inputCheck
      })

      if (this.sortList === 'nameTool') list.sort(this.sortName())
      if (this.sortList === 'idCategory') {
        list.sort(this.sortCategory())
      }
      if (Number.isFinite(this.sortList))
        list.sort(this.sortCount(this.sortList))
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
      useStore().selectedDate = newValue.at(-1)
    },
  },
  // WHY TOP
  async mounted() {
    api
      .getCategories()
      .then(result => {
        this.categories = result
        this.currentCategories = result.map(c => c.idCategory)
        return result
      })
      .catch(error => console.log(error))

    await useStore().loadJobBoardsRegions()
    await useStore().loadDates()
    await useStore().loadTools(this.selectedDate.idDate)
    await useStore().loadOneCounts()
  },

  methods: {
    changePagination(page) {
      this.$refs.invisibleStartTable.scrollIntoView({ behavior: 'smooth' })
      this.pagination = page
    },
    clearFilters() {
      this.searchInput = ''
      this.currentCategories = this.categories.map(item => item.idCategory)
      this.currentList = 'tools'
    },
    async getDates() {
      this.dates = await useStore().dates
    },
    async getLast() {
      useStore().selectedDate = await this.dates
    },
    async changeSelectedDate(selectDate) {
      useStore().selectedDate = selectDate
      await useStore().loadOneCounts(selectDate.idDate)
    },
    changeCurrentList(list) {
      this.currentList = list
    },
    changeSearch(event) {
      this.searchInput = event.target.value.trim()
    },
    changeCategory(category) {
      const index = this.currentCategories.indexOf(category)
      if (category === 'all' && this.currentCategories.length === 0) {
        this.currentCategories = this.categories.map(c => c.idCategory)
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
      return function sortName(a, b) {
        return directionsForSorting === 'DESC'
          ? a.nameTool.localeCompare(b.nameTool)
          : b.nameTool.localeCompare(a.nameTool)
      }
    },
    sortCategory() {
      const { directionsForSorting } = this
      return function sortCategory(a, b) {
        return directionsForSorting === 'DESC'
          ? a.category.nameCategory.localeCompare(b.category.nameCategory)
          : b.category.nameCategory.localeCompare(a.category.nameCategory)
      }
    },
    sortCount(jbr) {
      const { directionsForSorting, selectedDate } = this
      const { idDate } = selectedDate
      return function sortCount(a, b) {
        // if (!b.counts[jbr][idDate]) {
        //   b.counts[jbr][idDate] = 0
        // }
        // if (!a.counts[jbr][idDate]) {
        //   a.counts[jbr][idDate] = 0
        // }
        return directionsForSorting === 'DESC'
          ? a.counts[jbr][idDate] - b.counts[jbr][idDate]
          : b.counts[jbr][idDate] - a.counts[jbr][idDate]
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
          .filter(t => +t !== tool.idTool)
          .join(' ')
        localStorage.setItem('favoritesTools', f)
      } else {
        const favoritesTools = localStorage.getItem('favoritesTools')
        if (favoritesTools === null) {
          localStorage.setItem('favoritesTools', `${tool.idTool}`)
        } else {
          localStorage.setItem(
            'favoritesTools',
            `${favoritesTools} ${tool.idTool}`
          )
        }
      }

      const currentTool = this.tools.find(item => item.idTool === tool.idTool)
      currentTool.isFav = !currentTool.isFav
    },
    // addToStudiedTools(tool) {
    //   if (tool.isStudied) {
    //     const f = localStorage
    //       .getItem('studiedTools')
    //       .split(' ')
    //       .filter(t => +t !== tool.idTool)
    //       .join(' ')
    //     localStorage.setItem('studiedTools', f)
    //   } else {
    //     const studiedTools = localStorage.getItem('studiedTools')
    //     if (studiedTools === null) {
    //       localStorage.setItem('studiedTools', `${tool.idTool}`)
    //     } else {
    //       localStorage.setItem('studiedTools', `${studiedTools} ${tool.idTool}`)
    //     }
    //   }
    //   tool.isStudied = !tool.isStudied
    // },
  },
}
</script>

<style>
.list-title {
  display: inline-block;
  max-width: var(--max-width-title);
}
.list-count {
  margin-left: var(--unit);
  font-size: var(--text-large);
  color: var(--color-primary);
}
</style>
