<template>
  <div>
    <h2 class="title">RATING:</h2>
    <div class="filters">
      <div class="container">
        <div class="filters__inner">
          <div class="filters__selects">
            <div class="filters__select-wrapper select-wrapper">
              <div class="select-container">
                <label for="date_of_completion">Дата:</label>
                <select
                  name="date_of_completion"
                  id="date_of_completion"
                  v-model="selectedDate"
                >
                  <option
                    v-for="date of dates"
                    :value="date"
                    :key="date.id_date"
                  >
                    {{ date.date_of_completion }}
                  </option>
                </select>
              </div>
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
              @click="listSort('countHH')"
            >
              HHru
            </span>
          </div>
          <ul>
            <li
              v-for="tool of copyTools"
              :key="tool.id_tools"
              class="list__item list-rows"
              :class="'category' + tool.category.id_category"
            >
              <span class="list-rows__item" @click="isOpenModalFunction(tool)">
                {{ tool.name_tools }}</span
              >
              <span class="list-rows__item list-rows__item_category">
                {{ tool.category.name_category }}
              </span>
              <span class="list-rows__item list-rows__item_count">
                {{ tool.counts[selectedDate.id_date].countIndeed }}
              </span>
              <span class="list-rows__item list-rows__item_count">
                {{ tool.counts[selectedDate.id_date].countHH }}
              </span>
            </li>
          </ul>
        </div>
        <div class="empty-list" v-if="!copyTools.length">Ничего нет</div>
      </div>
    </div>
    <teleport to="body">
      <app-tool
        :tools="copyTools"
        :currentTool="toolInModal"
        :dates="dates"
        v-if="isOpenModal"
      ></app-tool>
    </teleport>
  </div>
</template>

<script>
import axios from 'axios';
import appTool from './AppTool.vue';

export default {
  data() {
    return {
      categories: [],
      dates: [],
      tools: [],
      copyTools: [],
      selectedCategory: 'all',
      selectedDate: 1,
      directionsForSorting: 'DESC',
      searchInput: '',
      isOpenModal: false,
      toolInModal: null,
      listSortVar: null,
    };
  },
  methods: {
    isOpenModalFunction(tool) {
      this.isOpenModal = true;
      this.toolInModal = tool;
    },
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
      this.tools = tools.data;
      this.copyTools = tools.data;
    },
    listSort(v = this.listSortVar) {
      if (v === 'name_tools') {
        this.copyTools = this.copyTools.sort((a, b) =>
          this.directionsForSorting === 'DESC'
            ? a[v].localeCompare(b[v])
            : b[v].localeCompare(a[v])
        );
      }
      if (v === 'id_category') {
        this.copyTools = this.copyTools.sort((a, b) =>
          this.directionsForSorting === 'DESC'
            ? a.category.name_category.localeCompare(b.category.name_category)
            : b.category.name_category.localeCompare(a.category.name_category)
        );
      }
      if (v === 'countIndeed' || v === 'countHH') {
        this.copyTools = this.copyTools.sort((a, b) =>
          this.directionsForSorting === 'DESC'
            ? a.counts[this.selectedDate.id_date][v] -
              b.counts[this.selectedDate.id_date][v]
            : b.counts[this.selectedDate.id_date][v] -
              a.counts[this.selectedDate.id_date][v]
        );
      }

      this.directionsForSorting =
        this.directionsForSorting === 'DESC' ? 'ASC' : 'DESC';
    },
  },

  mounted() {
    this.getCategories();
    this.getTools();
    this.getDates();
  },
  watch: {
    selectedCategory(v) {
      this.copyTools = this.tools;
      this.listSort();
      if (v === 'all') {
        this.copyTools = this.copyTools.filter((tool) => {
          return tool.name_tools
            .toLowerCase()
            .includes(this.searchInput.toLowerCase());
        });
        return;
      }
      this.copyTools = this.copyTools.filter(
        (tool) =>
          tool.category.id_category === v.id_category &&
          tool.name_tools.toLowerCase().includes(this.searchInput.toLowerCase())
      );
    },
    searchInput(v) {
      this.copyTools = this.tools;
      this.listSort();
      if (this.selectedCategory === 'all') {
        this.copyTools = this.copyTools.filter((tool) => {
          return tool.name_tools.toLowerCase().includes(v.toLowerCase());
        });
        return;
      }

      this.copyTools = this.copyTools.filter(
        (tool) =>
          tool.category.id_category === this.selectedCategory.id_category &&
          tool.name_tools.toLowerCase().includes(v.toLowerCase())
      );
    },
  },

  components: { appTool },
};
</script>
