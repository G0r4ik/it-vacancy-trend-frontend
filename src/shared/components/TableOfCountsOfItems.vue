<template>
  <div class="table-settings-count__labels">
    <labelAndCheckbox
      id="show-all-dates"
      v-model="showAllDates"
      label-class="table-settings-count__label"
      text="Show from the first date(empty cells are possible)" />
  </div>
  <AppSkeleton
    v-if="isShowSkeleton"
    :count="1"
    display="block"
    height="45px"
    width="100%"
    mt="1px"
    br="5px" />
  <AppSkeleton
    v-if="isShowSkeleton"
    :count="currentJobBoardsRegions.length * tools.length + 0"
    display="block"
    height="60px"
    width="100%"
    mt="1px"
    br="5px" />
  <div v-else class="compare__table-wrapper">
    <table class="compare__table">
      <tr>
        <td class="compare__table-tool-name compare__table_td">tool\date</td>
        <td
          v-for="(date, index) of datesF"
          :key="date.idDate"
          class="compare__table-tool-date compare__table_td"
          @click="sortTable(index + 1)">
          {{ normalizeString(date.dateOfCompletion) }}
          <br />
          {{ getYear(date.dateOfCompletion) }}
        </td>
      </tr>
      <tbody class="compare__tbody">
        <template v-for="tool of tools" :key="tool.idTool">
          <tr
            v-for="jobBoard of currentJobBoardsRegions"
            :key="tool.idTool + jobBoard"
            class="compare__table-tr">
            <td class="compare__table-tool-name compare__table_td">
              <div class="compare__table-tool-name-div">
                {{ tool.nameTool }} <br />
                {{ getJobBoard(jobBoard) }}
              </div>
            </td>
            <AppSkeleton
              v-if="
                Object.keys(tool.counts[jobBoard]).length !== dates.length ||
                isShowSkeleton
              "
              :count="dates.length"
              display="table-cell"
              height="45px"
              width="55px"
              mr="5px"
              br="5px" />
            <td
              v-for="(count, i) of Object.values(tool.counts[jobBoard]).slice(
                min
              )"
              :key="tool.idTool + jobBoard + i"
              class="compare__table-count compare__table_td">
              {{ count }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useStore } from '@/features/ToolsList'

export default {
  props: {
    tools: { type: Array, default: () => [] },
    dates: { type: Array, default: () => [] },
  },
  data() {
    return {
      sortDirection: 1,
      datesF: 0,
      min: Number.POSITIVE_INFINITY,
      showAllDates: false,
      isShowSkeleton: true,
    }
  },
  computed: {
    tools2() {
      return this.tools.map(tool => tool.nameTool)
    },
    jobBoardsRegions() {
      return useStore().jobBoardsRegions
    },
    currentJobBoardsRegions() {
      return useStore().currentJobBoardsRegions
    },
  },
  watch: {
    tools2() {
      this.createTable()
    },
    showAllDates() {
      this.createTable()
    },
  },
  mounted() {
    this.createTable()
  },
  methods: {
    async createTable() {
      this.isShowSkeleton = true

      if (this.showAllDates) {
        this.min = 0
        this.datesF = this.dates
        this.isShowSkeleton = false
        return
      }

      let min = this.dates.length
      for (const tool of this.tools) {
        for (const jbr of this.currentJobBoardsRegions) {
          for (let i = 0; i < Object.values(tool.counts[jbr]).length; i++) {
            if (Object.values(tool.counts[jbr])[i] !== null) {
              min = Math.min(min, i)
              break
            }
          }
        }
      }
      this.min = min
      this.datesF = this.dates.slice(min)
      this.isShowSkeleton = false
    },
    getJobBoard(jbr) {
      const foundJbr = this.jobBoardsRegions.find(
        item => item.idJobBoardRegions === jbr
      )
      return `${foundJbr.jobBoard}-${foundJbr.region}`
    },
    sortTable(columnIndex) {
      const tbody = document.querySelector('.compare__tbody')
      const rows = [...tbody.querySelectorAll('.compare__table-tr')]
      rows.sort((a, b) => {
        let aValue = a.cells[columnIndex].textContent.trim()
        let bValue = b.cells[columnIndex].textContent.trim()
        aValue = Number.parseInt(aValue.replaceAll(/\s/g, ''), 10) || 0
        bValue = Number.parseInt(bValue.replaceAll(/\s/g, ''), 10) || 0
        return this.sortDirection * (aValue - bValue)
      })
      for (const row of rows) row.remove()
      for (const row of rows) tbody.append(row)
      this.sortDirection *= -1
    },
    normalizeString(string) {
      const date = new Date(string)
      const options = { month: '2-digit', day: '2-digit' }
      return date.toLocaleString('default', options)
    },
    getYear(string) {
      return new Date(string).getFullYear()
    },
  },
}
</script>

<style>
.table-settings-count__labels {
  margin-bottom: calc(var(--unit) * 2);
}
.compare__table-wrapper {
  max-width: 100%;
  overflow: auto;
  border: var(--border-width-small) solid var(--color-border);
  border-radius: var(--radius);
}
.compare__table {
  overflow: auto;
  border-collapse: collapse;
}
.compare__table-tool-date {
  font-size: var(--text-extra-small);
  cursor: pointer;
}
.compare__table-tr:nth-child(2n) {
  background: var(--color-transparent-bg);
}
.compare__table_td {
  padding: var(--unit) calc(var(--unit) * 2);
  text-align: center;
  vertical-align: middle;
}
.compare__table-tool-name {
  position: sticky;
  left: 0;
  z-index: var(--z-index-overlay);
  text-align: start;
  white-space: nowrap;
  background: var(--color-background);
}
.table-settings-close {
  display: none;
}
.table-settings-count[open] .table-settings-close {
  display: inline;
}
.table-settings-count[open] .table-settings-open {
  display: none;
}
.compare__table-tool-name::after {
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  width: 2px;
  height: 100%;
  content: '';
  background: rgba(75 165 228 / 15%);
}
.compare__table-count {
  transition: 1s;
}
.compare__table-count:hover {
  background: var(--color-border);
  transition: 0.1s;
}
@media (width < 768px) {
  .compare__table-tr {
    font-size: 16px;
  }
  .compare__table_td {
    padding: var(--unit);
  }
  .compare__table-tool-name {
    padding-right: calc(var(--unit) * 2);
  }
  .compare__table-tool-name-div {
    max-width: 150px;
    overflow-x: auto;
    white-space: nowrap;
  }
}
</style>
