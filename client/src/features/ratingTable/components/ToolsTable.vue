<template>
  <div class="rating-table">
    <table class="rating-table__inner">
      <thead class="rating-table__thead">
        <tr class="rating-table__row">
          <th
            tabindex="0"
            class="rating-table__th"
            @click="$emit('listSort', 'name_tool')"
            @keydown.enter="$emit('listSort', 'name_tool')">
            Name
            <IconChevronUpDown />
          </th>
          <th
            tabindex="0"
            class="rating-table__th"
            @click="$emit('listSort', 'id_category')"
            @keydown.enter="$emit('listSort', 'id_category')">
            Category
            <IconChevronUpDown />
          </th>
          <th
            tabindex="0"
            class="rating-table__th"
            @click="$emit('listSort', 'HeadHunter')"
            @keydown.enter="$emit('listSort', 'HeadHunter')">
            HHru
            <IconChevronUpDown />
          </th>
          <th tabindex="0" class="rating-table__th"></th>
        </tr>
      </thead>

      <tbody class="rating-table__tbody">
        <tr
          v-for="tool of paginationTools"
          :key="tool.toolId"
          class="rating-table__row">
          <td class="rating-table__item rating-table__item_name">
            <img
              class="rating-table__item-logo"
              :src="
                tool.srcImg ? tool.srcImg : require('../assets/test-img.png')
              "
              :alt="`Logo ${tool.name_tool}`" />
            <!-- <span @click="isOpenCompareModalFunction(tool)"> -->
            <span @click="isOpenCompareModalFunction(tool)">
              {{ tool.name_tool }}
            </span>
            <button
              tabindex="0"
              class="rating-table__item-star"
              :class="{
                'rating-table__item-star_active': tool.isFav,
              }"
              @click="$emit('addToFavoriteTools', tool)">
              &#9733;
            </button>
          </td>
          <td class="rating-table__item">
            <div
              class="rating-table__item_category"
              :class="'categories__item_' + tool.category.id_category">
              {{ tool.category.name_category }}
            </div>
          </td>
          <td class="rating-table__item rating-table__item_count">
            {{ tool?.counts?.HeadHunter?.[selectedDate.dateId] ?? 0 }}
            <!-- 'u' -->
          </td>
          <td class="rating-table__item">
            <button @click="$emit('addToStudiedTools', tool)">
              <IconStar
                :class="{
                  'rating-table__item-studied_acitve': tool.isStudied,
                }" />
            </button>
          </td>
        </tr>
        <ModalWrapper v-if="isOpenCompareModal" @close-modal="closeModal">
          <ModalCompare
            :tools="tools"
            :current-tool="toolInModal"
            :dates="dates" />
        </ModalWrapper>
      </tbody>
    </table>
    <AppSkeleton
      v-if="!isDataLoaded"
      width="100%"
      height="50px"
      mb="var(--unit)"
      :count="25" />
    <div v-if="tools.length === 0 && isDataLoaded" class="empty-list">
      There is nothing
    </div>
  </div>
</template>

<script>
// import ModalCompare from './modals/ModalCompare.vue'
import ModalCompare from './ModalCompare.vue'
import ModalWrapper from '@/shared/components/ModalWrapper.vue'

export default {
  components: { ModalCompare, ModalWrapper },

  props: {
    selectedDate: { type: Object, default: Object },
    paginationTools: { type: Array, default: () => [] },
    tools: { type: Array, default: () => [] },
    dates: { type: Array, default: () => [] },
    isDataLoaded: Boolean,
    isDataEmpty: Boolean,
  },

  emits: ['addToFavoriteTools', 'addToStudiedTools', 'listSort'],

  data() {
    return {
      isOpenCompareModal: false,
    }
  },

  computed: {},

  methods: {
    isOpenCompareModalFunction(tool) {
      this.isOpenCompareModal = true
      this.toolInModal = tool
    },
    closeModal() {
      this.isOpenCompareModal = false
    },
  },
}
</script>

<style>
.rating-table {
  min-height: 50vh;
  margin-bottom: var(--unit);
  overflow: hidden;
  overflow-x: auto;
}
.rating-table__inner {
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
}
.rating-table__thead {
}
.rating-table__row {
}
.rating-table__th {
  padding-top: var(--unit);
  padding-bottom: var(--unit);
  font-size: var(--text-small);
  font-weight: 600;
  color: var(--color-gray);
  cursor: pointer;
  border-bottom: 2px solid var(--color-border);
}
.rating-table__tbody {
}
.rating-table__icon-change-sort {
  display: flex;
}
.rating-table__icon-change-sort svg,
.rating-table__th svg {
  display: inline-block;
  width: 24px;
  vertical-align: middle;
  /* width: var(--icon-width-extra-small);
  fill: var(--color-gray);
  */
}
.rating-table__item {
  padding: var(--unit) var(--unit);
  text-align: center;
  vertical-align: middle;
  border-bottom: 2px solid var(--color-border);
}
.rating-table__item_name {
}
.rating-table__item-logo {
  width: var(--icon-width-middle);
  height: var(--icon-height-middle);
  margin-right: var(--unit);
  vertical-align: middle;
}
.rating-table__item-star {
  margin-left: var(--unit);
  font-size: var(--text-middle);
  cursor: pointer;
}
.rating-table__item-star_active {
  color: var(--color-star);
}
.rating-table__item_category {
  /* display: inline-flex; */
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 200px;
  height: 25px;
  padding: 0 var(--unit);
  margin: 0 auto;
  font-size: var(--text-extra-small);
  border-radius: var(--border-radius-middle);
}
.rating-table__item-studied {
  width: var(--icon-width-middle);
  cursor: pointer;
  border-radius: 50%;
  fill: var(--color-text);
}
.rating-table__item-studied_acitve {
  background: var(--color-primary2);
  fill: var(--color-background);
}
.empty-list {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50vh;
  font-size: 56px;
  color: var(--color-border);
}
@media (width <= 760px) {
  .rating-table__inner {
    font-size: var(--text-small);
  }
}
</style>
