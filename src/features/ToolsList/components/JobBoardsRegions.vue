<template>
  <div class="jobboard">
    <LabelAndCheckbox
      v-for="jobBoardRegion of jobBoardsRegions"
      :id="`jobBoardRegion_${jobBoardRegion.id}`"
      :key="jobBoardRegion.id"
      v-model="jobBoardsRegions.find(i => i.id === jobBoardRegion.id).status"
      class="jobboard__item"
      :text="`${jobBoardRegion.jobBoard} - ${jobBoardRegion.region}`" />
  </div>
</template>

<script>
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
          const element = this.jobBoardsRegions[jbr]
          if (element.status) res.push(+element.id)
        }
        useStore().changeCurrentJobBoardRegions(res)
        localStorage.setItem('currentJobBoardsRegions', JSON.stringify(res))
        // useStore().loadOneCounts()
      },
      deep: true,
    },
  },
}
</script>
<style>
.jobboard {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: calc(var(--unit) * 2);
}
.jobboard__item {
  margin-right: calc(var(--unit) * 8);
}
</style>
