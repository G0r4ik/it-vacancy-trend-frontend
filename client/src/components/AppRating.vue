<template>
  <div class="container">
    <h2 class="title">
      List <span>({{ filteredList.length }})</span>
    </h2>

    <rating-filters
      v-if="selectedDate.date_of_completion"
      :categories="categories"
      :currentCategories="currentCategories"
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
      currentCategories: [],
      searchInput: '',
      sortList: '',
      selectedDate: {
        id_date: null,
        date_of_completion: null,
      },
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
      if (this.sortList === 'id_category') list.sort(this.sortCategory())
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
  mounted() {
    getDates().then(res => {
      this.dates = res
      this.selectedDate = this.dates.at(-1)
    })
    getCategories().then(res => {
      this.categories = res
      this.currentCategories = res.map(c => c.id_category)
    })

    getTools('Russia', 'HeadHunter').then(res => {
      this.tools = res
      let favoritesTools = localStorage.getItem('favoritesTools')
      let studiedTools = localStorage.getItem('studiedTools')

      favoritesTools = favoritesTools !== null ? favoritesTools.split(' ') : 'e'
      studiedTools = studiedTools !== null ? studiedTools.split(' ') : 'e'
      console.log(favoritesTools)
      for (let i = 0; i < this.tools.length; i++) {
        this.tools[i].isFav = false
        this.tools[i].isStudied = false
        if (favoritesTools.includes(String(this.tools[i].id_tool))) {
          this.tools[i].isFav = true
        }
        if (studiedTools.includes(String(this.tools[i].id_tool))) {
          this.tools[i].isStudied = true
        }
      }
    })
  },

  methods: {
    changeSelectDate(selectDate) {
      this.selectedDate = selectDate
      console.log('bebr')
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
        console.log(this.directionsForSorting)
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
            console.log(+t, tool.id_tool)
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
