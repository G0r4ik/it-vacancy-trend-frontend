<template>
  <div class="jobboard">
    <LabelAndCheckbox
      v-for="jobBoardRegion of jobBoardsRegions"
      :id="`jobBoardRegion_${jobBoardRegion.id}`"
      :key="jobBoardRegion.id"
      v-model="jobBoardsRegions.find(i => i.id === jobBoardRegion.id).status"
      class-label="jobboard__label"
      :text="`${jobBoardRegion.jobBoard} - ${jobBoardRegion.region}`" />
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useStore } from '../store'

export default {
  data() {
    return {
      omgNiceHackFixMe: false,
      b: {},
    }
  },

  computed: {
    jobBoardsRegions() {
      return useStore().jobBoardsRegions
    },
    currentJobBoardsRegions() {
      return useStore().currentJobBoardsRegions
    },
  },

  watch: {
    jobBoardsRegions: {
      handler() {
        const res = []
        for (const jbr in this.jobBoardsRegions) {
          if (Object.hasOwnProperty.call(this.jobBoardsRegions, jbr)) {
            const element = this.jobBoardsRegions[jbr]
            if (element.status) res.push(+element.id)
          }
        }
        useStore().currentJobBoardsRegions = res
        localStorage.setItem('currentJobBoardsRegions', JSON.stringify(res))
        useStore().loadOneCounts()
      },
      deep: true,
    },
  },
}
</script>
<style>
.jobboard {
  margin-bottom: calc(var(--unit) * 2);
}
.jobboard__label {
  margin-right: calc(var(--unit) * 5);
}
</style>
