<template>
  <div class="background-modal">
    <div class="technology-comparison">
      <div class="technology-comparison__innner">
        <input type="text" name="" id="" />
        <div class="selected-tool">
          <div class="selected-tool__item">{{ selectedTools }}</div>
        </div>
        <canvas id="myChart" width="800" height="300"></canvas>
      </div>
    </div>
  </div>
</template>
<script>
import Chart from 'chart.js/auto';

export default {
  props: {
    tools: Object,
    currentTool: Object,
    dates: Object,
  },
  mounted() {
    const countsHeadHunter = [];
    const countsIndeed = [];
    for (const count in this.currentTool.counts) {
      if (Object.hasOwnProperty.call(this.currentTool.counts, count)) {
        countsHeadHunter.push(this.currentTool.counts[count].countHeadHunter);
        countsIndeed.push(this.currentTool.counts[count].countIndeed);
      }
    }
    console.log(countsIndeed);
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.dates.map((date) => date.date_of_completion),
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

      options: {
        responsive: true,
        elements: {
          line: {
            tension: 0.5,
          },
        },
      },
    });
  },
  data() {
    return {
      selectedTools: [],
    };
  },
};
</script>
