<template>
  <div class="background-modal" @click.self="$emit('closeModal')">
    <div class="technology-comparison">
      <div class="technology-comparison__inner">
        <div
          class="technology-comparison__cross"
          @click.stop="$emit('closeModal')"
        >
          &#9587;
        </div>
        <input type="text" name="" id="" class="input" />
        <div class="selected-tool">
          <div class="selected-tool__item"></div>
        </div>
        <canvas id="myChart" width="800" height="300"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
  props: {
    tools: Object,
    currentTool: Object,
    dates: Object,
  },

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
    const countsHeadHunter = []
    const countsIndeed = []
    for (const count in this.currentTool.counts) {
      if (Object.hasOwnProperty.call(this.currentTool.counts, count)) {
        countsHeadHunter.push(this.currentTool.counts[count].countHeadHunter)
        countsIndeed.push(this.currentTool.counts[count].countIndeed)
      }
    }
    maxValue =
      Math.round(
        maxValue / Math.ceil(Math.pow(10, String(maxValue).length - 2))
      ) *
        Math.pow(10, String(maxValue).length - 2) +
      Math.pow(10, String(maxValue).length - 1)
    const ctx = document.getElementById('myChart').getContext('2d')
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.dates.map(date => date.date_of_completion),
        datasets: [
          {
            label: 'HHru',
            data: countsHeadHunter,
            borderColor: ['rgba(255, 99, 132, 1)'],
            borderWidth: 10,
          },
          {
            label: 'Indeed',
            data: countsIndeed,
            borderColor: ['rgba(54, 162, 235, 1)'],
            borderWidth: 10,
          },
        ],
      },
      stepped: true,
      options: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            // beginAtZero: true,
            min: 0,
            // max: Math.floor((maxValue + (maxValue / 5)).toFixed(1)),
            max: maxValue,
          },
        },
        elements: {
          line: {
            tension: 0.5,
          },
        },
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
  },
}
</script>

<style>
#myChart {
}
.background-modal {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgb(0 0 0 / 0.9);
  z-index: 150000;
}
.technology-comparison {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.technology-comparison__inner {
  position: relative;
  max-width: 800px;
  max-height: 500px;
  padding: var(--padding-large);
}
.technology-comparison__cross {
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>
