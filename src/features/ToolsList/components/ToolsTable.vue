<template>
  <div class="rating-table">
    <table class="rating-table__inner">
      <thead class="rating-table__thead">
        <tr class="rating-table__row">
          <th class="rating-table__th rating-table__th_number">№</th>
          <th
            tabindex="0"
            class="rating-table__th rating-table__th_name"
            @click="$emit('listSort', 'nameTool')"
            @keydown.enter="$emit('listSort', 'nameTool')">
            Name
            <IconChevronUpDown />
          </th>
          <th tabindex="0" class="rating-table__th rating-table__th_category">
            Category
          </th>

          <th
            v-for="jbr of currentJobBoardsRegions2"
            :key="jbr.id"
            tabindex="0"
            class="rating-table__th"
            @click="$emit('listSort', +jbr.id)"
            @keydown.enter="$emit('listSort', +jbr.id)">
            {{ `${jbr.jobBoard}-${jbr.region}` }}
            <IconChevronUpDown />
          </th>
          <th tabindex="0" class="rating-table__th"></th>
        </tr>
      </thead>

      <tbody class="rating-table__tbody">
        <tr
          v-for="(tool, idx) of paginationTools"
          :key="tool.idTool"
          class="rating-table__row">
          <td class="rating-table__item">
            {{ idx + (page - 1) * itemsPerPage }}.
          </td>

          <td class="rating-table__item rating-table__item_name">
            <ControversialWord v-if="tool.is_controversial_word" />
            <!-- <img
              class="rating-table__item-logo"
              :src="
                tool.srcImg ? tool.srcImg : require('../assets/test-img.png')
              "
              :alt="`Logo ${tool.nameTool}`" /> -->
            <!-- <span @click="isOpenCompareModalFunction(tool)"> -->

            <span
              class="rating-table__item-item-name"
              @click="isOpenCompareModalFunction(tool, idx)">
              {{ tool.nameTool }}
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
            <div class="rating-table__item_category">
              <div
                v-for="category of tool.categories"
                :key="category.idCategory"
                class="rating-table__item-inner_category"
                :class="`categories__item_${category.idCategory}`">
                {{ category.nameCategory }}
              </div>
            </div>
          </td>
          <td
            v-for="jbr of currentJobBoardsRegions2"
            :key="jbr.id"
            class="rating-table__item rating-table__item_count">
            <div>
              {{ tool.counts[jbr.id]?.[selectedDate.idDate] }}
              <div v-if="tool.diff !== 0">
                <IconArrow
                  class="rating-table__item-fixme"
                  :class="`rating-table__item-fixme_${
                    tool.diff[jbr.id] > 0 ? 1 : -1
                  }`" />
                <span class="rating-table__item-fixme-span">
                  {{ tool.diff[jbr.id] }}
                </span>
              </div>
            </div>
          </td>
          <!-- <td class="rating-table__item">
            <button @click="$emit('addToStudiedTools', tool)">
              <IconStar
                :class="{
                  'rating-table__item-studied_acitve': tool.isStudied,
                }" />
            </button>
          </td> -->
        </tr>
        <ModalWrapper
          v-if="isOpenCompareModal"
          my-class="technology-comparison-wrapper"
          @close-modal="closeModal">
          <ModalCompare
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
      height="42px"
      mt="var(--unit)"
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
import { useStore } from '../store.js'
import ModalCompare from './ModalCompare.vue'

export default {
  components: { ModalCompare },

  props: {
    filteredList: { type: Array, default: () => [] },
    page: { type: Number, default: 1 },
    itemsPerPage: { type: Number, default: 1 },
    categories: { type: Array, default: () => [] },

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

  computed: {
    selectedDate() {
      return useStore().selectedDate
    },
    currentJobBoardsRegions2() {
      const a = useStore().jobBoardsRegions
      const res = []
      for (const jbr in a) {
        if (Object.hasOwnProperty.call(a, jbr)) {
          const element = a[jbr]
          if (element.status) res.push(element)
        }
      }

      return res
    },
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
.rating-table__thead {
}
.rating-table__tbody {
}
.rating-table__th {
  padding: var(--unit);
  font-size: var(--text-small);
  font-weight: 600;
  color: var(--color-gray);
  white-space: nowrap;
  cursor: pointer;
  border-bottom: var(--border-width-small) solid var(--color-border);
}
.rating-table__th_number {
  /* padding-right: var(--unit); */
}
.rating-table__th_name,
.rating-table__th_category {
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
.rating-table__item_count div {
  display: inline-flex;
  align-items: center;
}
.rating-table__item-fixme-span {
  font-size: var(--text-extra-small);
  /* color: var(--color-border); */
  /* font-weight: 700; */
}
.rating-table__item-fixme {
  width: var(--icon-size);
  height: var(--icon-size);
  margin-right: calc(var(--unit) / 2);
  margin-left: var(--unit);
}
.rating-table__item-fixme_1 {
  transform: rotate(0deg);
}
.rating-table__item-fixme_-1 {
  transform: rotate(180deg);
}
.rating-table__item-fixme_-1 path {
  stroke: red;
}
.rating-table__item-fixme_1 path {
  stroke: green;
}
.rating-table__item_name {
  text-align: left;
  white-space: nowrap;
}
.rating-table__item_category {
  display: flex;
  max-width: 100%;
  overflow-x: auto;
}

.rating-table__item-logo {
  width: var(--icon-size);
  height: var(--icon-size);
  margin-right: var(--unit);
  vertical-align: middle;
}
.rating-table__item-item-name {
  cursor: pointer;
}
.rating-table__item-star {
  margin-left: var(--unit);
  font-size: var(--text-middle);
  cursor: pointer;
}
.rating-table__item-star_active {
  color: var(--color-star);
}
.rating-table__item-inner_category {
  display: inline-flex;
  /* display: flex; */
  align-items: center;
  justify-content: center;
  /* max-width: var(--width-ratin-item-category); */
  max-width: 100%;
  height: var(--height-table-item);
  padding: 0 var(--unit);
  /* margin: 0 auto; */
  margin: calc(var(--unit) / 2);
  font-size: var(--text-extra-small);
  border-radius: var(--border-radius-middle);
}
.rating-table__item-studied {
  width: var(--icon-size);
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
  align-items: center;
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
  .empty-list__span {
    font-size: var(--text-extra-large);
  }
}
</style>
