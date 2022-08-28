<template>
  <ul>
    <li
      v-for="tool of tools"
      :key="tool.id_tool"
      class="list__item list-rows"
      :class="'category' + tool.category.id_category">
      <span
        class="list-rows__favourites"
        :class="{
          'list-rows__favourites_active': favoritesTools?.find(
            t => t.id_tool === tool.id_tool
          ),
        }"
        @click="$emit('clickIconFavoriteTools', tool)">
        &#9733;</span
      >
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
      <span
        class="list-rows__ready"
        @click="$emit('clickIconStudiedTools', tool)">
        <svg
          :class="{
            'list-rows__ready_active': studiedTools?.find(
              t => t.id_tool === tool.id_tool
            ),
          }"
          class="list-rows__ready-svg"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16,31A15,15,0,1,1,31,16,15,15,0,0,1,16,31ZM16,3A13,13,0,1,0,29,16,13,13,0,0,0,16,3Z" />
          <path
            d="M13.67,22a1,1,0,0,1-.73-.32l-4.67-5a1,1,0,0,1,1.46-1.36l3.94,4.21,8.6-9.21a1,1,0,1,1,1.46,1.36l-9.33,10A1,1,0,0,1,13.67,22Z" />
        </svg>
      </span>
    </li>
    <teleport to="body">
      <app-tool
        :tools="copyTools"
        :currentTool="toolInModal"
        :dates="dates"
        v-if="isOpenModal">
      </app-tool>
    </teleport>
  </ul>
  <div class="empty-list" v-if="listEmpty">Ничего нет</div>
</template>

<script>
import appTool from './AppTool.vue'

export default {
  components: { appTool },
  props: {
    tools: Array,
    favoritesTools: Array,
    studiedTools: Array,
    selectedDate: Object,
    selectedCategory: [String, Object],
    searchInput: String,
  },

  emits: ['clickIconFavoriteTools', 'clickIconStudiedTools'],

  data() {
    return {
      isOpenModal: false,
      copyTools: this.tools,
    }
  },
  computed: {
    listEmpty() {
      return !this.tools.length
    },
  },
  methods: {
    isOpenModalFunction(tool) {
      this.isOpenModal = true
      this.toolInModal = tool
    },
  },
}
</script>

<style scoped>
.list__item {
  /* background: #1c1c25; */
  margin: var(--margin-small) 0;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border: 5px solid var(--color-border);
  border-radius: 15px;
}

.list-rows__favourites {
  position: relative;
  cursor: pointer;
  font-size: 42px;
  margin-top: -4px;
  color: gray;
}

.list-rows__item {
  min-width: 80px;
  width: 35%;
  /* text-align: center; */
}

.list-rows__ready_active {
  background: green;
}

.list-rows__favourites_active {
  color: #f6b87e;
}

.list-rows__item_category {
  /* background: #4ba5e4; */
}

.list-rows__item_count {
  min-width: 80px;
  width: 10%;
}

.list-rows__ready {
  display: flex;
  align-items: center;
  justify-content: center;
}

.list-rows__ready-svg {
  cursor: pointer;
  width: 42px;
  border-radius: 50%;
  fill: var(--color-text);
}

.empty-list {
  width: 100%;
  font-size: 56px;
  text-align: center;
  color: #242424;
  margin-top: 120px;
}
</style>
