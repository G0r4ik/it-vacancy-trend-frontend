<template>
  <div class="wrapper-search-result">
    <div
      v-if="searchInputLength > 0"
      class="compare__search-result search-result">
      <div v-if="filteredTools.length === 0" class="search-result__not-found">
        Not found
      </div>
      <div
        v-for="tool of filteredTools"
        :key="tool.idTool"
        tabindex="0"
        class="search-result__item"
        @click="$emit('addToCompare', tool)"
        @keydown.enter="$emit('addToCompare', tool)">
        {{ tool.nameTool }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    searchInputLength: { type: Number, required: true },
    filteredTools: { type: Array, default: () => [] },
  },

  emits: ['addToCompare'],
}
</script>

<style>
.wrapper-search-result {
  position: relative;
}
.compare__search-result {
  position: absolute;
  z-index: var(--z-index-dropdown);
  width: 100%;
  font-weight: 700;
  cursor: pointer;
  background: var(--color-background);
  border: var(--border-width-small) solid var(--color-border);
  border-top: 0;
  border-radius: var(--radius);
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.search-result__item {
  padding: var(--unit);
}
.search-result__not-found {
  padding: calc(var(--unit) * 2);
  font-size: var(--text-middle);
}
.search-result__item:hover {
  background: var(--color-border);
}
.search-result {
}
</style>
