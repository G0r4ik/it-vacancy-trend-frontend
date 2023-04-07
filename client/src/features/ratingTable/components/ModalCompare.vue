<template>
  <div class="technology-comparison">
    <h5 class="technology-comparison__name-tool">
      {{ currentTool.name_tool }}
    </h5>
    <div class="technology-comparison__chart">
      <canvas id="myChart" width="800" height="300"></canvas>
    </div>
    <button
      class="technology-comparison__button"
      @click="goToCompare(currentTool)">
      compare with other technologies
    </button>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
  props: {
    tools: { type: Array, default: () => [] },
    currentTool: { type: Object, default: Object },
    dates: { type: Array, default: () => [] },
  },
  emits: ['closeModal'],

  data() {
    return {
      selectedTools: [],
    }
  },

  mounted() {
    document.addEventListener('keydown', this.addCloseFunction)
    const maxValue = Math.max(
      Object.values(this.currentTool.counts).map(item => item.countHeadHunter)
    )
    // for (const count in this.currentTool.counts) {
    //   // if (Object.hasOwnProperty.call(this.currentTool.counts, count)) {
    //   //   countsHeadHunter.push(this.currentTool.counts[count].countHeadHunter)
    //   //   countsIndeed.push(this.currentTool.counts[count].countIndeed)
    //   // }
    // }
    // maxValue =
    //   Math.round(maxValue / Math.ceil(10 ** (String(maxValue).length - 2))) *
    //     10 ** (String(maxValue).length - 2) +
    //   10 ** (String(maxValue).length - 1)
    this.createChar(maxValue)
  },

  unmounted() {
    document.removeEventListener('keydown', this.addCloseFunction)
  },

  methods: {
    createChar() {
      const context = document.querySelector('#myChart').getContext('2d')
      new Chart(context, {
        type: 'line',
        data: {
          labels: this.dates.map(date => {
            const date2 = new Date(date.date_of_completion)
            const day = String(date2.getDate()).padStart(2, '0')
            const month = String(date2.getMonth() + 1).padStart(2, '0')
            const year = String(date2.getFullYear()).padStart(2, '0')
            return `${year}-${month}-${day}`
          }),
          datasets: [
            {
              label: 'HHru',
              data: Object.values(this.currentTool.counts.HeadHunter),
              borderColor: ['rgba(255, 99, 132, 1)'],
              fill: false,
              // tension: 0.1,
            },
            // {
            //   label: 'Indeed',
            //   data: countsIndeed,
            //   borderColor: ['rgba(54, 162, 235, 1)'],
            //   borderWidth: 10,
            // },
          ],
        },
        stepped: true,
        options: {
          responsive: true,
          elements: { point: { radius: 0, hoverRadius: 10, hitRadius: 50 } },
          scales: {
            x: {
              beginAtZero: true,
              grid: { display: false },
              ticks: { display: false },
            },
            y: {
              grid: { display: false },
              grace: '100%',
              // ticks: { stepSize: 1 },
              // beginAtZero: true,
              // min: 0,
              // max: Math.floor((maxValue + (maxValue / 5)).toFixed(1)),
              // max: maxValue,
            },
          },
          // elements: {
          //   line: {
          //     // tension: 0.5,
          // },
          // },
        },
      })
    },
    addCloseFunction(event) {
      if (event.key === 'Escape') {
        this.$emit('closeModal')
      }
    },
    goToCompare(currentTool) {
      this.$emit('closeModal', currentTool)
      // this.emitter.emit('changePage', 'compare')
    },
  },
}
</script>

<style>
.technology-comparison {
  width: 800px;
  padding: 50px;
  background-color: var(--color-background);
}
.technology-comparison__name-tool {
  margin-bottom: var(--unit);
  font-size: var(--text-extra-large);
}
.technology-comparison__chart {
  margin-bottom: var(--unit);
}
#myChart {
  width: 100%;
  background: var(--color-text);
}
.technology-comparison__button {
  padding: var(--unit) var(--unit);
  margin-left: auto;
  font-size: var(--text-extra-small);
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-extra-small);
}
</style>
