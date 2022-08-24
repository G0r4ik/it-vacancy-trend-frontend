<template>
  <ul>
    <li
      v-for="tool of tools"
      :key="tool.id_tool"
      class="list__item list-rows"
      :class="'category' + tool.category.id_category"
    >
      <span
        class="list-rows__favourites"
        :class="{
          'list-rows__favourites_active': favoritesTools?.find(
            (t) => t.id_tool === tool.id_tool
          ),
        }"
        @click="$emit('clickIconFavoriteTools', tool)"
      ></span>
      <span class="list-rows__item" @click="isOpenModalFunction(tool)">
        {{ tool.name_tools }}
      </span>
      <span class="list-rows__item list-rows__item_category">
        {{ tool.category.name_category }}
      </span>
      <span class="list-rows__item list-rows__item_count">
        {{ tool.counts[selectedDate.id_date].countIndeed }}
      </span>
      <span class="list-rows__item list-rows__item_count">
        {{ tool.counts[selectedDate.id_date].countHeadHunter }}
      </span>
    </li>
    <teleport to="body">
      <app-tool
        :tools="copyTools"
        :currentTool="toolInModal"
        :dates="dates"
        v-if="isOpenModal"
      ></app-tool>
    </teleport>
  </ul>
  <div class="empty-list" v-if="listEmpty">Ничего нет</div>
</template>

<script>
import appTool from './AppTool.vue';

export default {
  emits: ['clickIconFavoriteTools'],

  data() {
    return {
      isOpenModal: false,
      copyTools: this.tools,
    };
  },
  computed: {
    listEmpty() {
      return !this.tools.length;
    },
  },
  methods: {
    isOpenModalFunction(tool) {
      this.isOpenModal = true;
      this.toolInModal = tool;
    },
  },
  components: { appTool },
  props: {
    tools: Array,
    favoritesTools: Array,
    selectedDate: Object,
    selectedCategory: [String, Object],
    searchInput: String,
  },
  mounted() {
    // if (this.selectedCategory === 'all') {
    //   this.copyTools = this.copyTools.filter((tool) => {
    //     return tool.name_tools
    //       .toLowerCase()
    //       .includes(this.searchInput.toLowerCase());
    //   });
    //   this.copyFavoriteTools = this.copyFavoriteTools.filter((tool) => {
    //     return tool.name_tools
    //       .toLowerCase()
    //       .includes(this.searchInput.toLowerCase());
    //   });
    // } else {
    //   console.log('wwwwwwww')
    //   this.copyTools = this.copyTools.filter(
    //     (tool) =>
    //       tool.category.id_category === this.selectedCategory.id_category &&
    //       tool.name_tools.toLowerCase().includes(this.searchInput.toLowerCase())
    //   );
    //   this.copyFavoriteTools = this.copyFavoriteTools.filter(
    //     (tool) =>
    //       tool.category.id_category === this.selectedCategory.id_category &&
    //       tool.name_tools.toLowerCase().includes(this.searchInput.toLowerCase())
    //   );
    // }
  },
};
</script>
