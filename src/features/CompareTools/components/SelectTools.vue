<template>
  <input
    v-model.trim="searchInput"
    class="compare__search-input"
    type="search"
    placeholder="Input tools"
    @keydown.enter="selectFirstItem" />
  <CompareSearchResults
    :filtered-tools="filteredTools"
    :search-input-length="searchInput.length"
    @add-to-compare="addToCompare" />
</template>

<script>
import CompareSearchResults from './CompareSearchResults.vue'

const MAX_COUNT_OF_RESULT = 10

export default {
  components: { CompareSearchResults },
  props: {
    tools: { type: Array, required: true },
    compareTools: { type: Array, required: true },
  },
  emits: ['selectFirstItem', 'addToCompare'],

  data() {
    return {
      searchInput: '',
    }
  },

  computed: {
    filteredTools() {
      const filteredTools = this.tools.filter(tool => {
        const lowerNameTool = tool.nameTool.toLowerCase()
        const lowerSearchInput = this.searchInput.toLowerCase()
        const cond1 = lowerNameTool.includes(lowerSearchInput)
        const cond2 = cond1 && !this.compareTools.includes(tool)
        return cond1 && cond2
      })
      return filteredTools.slice(0, MAX_COUNT_OF_RESULT)
    },
  },

  methods: {
    addToCompare(item) {
      this.searchInput = ''
      this.$emit('addToCompare', item)
    },
    selectFirstItem() {
      if (this.searchInput.length > 0 && this.filteredTools[0]) {
        this.$emit('selectFirstItem', this.filteredTools[0])
      }
      this.searchInput = ''
    },
  },
}
</script>

<style>
.compare__search-input {
  width: 100%;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
