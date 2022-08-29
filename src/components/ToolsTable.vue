<template>
  <div class="rating-table">
    <table class="rating-table__inner">
      <thead class="rating-table__thead">
        <tr class="rating-table__row">
          <th class="rating-table__th"></th>
          <th class="rating-table__th" @click="$emit('listSort', 'name_tool')">
            Название
          </th>
          <th
            class="rating-table__th"
            @click="$emit('listSort', 'id_category')">
            Категория
          </th>
          <th
            class="rating-table__th"
            @click="$emit('listSort', 'countIndeed')">
            Indeed
          </th>
          <th
            class="rating-table__th"
            @click="$emit('listSort', 'countHeadHunter')">
            HHru
          </th>
          <th class="rating-table__th"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tool of tools" :key="tool.id_tool" class="rating-table__row">
          <td
            class="rating-table__item rating-table__favorites"
            :class="{
              'rating-table__favorites_active': favoritesTools?.find(
                t => t.id_tool === tool.id_tool
              ),
            }"
            @click="$emit('clickIconFavoriteTools', tool)">
            &#9733;
          </td>
          <td class="rating-table__item" @click="isOpenModalFunction(tool)">
            {{ tool.name_tool }}
          </td>
          <td class="rating-table__item">
            <div
              class="rating-table__item_category"
              :class="'category' + tool.category.id_category">
              {{ tool.category.name_category }}
            </div>
          </td>
          <td class="rating-table__item rating-table__count">
            {{ tool.counts[selectedDate.id_date].countIndeed }}
          </td>
          <td class="rating-table__item rating-table__count">
            {{ tool.counts[selectedDate.id_date].countHeadHunter }}
          </td>
          <td
            class="rating-table__item rating-table__ready"
            @click="$emit('clickIconStudiedTools', tool)">
            <svg
              :class="{
                'rating-table__ready_active': studiedTools?.find(
                  t => t.id_tool === tool.id_tool
                ),
              }"
              class="rating-table__ready-svg"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16,31A15,15,0,1,1,31,16,15,15,0,0,1,16,31ZM16,3A13,13,0,1,0,29,16,13,13,0,0,0,16,3Z" />
              <path
                d="M13.67,22a1,1,0,0,1-.73-.32l-4.67-5a1,1,0,0,1,1.46-1.36l3.94,4.21,8.6-9.21a1,1,0,1,1,1.46,1.36l-9.33,10A1,1,0,0,1,13.67,22Z" />
            </svg>
          </td>
        </tr>
        <teleport to="body">
          <app-tool
            :tools="copyTools"
            :currentTool="toolInModal"
            :dates="dates"
            v-if="isOpenModal">
          </app-tool>
        </teleport>
      </tbody>
    </table>
  </div>
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

  emits: ['clickIconFavoriteTools', 'clickIconStudiedTools', 'listSort'],

  data() {
    return {
      isOpenModal: false,
      copyTools: this.tools,
    }
  },
  computed: {},
  methods: {
    isOpenModalFunction(tool) {
      this.isOpenModal = true
      this.toolInModal = tool
    },
  },
}
</script>

<style scoped>
.rating-table {
  overflow-x: auto;
}

.rating-table__inner {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  position: relative;
  /* font-size: 20px; */
}

.rating-table__thead {
  position: sticky;
  top: -1px;
  padding: 15px 0;
  background: var(--color-background);
  z-index: 10000;
  width: 100%;
}

.rating-table__row {
}

.rating-table__th {
  color: #585858;
  font-weight: 700;
  cursor: pointer;
  padding-bottom: var(--padding-small);
  border-bottom: 2px solid #585858;
  padding-bottom: 15px;
  padding-left: 10px;
  padding-top: 15px;
  font-size: 16px;
}

.rating-table__item {
  border-bottom: 2px solid #404149;
  padding: 10px;
  padding-bottom: var(--padding-small);
  padding-top: var(--padding-small);
  text-align: center;
  min-width: 130px;
}

.rating-table__favorites {
  /* max-width: 60px; */
  cursor: pointer;
  padding: 0;
  min-width: auto;
}

.rating-table__favorites_active {
  color: #f6b87e;
}

.rating-table__item_category {
  padding: 0 10px;
  margin: 0 auto;
  height: 40px;
  border-radius: 20px;
  max-width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}

.rating-table__count {
  min-width: auto;
}

.rating-table__ready {
  min-width: auto;
}

.rating-table__ready_active {
  background: green;
}

.rating-table__ready-svg {
  cursor: pointer;
  width: 42px;
  border-radius: 50%;
  fill: var(--color-text);
}

.category1 {
  background: #ff00ff;
}
.category2 {
  background: #ffff00;
  color: var(--color-background);
}
.category3 {
  background: #ff9900;
}
.category4 {
  background: #ea4335;
}
.category5 {
  background: #00ff00;
  color: var(--color-background);
}
.category6 {
  background: #00ffff;
  color: var(--color-background);
}
.category7 {
  background: #b6d7a8;
  color: var(--color-background);
}
.category8 {
  background: #46bdc6;
}
.category9 {
  background: #9900ff;
}
.category10 {
  background: #a4c2f4;
  color: var(--color-background);
}
.category11 {
  background: #34a853;
}
.category12 {
  background: #3d85c6;
}
.category13 {
  background: #ead1dc;
  color: var(--color-background);
}
.category14 {
  background: #f3f3f3;
  color: var(--color-background);
}
.category15 {
  background: #cccccc;
  color: var(--color-background);
}

@media (max-width: 700px) {
  .rating-table__inner {
    font-size: 14px;
  }
}
</style>
