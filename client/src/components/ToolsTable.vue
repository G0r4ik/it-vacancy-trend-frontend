<template>
  <div class="rating-table">
    <table class="rating-table__inner">
      <thead class="rating-table__thead">
        <tr class="rating-table__row">
          <th class="rating-table__th" @click="$emit('listSort', 'name_tool')">
            Название
            <span class="rating-table__icon-change-sort">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 400 400"
                xml:space="preserve"
              >
                <path
                  d="M73.092 164.452h255.813c4.949 0 9.233-1.807 12.848-5.424 3.613-3.616 5.427-7.898 5.427-12.847s-1.813-9.229-5.427-12.85L213.846 5.424C210.232 1.812 205.951 0 200.999 0s-9.233 1.812-12.85 5.424L60.242 133.331c-3.617 3.617-5.424 7.901-5.424 12.85 0 4.948 1.807 9.231 5.424 12.847 3.621 3.617 7.902 5.424 12.85 5.424zm255.813 73.097H73.092c-4.952 0-9.233 1.808-12.85 5.421-3.617 3.617-5.424 7.898-5.424 12.847s1.807 9.233 5.424 12.848L188.149 396.57c3.621 3.617 7.902 5.428 12.85 5.428s9.233-1.811 12.847-5.428l127.907-127.906c3.613-3.614 5.427-7.898 5.427-12.848 0-4.948-1.813-9.229-5.427-12.847-3.614-3.616-7.899-5.42-12.848-5.42z"
                />
              </svg>
            </span>
          </th>
          <th
            class="rating-table__th"
            @click="$emit('listSort', 'id_category')"
          >
            Категория
            <span class="rating-table__icon-change-sort">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 400 400"
                xml:space="preserve"
              >
                <path
                  d="M73.092 164.452h255.813c4.949 0 9.233-1.807 12.848-5.424 3.613-3.616 5.427-7.898 5.427-12.847s-1.813-9.229-5.427-12.85L213.846 5.424C210.232 1.812 205.951 0 200.999 0s-9.233 1.812-12.85 5.424L60.242 133.331c-3.617 3.617-5.424 7.901-5.424 12.85 0 4.948 1.807 9.231 5.424 12.847 3.621 3.617 7.902 5.424 12.85 5.424zm255.813 73.097H73.092c-4.952 0-9.233 1.808-12.85 5.421-3.617 3.617-5.424 7.898-5.424 12.847s1.807 9.233 5.424 12.848L188.149 396.57c3.621 3.617 7.902 5.428 12.85 5.428s9.233-1.811 12.847-5.428l127.907-127.906c3.613-3.614 5.427-7.898 5.427-12.848 0-4.948-1.813-9.229-5.427-12.847-3.614-3.616-7.899-5.42-12.848-5.42z"
                />
              </svg>
            </span>
          </th>
          <th class="rating-table__th" @click="$emit('listSort', 'HeadHunter')">
            HHru
            <span class="rating-table__icon-change-sort">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 400 400"
                xml:space="preserve"
              >
                <path
                  d="M73.092 164.452h255.813c4.949 0 9.233-1.807 12.848-5.424 3.613-3.616 5.427-7.898 5.427-12.847s-1.813-9.229-5.427-12.85L213.846 5.424C210.232 1.812 205.951 0 200.999 0s-9.233 1.812-12.85 5.424L60.242 133.331c-3.617 3.617-5.424 7.901-5.424 12.85 0 4.948 1.807 9.231 5.424 12.847 3.621 3.617 7.902 5.424 12.85 5.424zm255.813 73.097H73.092c-4.952 0-9.233 1.808-12.85 5.421-3.617 3.617-5.424 7.898-5.424 12.847s1.807 9.233 5.424 12.848L188.149 396.57c3.621 3.617 7.902 5.428 12.85 5.428s9.233-1.811 12.847-5.428l127.907-127.906c3.613-3.614 5.427-7.898 5.427-12.848 0-4.948-1.813-9.229-5.427-12.847-3.614-3.616-7.899-5.42-12.848-5.42z"
                />
              </svg>
            </span>
          </th>
          <th class="rating-table__th"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(tool, i) of paginatedTools"
          :key="tool.id_tool"
          class="rating-table__row"
        >
          <td class="rating-table__item rating-table__item_name">
            <img
              class="rating-table__item-logo"
              :src="
                tool.srcImg ? tool.srcImg : require('@/assets/test-img.png')
              "
              :alt="`Logo ${tool.name_tool}`"
            />
            <!-- <span @click="isOpenModalFunction(tool)"> -->
            <span>
              {{ tool.name_tool }}
            </span>
            <span
              class="rating-table__item-star"
              :class="{
                'rating-table__item-star_active': tool.isFav,
              }"
              @click="$emit('addToFavoriteTools', tool)"
            >
              &#9733;
            </span>
          </td>
          <td class="rating-table__item">
            <div
              class="rating-table__item_category"
              :class="'categories__item_' + tool.category.id_category"
            >
              {{ tool.category.name_category }}
            </div>
          </td>
          <td class="rating-table__item rating-table__item_count">
            {{ tool.counts.HeadHunter[selectedDate.id_date] }}
          </td>
          <td class="rating-table__item">
            <svg
              @click="$emit('addToStudiedTools', tool)"
              :class="{
                'rating-table__item-svg_acitve': tool.isStudiedTools
              }"
              class="rating-table__item-svg"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16,31A15,15,0,1,1,31,16,15,15,0,0,1,16,31ZM16,3A13,13,0,1,0,29,16,13,13,0,0,0,16,3Z"
              />
              <path
                d="M13.67,22a1,1,0,0,1-.73-.32l-4.67-5a1,1,0,0,1,1.46-1.36l3.94,4.21,8.6-9.21a1,1,0,1,1,1.46,1.36l-9.33,10A1,1,0,0,1,13.67,22Z"
              />
            </svg>
          </td>
        </tr>
        <!-- <teleport to="body">
          <app-tool
            :tools="tools"
            :currentTool="toolInModal"
            :dates="dates"
            @closeModal="closeModal"
            v-if="isOpenModal"
          >
          </app-tool>
        </teleport>
      </tbody> -->
      </tbody>
    </table>

    <div class="empty-list" v-if="listEmpty">Ничего нет</div>
  </div>
</template>

<script>
// import appTool from './AppTool.vue'
export default {
  // components: { appTool },
  props: {
    selectedDate: Object,
    paginatedTools: Array,
  },

  emits: ['addToFavoriteTools', 'addToStudiedTools', 'listSort'],

  data() {
    return {
      // isOpenModal: false,
    }
  },
  computed: {
    listEmpty() {
      return !this.paginatedTools.length
    },
  },

  methods: {
    // isOpenModalFunction(tool) {
    //   this.isOpenModal = true
    //   this.toolInModal = tool
    // },
    // closeModal() {
    //   this.isOpenModal = false
    // },
  },
}
</script>

<style scoped>
.rating-table {
  overflow: hidden;
  overflow-x: auto;
}
.rating-table__inner {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}
.rating-table__thead {
}
.rating-table__row {
}
.rating-table__th {
  color: var(--color-gray);
  font-weight: 600;
  cursor: pointer;
  padding-bottom: var(--padding-small);
  border-bottom: 2px solid var(--color-border);
  padding-top: var(--padding-small);
  font-size: var(--text-small);
}
.rating-table__icon-change-sort {
  width: 13px;
  display: inline-block;
  fill: var(--color-gray);
  vertical-align: middle;
}
.rating-table__item {
  border-bottom: 2px solid var(--color-border);
  padding: var(--padding-small) var(--padding-extra-small);
  text-align: center;
  vertical-align: middle;
}
.rating-table__item_name {
}
.rating-table__item-logo {
  vertical-align: middle;
  width: 30px;
  height: 30px;
  margin-right: var(--margin-small);
}
.rating-table__item-star {
  margin-left: var(--margin-extra-small);
  cursor: pointer;
  font-size: var(--text-middle);
}
.rating-table__item-star_active {
  color: #f6b87e;
}
.rating-table__item_category {
  padding: 0 var(--padding-small);
  height: 40px;
  border-radius: 20px;
  max-width: 200px;
  /* display: inline-flex; */
  /* !!! */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--text-extra-small);
}
.rating-table__item-svg {
  cursor: pointer;
  width: 42px;
  border-radius: 50%;
  fill: var(--color-text);
}
.rating-table__item-svg_acitve {
  fill: var(--color-background);
  background: var(--color-primary2);
}
.empty-list {
  width: 100%;
  font-size: 56px;
  text-align: center;
  color: var(--color-border);
  margin-top: 120px;
}
@media (max-width: 760px) {
  .rating-table__inner {
    font-size: var(--text-small);
  }
}
</style>
