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
      @click="goToCompare(currentTool)"
    >
      compare with other technologies
    </button>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
  props: {
    tools: Array,
    currentTool: Object,
    dates: Array,
  },
emits: ['closeModal'],

  data() {
    return {
      selectedTools: [],
    }
  },

  mounted() {
    document.addEventListener('keydown', this.addCloseFunction)

    let maxValue = Object.values(this.currentTool.counts).reduce(
      (prev, current) => {
        return Math.max(prev, current.countIndeed, current.countHeadHunter)
      },
      0
    )

    for (const count in this.currentTool.counts) {
      // if (Object.hasOwnProperty.call(this.currentTool.counts, count)) {
      //   countsHeadHunter.push(this.currentTool.counts[count].countHeadHunter)
      //   countsIndeed.push(this.currentTool.counts[count].countIndeed)
      // }
    }
    console.log(Object.values(this.tools[0].counts.HeadHunter))
    maxValue =
      Math.round(
        maxValue / Math.ceil(Math.pow(10, String(maxValue).length - 2))
      ) *
        Math.pow(10, String(maxValue).length - 2) +
      Math.pow(10, String(maxValue).length - 1)
    console.log(this.dates)
    const ctx = document.getElementById('myChart').getContext('2d')
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.dates.map(date => {
          const _date = new Date(date.date_of_completion)
          const day = String(_date.getDate()).padStart(2, '0')
          const month = String(_date.getMonth() + 1).padStart(2, '0')
          const year = String(_date.getFullYear()).padStart(2, '0')
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

  unmounted() {
    document.removeEventListener('keydown', this.addCloseFunction)
  },

  methods: {
    addCloseFunction(e) {
      if (e.key === 'Escape') {
        this.$emit('closeModal')
      }
    },
    goToCompare(currentTool) {
      this.$emit('closeModal')
      // this.emitter.emit('changePage', 'compare')
    },
  },
}
</script>

<style>
.technology-comparison {
  background-color: var(--color-background);
  width: 800px;
  padding: 50px;
}
.technology-comparison__name-tool {
  font-size: var(--text-extra-large);
  margin-bottom: var(--margin-small);
}
.technology-comparison__chart {
  margin-bottom: var(--margin-small);
}
#myChart {
  background: var(--color-text);
  width: 100%;
}
.technology-comparison__button {
  font-size: var(--text-extra-small);
  margin-left: auto;
  background: transparent;
  padding: var(--padding-extra-small) var(--padding-small);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-extra-small);
}
</style>
