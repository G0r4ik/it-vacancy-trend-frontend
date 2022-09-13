<template>
  <div class="container">
    <h2 class="title">
      Rating <span>({{ lists[currentList].length }})</span>
    </h2>

    <rating-filters
      :categories="categories"
      :selectedCategories="selectedCategories"
      @changeCategory="changeCategory"
      @selectDate="selectDate"
      @changeSearch="changeSearch"
    ></rating-filters>

    <rating-select-list
      :list="currentList"
      @changeCurrentList="changeCurrentList"
    >
    </rating-select-list>

    <app-pagination
      :tools="lists[currentList]"
      @changePerPage="changePerPage"
      @changePageWhenClickNumber="changePageWhenClickNumber"
    >
    </app-pagination>

    <tools-table
      v-if="currentList"
      :tools="lists[currentList]"
      :favoritesTools="lists.favoritesTools"
      :studiedTools="lists.studiedTools"
      :selectedDate="selectedDate"
      :dates="dates"
      :paginatedTools="paginatedTools"
      @addToFavoriteTools="addToFavoriteTools"
      @addToStudiedTools="addToStudiedTools"
      @listSort="listSort"
    >
    </tools-table>
  </div>
</template>

<script>
import ToolsTable from './ToolsTable.vue'
import AppPagination from './AppPagination.vue'
import RatingFilters from './RatingFilters.vue'
import RatingSelectList from './RatingSelectList.vue'
// import ToolsList from './ToolsList.vue'
import flatpickr from 'flatpickr'
import { getCategories, getDates, getTools } from '../api'

export default {
  components: { ToolsTable, AppPagination, RatingFilters, RatingSelectList },
  data() {
    return {
      categories: [],
      dates: [],
      lists: { tools: [], favoritesTools: [], studiedTools: [] },
      copyTools: [],
      copyFavoritesTools: [],
      copyStudiedTools: [],
      selectedCategories: [],
      searchInput: '',
      selectedDate: {
        date_of_completion: null,
      },
      listSortVar: null,
      currentList: 'tools',
      directionsForSorting: 'DESC',
      paginatedTools: [],
      // currentJobBoard: 'Indeed',
    }
  },

  watch: {
    searchInput(v) {
      this.lists.tools = this.copyTools
      this.lists.favoritesTools = this.copyFavoritesTools
      this.lists.studiedTools = this.copyStudiedTools
      this.listSort(this.listSortVar, true)

      this.lists.tools = this.lists.tools.filter(
        this.changeFilter(v, this.selectedCategories)
      )
      this.lists.favoritesTools = this.copyFavoritesTools.filter(
        this.changeFilter(v, this.selectedCategories)
      )
      this.lists.studiedTools = this.copyStudiedTools.filter(
        this.changeFilter(v, this.selectedCategories)
      )
    },
  },

  mounted() {
    this.lists.favoritesTools =
      JSON.parse(localStorage.getItem('favoritesTools')) || []
    this.copyFavoritesTools = this.lists.favoritesTools
    this.lists.studiedTools =
      JSON.parse(localStorage.getItem('studiedTools')) || []
    this.copyStudiedTools = this.lists.studiedTools

    getDates().then(res => {
      this.dates = res
      this.selectedDate = this.dates.at(-1)
      const dates = []
      for (let i = 0; i < res.length; i++) {
        const date = res[i].date_of_completion
        const [day, month, year] = date.split('.')
        dates.push(new Date(year, month, day))
      }
      flatpickr('#select-date', {
        // altInput: true,
        // altFormat: 'F j, Y',
        // dateFormat: 'Y-m-d',
        minDate: dates[0],
        defaultDate: 1,
        maxDate: dates.at(-1),
        enable: dates,
        onChange: function (selectedDates, dateStr, instance) {},
        // inline: true
      })
    })
    getCategories().then(res => {
      this.categories = res
      this.selectedCategories = res.map(c => c.id_category)
    })

    getTools('Russia', 'HeadHunter').then(res => {
      this.copyTools = res
      this.lists.tools = res
      console.log(
        this.lists.tools.reduce((acc, current) => {
          return (acc += +current.counts.HeadHunter[this.selectedDate.id_date])
        }, 0) - this.lists.tools[0].counts.HeadHunter[this.selectedDate.id_date]
      )
    })
  },

  methods: {
    changeCurrentList(list) {
      this.currentList = list
    },
    changeSearch(e) {
      this.searchInput = e.target.value
    },
    selectDate(e) {
      this.selectedDate.date_of_completion = e
    },
    changePerPage(start, end) {
      this.paginatedTools = this.lists[this.currentList].slice(start, end)
    },
    changePageWhenClickNumber(currentPage, itemsPerPage) {
      this.paginatedTools = this.lists[this.currentList].slice(
        (currentPage - 1) * itemsPerPage,
        (currentPage - 1) * itemsPerPage + itemsPerPage
      )
    },
    changeCategory(category) {
      const index = this.selectedCategories.indexOf(category)
      if (category === 'all' && !this.selectedCategories.length) {
        this.selectedCategories = this.categories.map(c => c.id_category)
      } else if (category === 'all' && this.selectedCategories.length) {
        this.selectedCategories = []
      } else if (category !== 'all' && index === -1) {
        this.selectedCategories.push(category)
      } else if (category !== 'all' && index !== -1) {
        this.selectedCategories.splice(index, 1)
      }

      this.lists.tools = this.copyTools
      this.lists.favoritesTools = this.copyFavoritesTools
      this.listSort(this.listSortVar, true)
      this.lists.tools = this.lists.tools.filter(
        this.changeFilter(this.searchInput, this.selectedCategories)
      )
      this.lists.favoritesTools = this.lists.favoritesTools.filter(
        this.changeFilter(this.searchInput, this.selectedCategories)
      )
      this.lists.studiedTools = this.copyStudiedTools.filter(
        this.changeFilter(this.searchInput, this.selectedCategories)
      )
    },
    listSort(v = this.listSortVar, saveSort = false) {
      if (!saveSort) {
        this.directionsForSorting =
          this.directionsForSorting === 'DESC' ? 'ASC' : 'DESC'
      }
      this.listSortVar = v
      const directionsForSorting = this.directionsForSorting

      const sortName = () => {
        return function (a, b) {
          return directionsForSorting === 'DESC'
            ? a[v].localeCompare(b[v])
            : b[v].localeCompare(a[v])
        }
      }
      const sortCategory = () => {
        return function (a, b) {
          return directionsForSorting === 'DESC'
            ? a.category.name_category.localeCompare(b.category.name_category)
            : b.category.name_category.localeCompare(a.category.name_category)
        }
      }
      const id_date = this.selectedDate.id_date
      const sortCount = () => {
        return function (a, b) {
          return directionsForSorting === 'DESC'
            ? a.counts[v][id_date] - b.counts[v][id_date]
            : b.counts[v][id_date] - a.counts[v][id_date]
        }
      }

      if (v === 'name_tool') {
        this.lists.tools = this.lists.tools.sort(sortName())
        this.lists.favoritesTools = this.lists.favoritesTools.sort(sortName())
        this.lists.studiedTools = this.lists.studiedTools.sort(sortName())
      }

      if (v === 'id_category') {
        this.lists.tools = this.lists.tools.sort(sortCategory())
        this.lists.favoritesTools = this.lists.favoritesTools.sort(
          sortCategory()
        )
        this.lists.studiedTools = this.lists.studiedTools.sort(sortCategory())
      }

      // if (v === 'Indeed' || v === 'HeadHunter') {
      if (v === 'HeadHunter') {
        this.lists.tools = this.lists.tools.sort(sortCount())
        this.lists.favoritesTools = this.lists.favoritesTools.sort(sortCount())
        this.lists.studiedTools = this.lists.studiedTools.sort(sortCount())
      }
    },
    addToFavoriteTools(tool) {
      this.lists.favoritesTools = this.copyFavoritesTools
      const hasInFavoritesTools = this.lists.favoritesTools.find(
        t => t.id_tool === tool.id_tool
      )
      if (hasInFavoritesTools) {
        this.lists.favoritesTools = this.lists.favoritesTools.filter(
          _tool => _tool.id_tool !== tool.id_tool
        )
      } else {
        this.lists.favoritesTools.push(tool)
      }
      this.copyFavoritesTools = this.lists.favoritesTools
      localStorage.setItem(
        'favoritesTools',
        JSON.stringify(this.lists.favoritesTools)
      )
    },
    addToStudiedTools(tool) {
      this.lists.studiedTools = this.copyStudiedTools
      const hasInStudiedTools = this.lists.studiedTools.find(
        t => t.id_tool === tool.id_tool
      )
      if (hasInStudiedTools) {
        this.lists.studiedTools = this.lists.studiedTools.filter(
          _tool => _tool.id_tool !== tool.id_tool
        )
      } else {
        this.lists.studiedTools.push(tool)
      }
      this.copyStudiedTools = this.lists.studiedTools
      localStorage.setItem(
        'studiedTools',
        JSON.stringify(this.lists.studiedTools)
      )
    },
    changeFilter(input, categories) {
      return function (tool) {
        if (categories !== 'all') {
          return (
            categories.includes(tool.category.id_category) &&
            tool.name_tool.toLowerCase().includes(input.toLowerCase())
          )
        }
        return tool.name_tool.toLowerCase().includes(input.toLowerCase())
      }
    },
  },
}
</script>
