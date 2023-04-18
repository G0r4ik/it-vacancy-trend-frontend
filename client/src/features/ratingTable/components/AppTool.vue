<template>
  <div class="background-modal" @click.self="$emit('closeModal')">
    <div class="technology-comparison">
      <div class="technology-comparison__inner">
        <div
          class="technology-comparison__cross"
          @click.stop="$emit('closeModal')">
          &#9587;
        </div>
        <input id="" type="text" name="" class="input" />
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
    tools: { type: Object, default: Object },
    currentTool: { type: Object, default: Object },
    dates: { type: Object, default: Object },
  },
  emits: ['closeModal'],

  data() {
    return {
      selectedTools: [],
    }
  },

  mounted() {
    document.addEventListener('keydown', this.addCloseFunction)
    let maxValue = Math.max(
      Object.values(this.currentTool.counts).map(item => item.countHeadHunter)
    )
    const countsHeadHunter = []
    const countsIndeed = []
    for (const count in this.currentTool.counts) {
      if (Object.hasOwn(this.currentTool.counts, count)) {
        countsHeadHunter.push(this.currentTool.counts[count].countHeadHunter)
        countsIndeed.push(this.currentTool.counts[count].countIndeed)
      }
    }
    maxValue =
      Math.round(maxValue / Math.ceil(10 ** (String(maxValue).length - 2))) *
        10 ** (String(maxValue).length - 2) +
      10 ** (String(maxValue).length - 1)
    this.createChart(countsHeadHunter, maxValue, countsIndeed)
  },

  unmounted() {
    document.removeEventListener('keydown', this.addCloseFunction)
  },

  methods: {
    createChart(countsHeadHunter, maxValue, countsIndeed) {
      const context = document.querySelector('#myChart').getContext('2d')
      new Chart(context, {
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
    addCloseFunction(event) {
      if (event.key === 'Escape') {
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
  z-index: 150000;
  width: 100vw;
  height: 100vh;
  background: rgb(0 0 0 / 0.9);
}
.technology-comparison {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(-50%, -50%);
}
.technology-comparison__inner {
  position: relative;
  max-width: var(--width-compare-tools);
  max-height: var(--height-compare-tools);
  padding: var(--unit);
}
.technology-comparison__cross {
  position: absolute;
  top: calc(var(--unit) * 2);
  right: calc(var(--unit) * 2);
  cursor: pointer;
}
</style>
