<template>
  <div class="rating-table">
    <table class="rating-table__inner">
      <thead class="rating-table__thead">
        <tr class="rating-table__row">
          <th class="rating-table__th">№</th>
          <th
            tabindex="0"
            class="rating-table__th rating-table__th_name"
            @click="$emit('listSort', 'name_tool')"
            @keydown.enter="$emit('listSort', 'name_tool')">
            Name
            <IconChevronUpDown />
          </th>
          <th tabindex="0" class="rating-table__th">Category</th>
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
          v-for="(tool, idx) of paginationTools"
          :key="tool.id_tool"
          class="rating-table__row">
          <td class="rating-table__item">
            {{ idx + (page - 1) * itemsPerPage }}.
          </td>
          <td class="rating-table__item rating-table__item_name">
            <!-- <img
              class="rating-table__item-logo"
              :src="
                tool.srcImg ? tool.srcImg : require('../assets/test-img.png')
              "
              :alt="`Logo ${tool.name_tool}`" /> -->
            <!-- <span @click="isOpenCompareModalFunction(tool)"> -->

            <span @click="isOpenCompareModalFunction(tool, idx)">
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
            <!-- {{ category }} -->
            <div
              v-for="category of tool.categories"
              :key="category.id_category"
              class="rating-table__item_category"
              :class="`categories__item_${category.id_category}`">
              {{ category.name_category }}
            </div>
          </td>
          <td class="rating-table__item rating-table__item_count">
            {{ tool.counts.HeadHunter[selectedDate.id_date] ?? 0 }}
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
            :filtered-list="filteredList"
            :categories="categories"
            :tools="tools"
            :page="page"
            :current-tool="toolInModal"
            :dates="dates"
            @open-new-item-in-modal="openNewItemInModal" />
        </ModalWrapper>
      </tbody>
    </table>
    <AppSkeleton
      v-if="!isDataLoaded"
      width="100%"
      height="calc(var(--unit) * 10)"
      mb="var(--unit)"
      :count="25" />
    <div v-if="tools.length === 0 && isDataLoaded" class="empty-list">
      <div class="empty-list__span">There is nothing</div>
      <button class="empty-list__button" @click="$emit('clearFilters')">
        Clear filters
      </button>
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
    filteredList: { type: Array, default: () => [] },
    page: { type: Number, default: 1 },
    itemsPerPage: { type: Number, default: 1 },
    categories: { type: Array, default: () => [] },
    selectedDate: { type: Object, default: Object },
    paginationTools: { type: Array, default: () => [] },
    tools: { type: Array, default: () => [] },
    dates: { type: Array, default: () => [] },
    isDataLoaded: Boolean,
    isDataEmpty: Boolean,
  },

  emits: [
    'addToFavoriteTools',
    'addToStudiedTools',
    'listSort',
    'clearFilters',
  ],

  data() {
    return {
      isOpenCompareModal: false,
      indexOfTool: null,
      toolInModal: null,
    }
  },

  methods: {
    openNewItemInModal(item) {
      if (item === 'prev') this.indexOfTool--
      if (item === 'next') this.indexOfTool++
      if (this.indexOfTool >= this.filteredList.length) this.indexOfTool = 0
      if (this.indexOfTool < 0) this.indexOfTool = this.filteredList.length - 1
      this.toolInModal = this.filteredList[this.indexOfTool]
    },
    isOpenCompareModalFunction(tool, index) {
      this.isOpenCompareModal = true
      this.toolInModal = tool
      this.indexOfTool = (this.page - 1) * this.itemsPerPage + index
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
.rating-table__th {
  padding-top: var(--unit);
  padding-bottom: var(--unit);
  font-size: var(--text-small);
  font-weight: 600;
  color: var(--color-gray);
  cursor: pointer;
  border-bottom: var(--border-width-small) solid var(--color-border);
}
.rating-table__th_name {
  text-align: left;
}
.rating-table__icon-change-sort {
  display: flex;
}
.rating-table__icon-change-sort svg,
.rating-table__th svg {
  display: inline-block;
  width: var(--icon-size);
  vertical-align: middle;
  /* width: var(--icon-width-extra-small);
  fill: var(--color-gray);
  */
}
.rating-table__item {
  padding: var(--unit) var(--unit);
  text-align: center;
  vertical-align: middle;
  border-bottom: var(--border-width-small) solid var(--color-border);
}
.rating-table__item_name {
  text-align: left;
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
  display: inline-flex;
  /* display: flex; */
  align-items: center;
  justify-content: center;
  max-width: var(--width-ratin-item-category);
  height: var(--height-table-item);
  padding: 0 var(--unit);
  /* margin: 0 auto; */
  margin: 0 calc(var(--unit) / 2);
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50vh;
  color: var(--color-border);
}
.empty-list__span {
  font-size: var(--text-extra-extra-large);
}
.empty-list__button {
  padding: 0 var(--unit);
  font-weight: 700;
  border: var(--border-width-small) solid var(--color-border);
  border-radius: var(--border-radius-middle);
  transition: 0.3s;
}
.empty-list__button:hover {
  color: var(--color-text);
  border-color: var(--color-text);
  opacity: 0.8;
  transition: 0.3s;
}
@media (width <= 760px) {
  .rating-table__inner {
    font-size: var(--text-small);
  }
}
</style>
