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
        const lowerNameTool = tool.name_tool.toLowerCase()
        const lowerSearchInput = this.searchInput.toLowerCase()
        const cond1 = lowerNameTool.includes(lowerSearchInput)
        const cond2 = !this.compareTools.includes(tool)
        return cond1 && cond2
      })
      return filteredTools.slice(0, 10)
    },
  },

  methods: {
    addToCompare(item) {
      this.searchInput = ''
      this.$emit('addToCompare', item)
    },
    selectFirstItem() {
      this.searchInput = ''
      if (this.searchInput.length > 0 && this.filteredTools[0]) {
        this.$emit('selectFirstItem', this.filteredTools[0])
      }
    },
  },
}
</script>
