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
    <span class="list-count" v-else> ({{ filteredList.length }})</span>
    <VueSkeleton
      v-if="!categories.length"
      width="100%"
      height="250px"
      mb="var(--margin-small)"
      br="var(--radius)"
    />
    <RatingFilters
      v-if="selectedDate.date_of_completion"
      :categories="categories"
      :currentCategories="currentCategories"
      :dates="dates"
      :selectedDate="selectedDate"
      @changeCategory="changeCategory"
      @changeSearch="changeSearch"
      @changeSelectDate="changeSelectDate"
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

    <RatingPagination
      :tools="tools"
      :paginationTools="filteredList"
      @changePerPage="changePerPage"
      @changePageWhenClickNumber="changePageWhenClickNumber"
    />

    <ToolsTable
      v-if="currentList"
      :selectedDate="selectedDate"
      :paginatedTools="paginatedTools"
      :tools="paginatedTools"
      :dates="dates"
      :isDataLoaded="isDataLoaded"
      @addToFavoriteTools="addToFavoriteTools"
      @addToStudiedTools="addToStudiedTools"
      @listSort="listSort"
    />
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
      categories: [],
      dates: [],
      tools: [],
      paginatedTools: [],
      isDataLoaded: false,
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

    api.getDates().then(res => {
      this.dates = res
      this.selectedDate = this.dates.at(-1)
    })
    api.getCategories().then(res => {
      this.categories = res
      this.currentCategories = res.map(c => c.id_category)
    })

    api.getTools('Russia', 'HeadHunter').then(res => {
      this.tools = res
      let favoritesTools = localStorage.getItem('favoritesTools')
      let studiedTools = localStorage.getItem('studiedTools')

      favoritesTools = favoritesTools !== null ? favoritesTools.split(' ') : 'e'
      studiedTools = studiedTools !== null ? studiedTools.split(' ') : 'e'
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
      this.isDataLoaded = true
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
