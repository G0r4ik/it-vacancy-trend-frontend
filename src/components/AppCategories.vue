<template>
  <div>
    <button @click="getTools()">aaaaaaaaaaaaaaaaaaaa</button>
    <h2>Categories:</h2>
    <ul>
      <li
        v-for="category of categories"
        :key="category.id_tools"
        :class="'category' + category.id_category"
      >
        {{ category.name_tools }}
        {{ category.id_category }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      categories: [],
    };
  },
  methods: {
    async getTools() {
      let tools = await axios({
        method: 'get',
        url: 'http://127.0.0.1:5501/getTools',
      });
      tools = tools.data;
      console.log(tools);
      this.categories = tools;
    },
  },
  mounted() {
    async function getTools() {
      let tools = await axios({
        method: 'get',
        url: 'http://127.0.0.1:5501/getTools',
      });
      tools = tools.data;
      console.log(tools);
      this.categories = tools.data;
      // this.categories = tools.map((el) => JSON.stringify(el));
    }
  },
};
</script>
