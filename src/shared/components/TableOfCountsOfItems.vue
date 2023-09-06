<template>
  <div class="compare__table-wrapper">
    <table class="compare__table">
      <tr>
        <td class="compare__table-tool-name"></td>
        <td
          v-for="(date, index) of dates"
          :key="date.idDate"
          class="compare__table-tool-date"
          @click="sortTable(index + 1)">
          {{ normalizeString(date.dateOfCompletion) }}
        </td>
      </tr>
      <tbody>
        <tr
          v-for="tool of compareTools"
          :key="tool.idTool"
          class="compare__table-tr">
          <td class="compare__table-tool-name">{{ tool.nameTool }}</td>
          <td
            v-for="count of tool.counts3"
            :key="tool.idTool + '' + count.dateOfCompletion"
            class="compare__table-count">
            {{ count.count_of_item }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<!-- fix6 -->
<script>
export default {
  props: {
    compareTools: { type: Array, default: () => [] },
    dates: { type: Array, default: () => [] },
  },
  data() {
    return {
      sortDirection: 1,
    }
  },
  methods: {
    sortTable(columnIndex) {
      const tbody = document.querySelector('tbody')
      const rows = [...tbody.querySelectorAll('tr')]
      rows.sort((a, b) => {
        let aValue = a.cells[columnIndex].textContent.trim()
        let bValue = b.cells[columnIndex].textContent.trim()
        aValue = Number.parseInt(aValue.replaceAll(/\s/g, ''), 10)
        bValue = Number.parseInt(bValue.replaceAll(/\s/g, ''), 10)
        return this.sortDirection * (aValue - bValue)
      })
      for (const row of rows) row.remove()
      for (const row of rows) tbody.append(row)
      this.sortDirection *= -1
    },
    normalizeString(string) {
      const collator = new Intl.DateTimeFormat({
        weekday: true,
        year: true,
        month: true,
        day: true,
      })
      return collator.format(new Date(string))
    },
  },
}
</script>

<style>
.compare__table-wrapper {
  max-width: 100%;
  margin-top: calc(var(--unit) * 2);
  overflow: auto;
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
  background: var(--color-border);
}
.compare__table td {
  padding: var(--unit) calc(var(--unit) * 2);
  text-align: center;
  vertical-align: middle;
}
.compare__table-tool-name {
  position: sticky;
  left: 0;
  background: var(--color-background);
}
.compare__table-tr:nth-child(2n) .compare__table-tool-name {
  background: var(--color-border) !important;
}
.compare__table-count:hover {
  background: var(--color-link);
}
</style>
