<template>
  <div>
    <h2 class="title">Rating ({{ lists[currentList].length }})</h2>
    <div class="filters">
      <div class="container">
        <div class="filters__inner">
          <div class="filters__selects">
            <div class="filters__select-container select-container">
              <label for="date_of_completion" class="select-container__label">
                Дата:
              </label>
              <input
                id="date"
                class="select-date"
                v-model="selectedDate.date_of_completion" />
            </div>
            <app-categories
              :categories="categories"
              :selectedCategory="selectedCategory"
              @selectedCategory="changeCategory"></app-categories>
          </div>
          <input
            type="search"
            class="filters__search-input"
            placeholder="Введите технологию"
            v-model="searchInput" />
        </div>
      </div>
    </div>

    <div class="additional-filters">
      <div class="container">
        <div class="additional-filters__inner">
          <button
            class="additional-filters__button"
            @click="currentList = 'tools'">
            Все
          </button>
          <button
            class="additional-filters__button"
            @click="currentList = 'favoritesTools'">
            Избранное
          </button>
          <button
            class="additional-filters__button"
            @click="currentList = 'studiedTools'">
            Изученное
          </button>
          <button class="additional-filters__button">Настроить</button>
        </div>
      </div>
    </div>

    <div class="rating-main">
      <div class="container">
        <tools-table
          v-if="currentList"
          :tools="lists[currentList]"
          :favoritesTools="lists.favoritesTools"
          :studiedTools="lists.studiedTools"
          :selectedDate="selectedDate"
          :selectedCategory="selectedCategory"
          :searchInput="searchInput"
          :dates="dates"
          @clickIconFavoriteTools="clickIconFavoriteTools"
          @clickIconStudiedTools="clickIconStudiedTools"
          @listSort="listSort">
        </tools-table>
      </div>
    </div>
    <div class="empty-list" v-if="listEmpty">Ничего нет</div>
  </div>
</template>

<script>
import ToolsTable from './ToolsTable.vue'
import AppCategories from './AppCategories.vue'
import flatpickr from 'flatpickr'
require('flatpickr/dist/flatpickr.css')
// import AppList from './AppList.vue'
import { getCategories, getDates, getTools, getIndeed } from '../scripts/axios'

export default {
  components: { ToolsTable, AppCategories },

  data() {
    return {
      categories: [],
      dates: [],
      lists: { tools: [], favoritesTools: [], studiedTools: [] },
      copyTools: [],
      copyFavoritesTools: [],
      copyStudiedTools: [],
      selectedCategory: 'all',
      searchInput: '',
      selectedDate: {
        date_of_completion: null,
      },
      listSortVar: null,
      currentList: 'tools',
      directionsForSorting: 'DESC',
      currentJobBoard: 'Indeed',
    }
  },

  computed: {
    listEmpty() {
      return !this.lists[this.currentList].length
    },
  },

  watch: {
    // selectedCategory(v) {
    //   this.lists.tools = this.copyTools
    //   this.lists.favoritesTools = this.copyFavoritesTools
    //   this.listSort(this.listSortVar, true)

    //   this.lists.tools = this.lists.tools.filter(
    //     this.changeFilter(this.searchInput)
    //   )
    //   this.lists.favoritesTools = this.lists.favoritesTools.filter(
    //     this.changeFilter(this.searchInput)
    //   )
    // },
    searchInput(v) {
      this.lists.tools = this.copyTools
      this.lists.favoritesTools = this.copyFavoritesTools
      this.lists.studiedTools = this.copyStudiedTools
      this.listSort(this.listSortVar, true)

      this.lists.tools = this.lists.tools.filter(
        this.changeFilter(this.searchInput, this.selectedCategory)
      )
      this.lists.favoritesTools = this.copyFavoritesTools.filter(
        this.changeFilter(this.searchInput, this.selectedCategory)
      )
      this.lists.studiedTools = this.copyStudiedTools.filter(
        this.changeFilter(this.searchInput, this.selectedCategory)
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
        const [date, time] = res[i].date_of_completion.split(' ')
        const [hour, minute] = time.split(':')
        const [day, month, year] = date.split('.')
        dates.push(new Date(year, month, day, hour, minute))
      }
      flatpickr('#date', {
        // altInput: true,
        // altFormat: 'F j, Y',
        // dateFormat: 'Y-m-d',
        minDate: dates[0],
        defaultDate: 1,
        maxDate: dates.at(-1),
        enable: dates,
        onChange: function (selectedDates, dateStr, instance) {
          console.log(1)
        },
        // inline: true
      })
    })
    getCategories().then(res => (this.categories = res))

    getTools().then(res => {
      this.copyTools = res
      this.lists.tools = res

      // getIndeed().then(res => {
      //   for (const j of res) {
      //     const [date, count] = j.count
      //     const findTool = this.lists.tools.find(t => t.id_tool === j.id_tool)
      //     if (!findTool.counts.Indeed) findTool.counts.Indeed = {}
      //     findTool.counts.Indeed[date] = count
      //   }
      // })
    })
  },

  methods: {
    changeCategory(e) {
      if (
        e === 'all' ||
        (this.selectedCategory.includes(e) &&
          this.selectedCategory.length === 1)
      ) {
        this.selectedCategory = 'all'
      } else {
        if (
          typeof this.selectedCategory === 'object' &&
          this.selectedCategory.length
        ) {
          if (this.selectedCategory.includes(e)) {
            this.selectedCategory.splice(this.selectedCategory.indexOf(e), 1)
          } else {
            this.selectedCategory.push(e)
          }
        } else {
          this.selectedCategory = [e]
        }
      }
      this.lists.tools = this.copyTools
      this.lists.favoritesTools = this.copyFavoritesTools
      this.listSort(this.listSortVar, true)
      this.lists.tools = this.lists.tools.filter(
        this.changeFilter(this.searchInput, this.selectedCategory)
      )
      this.lists.favoritesTools = this.lists.favoritesTools.filter(
        this.changeFilter(this.searchInput, this.selectedCategory)
      )
      this.lists.studiedTools = this.copyStudiedTools.filter(
        this.changeFilter(this.searchInput, this.selectedCategory)
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

      if (v === 'Indeed' || v === 'HeadHunter') {
        this.lists.tools = this.lists.tools.sort(sortCount())
        this.lists.favoritesTools = this.lists.favoritesTools.sort(sortCount())
        this.lists.studiedTools = this.lists.studiedTools.sort(sortCount())
      }
    },
    clickIconFavoriteTools(tool) {
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
    clickIconStudiedTools(tool) {
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
<style scoped>
.filters {
}

.filters__inner {
  padding: 15px;
  border: 5px solid var(--color-border);
  border-radius: 15px;
  margin-bottom: var(--margin-middle);
}
.filters__selects {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: var(--margin-small);
}

.select-container {
}
.filters__select-container {
}
.select-container__label {
}

.select-date {
  width: 150px;
  text-align: center;
  border: 2px solid #e2e2e2;
  background-color: transparent;
  line-height: 1.5;
  border-radius: 5px;
  color: var(--color-text);
  font-size: 20px;
  transition: all 0.25s;
}

.filters__search-input {
  width: 100%;
  border: 2px solid #e2e2e2;
  background-color: transparent;
  line-height: 2;
  padding: 0 20px;
  border-radius: 5px;
  font-weight: 200;
  color: var(--color-text);
  font-size: 20px;
  transition: all 0.25s;
}
.additional-filters {
}
.additional-filters__inner {
  margin-bottom: var(--margin-large);
}
.additional-filters__button {
  background: none;
  border: 5px solid var(--color-border);
  border-radius: 8px;
  cursor: pointer;
  color: inherit;
  outline: 0px;
  font-weight: 600;
  font-size: 12px;
  padding: 6px 16px;
  padding: 5px 8px;
  margin-right: var(--margin-small);
}

.rating-main {
}
.empty-list {
  width: 100%;
  font-size: 56px;
  text-align: center;
  color: #242424;
  margin-top: 120px;
}

@media (max-width: 1000px) {
  .filters__select-container {
    margin-bottom: var(--margin-small);
  }

  .select-container__input {
    font-size: 16px;
  }
}
</style>
