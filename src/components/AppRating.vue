<template>
  <div>
    <h2 class="title">RATING ({{ lists[currentList].length }})</h2>
    <div class="filters">
      <div class="container">
        <div class="filters__inner">
          <div class="filters__selects">
            <div class="filters__select-container select-container">
              <label for="date_of_completion" class="select-container__label">
                Дата:
              </label>
              <select
                name="date_of_completion"
                id="date_of_completion"
                v-model="selectedDate"
                class="select-container__input">
                <option v-for="date of dates" :value="date" :key="date.id_date">
                  {{ date.date_of_completion }}
                </option>
              </select>
            </div>
            <div class="filters__select-container select-container">
              <label for="category" class="select-container__label">
                Категория:
              </label>
              <select
                name="category"
                id="category"
                v-model="selectedCategory"
                class="select-container__input">
                <option value="all">Все</option>
                <option
                  v-for="category of categories"
                  :key="category.id_category"
                  :class="'category' + category.id_category"
                  :value="category">
                  {{ category.name_category }}
                </option>
              </select>
            </div>
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
// import AppList from './AppList.vue'
import { getCategories, getDates, getTools, getIndeed } from '../scripts/axios'

export default {
  components: { ToolsTable },

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
      selectedDate: null,
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
    selectedCategory(v) {
      this.lists.tools = this.copyTools
      this.lists.favoritesTools = this.copyFavoritesTools
      this.listSort(this.listSortVar, true)

      if (v === 'all') {
        this.lists.tools = this.lists.tools.filter(
          this.changeFilter(this.searchInput)
        )
        this.lists.favoritesTools = this.lists.favoritesTools.filter(
          this.changeFilter(this.searchInput)
        )
      } else {
        this.lists.tools = this.lists.tools.filter(
          this.changeFilter(this.searchInput, v)
        )
        this.lists.favoritesTools = this.lists.favoritesTools.filter(
          this.changeFilter(this.searchInput, v)
        )
      }
    },
    searchInput(v) {
      this.lists.tools = this.copyTools
      this.lists.favoritesTools = this.copyFavoritesTools
      this.lists.studiedTools = this.copyStudiedTools
      this.listSort(this.listSortVar, true)

      if (this.selectedCategory === 'all') {
        this.lists.tools = this.lists.tools.filter(
          this.changeFilter(this.searchInput)
        )
        this.lists.favoritesTools = this.copyFavoritesTools.filter(
          this.changeFilter(this.searchInput)
        )
        this.lists.studiedTools = this.copyStudiedTools.filter(
          this.changeFilter(this.searchInput)
        )
      } else {
        this.lists.tools = this.lists.tools.filter(
          this.changeFilter(this.searchInput, this.selectedCategory)
        )
        this.lists.favoritesTools = this.lists.favoritesTools.filter(
          this.changeFilter(this.searchInput, this.selectedCategory)
        )
        this.lists.studiedTools = this.copyStudiedTools.filter(
          this.changeFilter(this.searchInput, this.selectedCategory)
        )
      }
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
        console.log(this.lists.tools[0])
        // this.paginatedTools = this.tools.slice(0, this.itemsPerPage)

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
    changeFilter(input, category) {
      return function (tool) {
        if (category) {
          return (
            tool.category.id_category === category.id_category &&
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
