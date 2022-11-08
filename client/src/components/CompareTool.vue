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
        <div class="technology-comparison__tools"></div>
        <div class="technology-comparison__search">
          <input
            type="search"
            class="input technology-comparison__search-input"
            placeholder="Введите технологию"
            @input="$emit('changeSearch', $event)"
          />
        </div>
        <div class="technology-comparison__chart">
          <canvas id="myChart" width="800" height="300"></canvas>
        </div>
      </div>
    </div>
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
  methods: {
    addCloseFunction(e) {
      if (e.key === 'Escape') {
        this.$emit('closeModal')
      }
    },
  },
  unmounted() {
    document.removeEventListener('keydown', this.addCloseFunction)
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
            tension: 0.1,
          },
          // {
          //   label: 'Indeed',
          //   data: countsIndeed,
          //   borderColor: ['rgba(54, 162, 235, 1)'],
          //   borderWidth: 10,
          // },
        ],
      },
      // stepped: true,
      // options: {
      //   responsive: true,
      //   scales: {
      //     x: {
      //       beginAtZero: true,
      //     },
      //     y: {
      //       // beginAtZero: true,
      //       min: 0,
      //       // max: Math.floor((maxValue + (maxValue / 5)).toFixed(1)),
      //       // max: maxValue,
      //     },
      //   },
      //   elements: {
      //     line: {
      //       // tension: 0.5,
      //     },
      //   },
      // },
    })
  },
  data() {
    return {
      selectedTools: [],
    }
  },
}
</script>

<style>
.background-modal {
}
.technology-comparison {
}
.technology-comparison__inner {
  background-color: var(--color-background);
}
.technology-comparison__cross {
}
.technology-comparison__tools {
}
.technology-comparison__search {
}
.technology-comparison__search__search-input {
  width: 100%;
  border: 2px solid var(--color-border);
  background-color: var(--color-background);
  line-height: 2;
  padding: 0 var(--padding-small);
  margin-top: var(--margin-small);
  border-radius: var(--border-radius-extra-small);
  color: var(--color-text);
  font-size: var(--text-small);
  transition: all 0.25s;
  margin-bottom: var(--margin-small);
}
.technology-comparison__chart {
}
#myChart {
  background: var(--color-text);
  width: 100%;
}
.background-modal {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: var(--color-modal-bg);
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
  width: 800px;
  /* max-height: 500px; */
  padding: 50px;
}
.technology-comparison__cross {
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>
