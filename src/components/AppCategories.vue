<template>
  <h2 class="title">RATING:</h2>

  <div>
    <div class="filters">
      <div class="container">
        <div class="filters__inner">
          <div class="filters__select-wrapper select-wrapper">
            <select
              name="date_of_completion"
              id="date_of_completion"
              v-model="selectedDate"
            >
              <option v-for="date of dates" :value="date" :key="date.id_date">
                {{ date.date_of_completion }}
              </option>
            </select>
            <!-- <input type="text"> -->
          </div>

          <select
            name="date_of_completion"
            id="date_of_completion"
            v-model="selectedCategory"
          >
            <option value="all">Все</option>
            <option
              v-for="category of categories"
              :key="category.id_category"
              :class="'category' + category.id_category"
              :value="category.id_category"
            >
              {{ category.name_category }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="list">
      <div class="container">
        <div class="list__inner">
          <div class="list__column">
            <span class="list__column-item" @click="listSort('name_tools')"
              >Название</span
            >
            <span class="list__column-item" @click="listSort('id_category')"
              >Категория</span
            >
            <span
              class="list__column-item list__column-item_count"
              @click="listSort('indeed')"
              >Indeed</span
            >
            <span
              class="list__column-item list__column-item_count"
              @click="listSort('hh')"
              >HHru</span
            >
          </div>
          <ul>
            <li
              v-for="tool of copyTools"
              :key="tool.id_tools"
              class="list__item list-rows"
              :class="'category' + tool.id_category"
            >
              <span class="list-rows__item"> {{ tool.name_tools }}</span>
              <span class="list-rows__item">
                {{ category(tool.id_category) }}
              </span>
              <span class="list-rows__item list-rows__item_count">
                {{ indeedCount(tool.id_tools) }}
              </span>
              <span class="list-rows__item list-rows__item_count">
                {{ hhCount(tool.id_tools) }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      categories: [],
      dates: [],
      copyDates: [],
      tools: [],
      copyTools: [],
      countHH: [],
      countIndeed: [],
      selectedCategory: 'all',
      selectedDate: 1,
      directionsForSorting: 'DESC',
    };
  },
  methods: {
    add() {
      this.getCategories();
      this.getDates();
      this.getTools();
      this.getCount();
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
      console.log(this.selectedDate);
    },
    async getTools() {
      let tools = await axios({
        method: 'get',
        url: 'http://127.0.0.1:5501/getTools',
      });
      this.tools = tools.data;
      this.copyTools = tools.data;
    },
    async getCount() {
      let count = await axios({
        method: 'get',
        url: 'http://127.0.0.1:5501/getCount',
      });
      this.countHH = count.data[1].rows;
      this.countIndeed = count.data[0].rows;
    },
    category(tool) {
      return this.categories.find((c) => c.id_category === tool).name_category;
    },
    indeedCount(tool) {
      return this.countIndeed.find((c) => {
        return (
          c.id_tools === tool &&
          c.date_of_completion === this.selectedDate.id_date
        );
      }).id_count_in_indeed;
    },
    hhCount(tool) {
      return this.countHH.find((c) => {
        return (
          c.id_tools === tool &&
          c.date_of_completion === this.selectedDate.id_date
        );
      }).id_count_in_indeed;
    },
    listSort(v) {
      if (v === 'name_tools') {
        this.copyTools = this.copyTools.sort((a, b) =>
          this.directionsForSorting === 'DESC'
            ? a[v].localeCompare(b[v])
            : b[v].localeCompare(a[v])
        );
      }
      if (v === 'id_category') {
        this.copyTools = this.copyTools.sort((a, b) =>
          this.directionsForSorting === 'DESC' ? a[v] - b[v] : b[v] - a[v]
        );
      }
      if (v === 'hh') {
        this.copyTools = [];
        const ids = this.countHH
          .sort((a, b) => {
            return this.directionsForSorting === 'DESC'
              ? a.id_count_in_indeed - b.id_count_in_indeed
              : b.id_count_in_indeed - a.id_count_in_indeed;
          })
          .filter((el) => {
            if (el.date_of_completion === this.selectedDate.id_date) {
              return el.id_tools;
            }
          });
        console.log(ids);
        for (const id of ids) {
          this.copyTools.push(
            this.tools.find((e) => e.id_tools === id.id_tools)
          );
        }
      }
      if (v === 'indeed') {
      }

      this.directionsForSorting =
        this.directionsForSorting === 'DESC' ? 'ASC' : 'DESC';
    },
  },

  computed: {},

  async mounted() {
    await this.getCount();
    await this.getCategories();
    await this.getDates();
    await this.getTools();
  },
  watch: {
    selectedCategory(v) {
      this.copyTools = this.tools;
      if (v === 'all') return;
      this.copyTools = this.copyTools.filter((el) => el.id_category === v);
    },
    selectedDate(v) {
      this.copyDates = this.copyDates.filter(
        (el) => el.id_date === this.selectedDate.id_date && el.id_category === v
      );
    },
  },
};
</script>
