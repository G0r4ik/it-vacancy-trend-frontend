<template>
  <div>
    <h2 class="title">RATING:</h2>
    <div class="filters">
      <div class="container">
        <div class="filters__inner">
          <div class="filters__selects">
            <div class="select-container">
              <label for="date_of_completion">Дата:</label>
              <select
                name="date_of_completion"
                id="date_of_completion"
                v-model="selectedDate"
              >
                <option v-for="date of dates" :value="date" :key="date.id_date">
                  {{ date.date_of_completion }}
                </option>
              </select>
            </div>
            <div class="select-container">
              <label for="category">Категория:</label>
              <select name="category" id="category" v-model="selectedCategory">
                <option value="all">Все</option>
                <option
                  v-for="category of categories"
                  :key="category.id_category"
                  :class="'category' + category.id_category"
                  :value="category"
                >
                  {{ category.name_category }}
                </option>
              </select>
            </div>
          </div>
          <input
            type="search"
            class="filters__search-input"
            placeholder="Введите технологию"
            v-model="searchInput"
          />
        </div>
      </div>
    </div>

    <div class="additional-filters">
      <div class="container">
        <div class="additional-filters__inner">
          <button
            class="additional-filters__button"
            @click="currentList = 'tools'"
          >
            Все
          </button>
          <button
            class="additional-filters__button"
            @click="currentList = 'favoritesTools'"
          >
            Избранное
          </button>
          <button
            class="additional-filters__button"
            @click="selectList('ready')"
          >
            Изученное
          </button>
          <button class="additional-filters__button">Настроить</button>
        </div>
      </div>
    </div>

    <div class="list">
      <div class="container">
        <div class="list__inner">
          <div class="list__column">
            <span class="list__column-item" @click="listSort('name_tools')">
              Название
            </span>
            <span class="list__column-item" @click="listSort('id_category')"
              >Категория
            </span>
            <span
              class="list__column-item list__column-item_count"
              @click="listSort('countIndeed')"
            >
              Indeed
            </span>
            <span
              class="list__column-item list__column-item_count"
              @click="listSort('countHeadHunter')"
            >
              HHru
            </span>
          </div>
        </div>
        <app-list
          v-if="currentList"
          :tools="lists[currentList]"
          :favoritesTools="lists.favoritesTools"
          :selectedDate="selectedDate"
          :selectedCategory="selectedCategory"
          :searchInput="searchInput"
          @clickIconFavoriteTools="clickIconFavoriteTools"
        ></app-list>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AppList from './AppListAll.vue';

export default {
  data() {
    return {
      categories: [],
      dates: [],
      lists: { tools: [], favoritesTools: [], studiedTools: [] },
      copyTools: [],
      copyFavoritesTools: [],
      selectedCategory: 'all',
      searchInput: '',
      selectedDate: null,
      listSortVar: null,
      currentList: 'tools',
      directionsForSorting: 'DESC',
    };
  },
  methods: {
    async getCategories() {
      let categories = await axios({
        method: 'get',
        url: 'http://127.0.0.1:5501/getCategories',
      });
      this.categories = categories.data;
    },
    async getDates() {
      let dates = await axios({
        method: 'get',
        url: 'http://127.0.0.1:5501/getDate',
      });
      this.dates = dates.data;
      this.selectedDate = this.dates.at(-1);
    },
    async getTools() {
      let tools = await axios({
        method: 'get',
        url: 'http://127.0.0.1:5501/getTools',
      });
      this.copyTools = tools.data;
      this.lists.tools = tools.data;
    },
    listSort(v = this.listSortVar, saveSort = false) {
      if (!saveSort) {
        this.directionsForSorting =
          this.directionsForSorting === 'DESC' ? 'ASC' : 'DESC';
      }
      this.listSortVar = v;
      const directionsForSorting = this.directionsForSorting;

      const sortName = () => {
        return function (a, b) {
          return directionsForSorting === 'DESC'
            ? a[v].localeCompare(b[v])
            : b[v].localeCompare(a[v]);
        };
      };
      const sortCategory = () => {
        return function (a, b) {
          return directionsForSorting === 'DESC'
            ? a.category.name_category.localeCompare(b.category.name_category)
            : b.category.name_category.localeCompare(a.category.name_category);
        };
      };
      const id_date = this.selectedDate.id_date;
      const sortCount = () => {
        return function (a, b) {
          return directionsForSorting === 'DESC'
            ? a.counts[id_date][v] - b.counts[id_date][v]
            : b.counts[id_date][v] - a.counts[id_date][v];
        };
      };

      if (v === 'name_tools') {
        this.lists.tools = this.lists.tools.sort(sortName());
        this.lists.favoritesTools = this.lists.favoritesTools.sort(sortName());
      }

      if (v === 'id_category') {
        this.lists.tools = this.lists.tools.sort(sortCategory());
        this.lists.favoritesTools = this.lists.favoritesTools.sort(
          sortCategory()
        );
      }

      if (v === 'countIndeed' || v === 'countHeadHunter') {
        this.lists.tools = this.lists.tools.sort(sortCount());
        this.lists.favoritesTools = this.lists.favoritesTools.sort(sortCount());
      }
    },
    clickIconFavoriteTools(tool) {
      this.lists.favoritesTools = this.copyFavoritesTools;
      const hasInFavoritesTools = this.lists.favoritesTools.find(
        (t) => t.id_tool === tool.id_tool
      );
      if (hasInFavoritesTools) {
        this.lists.favoritesTools = this.lists.favoritesTools.filter(
          (_tool) => _tool.id_tool !== tool.id_tool
        );
      } else {
        this.lists.favoritesTools.push(tool);
      }
      this.copyFavoritesTools = this.lists.favoritesTools;
      localStorage.setItem(
        'favoritesTools',
        JSON.stringify(this.lists.favoritesTools)
      );
    },
    changeFilter(input, category) {
      return function (tool) {
        if (category) {
          return (
            tool.category.id_category === category.id_category &&
            tool.name_tools.toLowerCase().includes(input.toLowerCase())
          );
        }
        return tool.name_tools.toLowerCase().includes(input.toLowerCase());
      };
    },
  },

  mounted() {
    this.lists.favoritesTools =
      JSON.parse(localStorage.getItem('favoritesTools')) || [];
    this.copyFavoritesTools = this.lists.favoritesTools;
    this.lists.studiedTools =
      JSON.parse(localStorage.getItem('studiedTools')) || [];
    this.getCategories();
    this.getTools();
    this.getDates();
  },

  watch: {
    selectedCategory(v) {
      this.lists.tools = this.copyTools;
      this.lists.favoritesTools = this.copyFavoritesTools;
      this.listSort(this.listSortVar, true);

      if (v === 'all') {
        this.lists.tools = this.lists.tools.filter(
          this.changeFilter(this.searchInput)
        );
        this.lists.favoritesTools = this.lists.favoritesTools.filter(
          this.changeFilter(this.searchInput)
        );
      } else {
        this.lists.tools = this.lists.tools.filter(
          this.changeFilter(this.searchInput, v)
        );
        this.lists.favoritesTools = this.lists.favoritesTools.filter(
          this.changeFilter(this.searchInput, v)
        );
      }
    },
    searchInput(v) {
      this.lists.tools = this.copyTools;
      this.lists.favoritesTools = this.copyFavoritesTools;
      this.listSort(this.listSortVar, true);

      if (this.selectedCategory === 'all') {
        this.lists.tools = this.lists.tools.filter(
          this.changeFilter(this.searchInput)
        );
        this.lists.favoritesTools = this.lists.favoritesTools.filter(
          this.changeFilter(this.searchInput)
        );
      } else {
        this.lists.tools = this.lists.tools.filter(
          this.changeFilter(this.searchInput, this.selectedCategory)
        );
        this.lists.favoritesTools = this.lists.favoritesTools.filter(
          this.changeFilter(this.searchInput, this.selectedCategory)
        );
      }
    },
  },

  components: { AppList },
};
</script>
