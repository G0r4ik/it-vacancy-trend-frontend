<template>
  <div class="container">
    <h2 class="title">
      List <span>({{ filteredList.length }})</span>
    </h2>

    <rating-filters
      v-if="selectedDate.date_of_completion"
      :categories="categories"
      :selectedCategories="selectedCategories"
      :dates="dates"
      :selectedDate="selectedDate"
      @changeCategory="changeCategory"
      @changeSearch="changeSearch"
      @changeSelectDate="changeSelectDate"
    ></rating-filters>

    <rating-select-list
      :list="currentList"
      @changeCurrentList="changeCurrentList"
    >
    </rating-select-list>

    <app-pagination
      :tools="tools"
      :paginationTools="filteredList"
      @changePerPage="changePerPage"
      @changePageWhenClickNumber="changePageWhenClickNumber"
    >
    </app-pagination>

    <tools-table
      v-if="currentList"
      :selectedDate="selectedDate"
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
import { getCategories, getDates, getTools } from '../api'

export default {
  components: { ToolsTable, AppPagination, RatingFilters, RatingSelectList },
  data() {
    return {
      categories: [],
      dates: [],
      tools: [],
      paginatedTools: [],
      selectedCategories: [],
      searchInput: '',
      selectedDate: {
        id_date: null,
        date_of_completion: null,
      },
      listSortVar: null,
      currentList: 'tools',
      directionsForSorting: 'DESC',
      pagination: {
        start: null,
        end: null,
      },
      // currentJobBoard: 'Indeed',
    }
  },
  computed: {
    filteredList() {
      const list = this.tools.filter(t => {
        return (
          t.name_tool.toLowerCase().includes(this.searchInput.toLowerCase()) &&
          this.selectedCategories.includes(t.category.id_category)
        )
      })
      if (this.currentList === 'favoritesTools') {
        return list.filter(t => t.isFav)
      }
      if (this.currentList === 'studiedTools') {
        return list.filter(t => t.isStudiedTools)
      }
      return list
    },
  },
  mounted() {
    getDates().then(res => {
      this.dates = res
      this.selectedDate = this.dates.at(-1)
    })
    getCategories().then(res => {
      this.categories = res
      this.selectedCategories = res.map(c => c.id_category)
    })

    getTools('Russia', 'HeadHunter').then(res => {
      this.tools = res

      let favoritesTools =
        JSON.parse(localStorage.getItem('favoritesTools')) || []
      let studiedTools = JSON.parse(localStorage.getItem('studiedTools')) || []
      for (let i = 0; i < this.tools.length; i++) {
        this.tools[i].isFav = false
        this.tools[i].isStudiedTools = false

        for (let j = 0; j < favoritesTools.length; j++) {
          if (this.tools[i].id_tool === favoritesTools[j].id_tool) {
            this.tools[i].isFav = true
          }
        }
        for (let j = 0; j < studiedTools.length; j++) {
          if (this.tools[i].id_tool === studiedTools[j].id_tool) {
            this.tools[i].isStudiedTools = true
          }
        }
      }
    })
  },

  methods: {
    changeSelectDate(selectDate) {
      this.selectedDate = selectDate
    },
    changeCurrentList(list) {
      this.currentList = list
    },
    changeSearch(e) {
      this.searchInput = e.target.value
    },
    changePerPage(start, end) {
      this.paginatedTools = this.filteredList.slice(start, end)
    },
    changePageWhenClickNumber(currentPage, itemsPerPage) {
      this.paginatedTools = this.filteredList.slice(
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
    },
    // !!!
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

      // if (v === 'name_tool') {
      //   this.lists.tools = this.lists.tools.sort(sortName())
      //   this.lists.favoritesTools = this.lists.favoritesTools.sort(sortName())
      //   this.lists.studiedTools = this.lists.studiedTools.sort(sortName())
      // }

      // if (v === 'id_category') {
      //   this.lists.tools = this.lists.tools.sort(sortCategory())
      //   this.lists.favoritesTools = this.lists.favoritesTools.sort(
      //     sortCategory()
      //   )
      //   this.lists.studiedTools = this.lists.studiedTools.sort(sortCategory())
      // }

      // // if (v === 'Indeed' || v === 'HeadHunter') {
      // if (v === 'HeadHunter') {
      //   this.lists.tools = this.lists.tools.sort(sortCount())
      //   this.lists.favoritesTools = this.lists.favoritesTools.sort(sortCount())
      //   this.lists.studiedTools = this.lists.studiedTools.sort(sortCount())
      // }
    },
    addToFavoriteTools(tool) {
      tool.isFav = !tool.isFav
      localStorage.setItem('favoritesTools', JSON.stringify('!!!'))
    },
    addToStudiedTools(tool) {
      tool.isStudiedTools = !tool.isStudiedTools
      localStorage.setItem('studiedTools', JSON.stringify('!!!'))
    },
  },
}
</script>
