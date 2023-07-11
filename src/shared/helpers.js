import { Chart } from 'chart.js'
import zoomPlugin from 'chartjs-plugin-zoom'

Chart.register(zoomPlugin)

function getLocale() {
  return navigator.languages && navigator.languages.length > 0
    ? navigator.languages[0]
    : navigator.language
}

const formatter = new Intl.DateTimeFormat(getLocale(), {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
})
export const formateDate = date => formatter.format(new Date(date))

export const createChart = (datasets, labels) => ({
  type: 'line',
  data: {
    labels,
    datasets,
  },
  stepped: true,
  options: {
    animation: { duration: 0 },
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: { radius: 0, hoverRadius: 15, hitRadius: 1000 },
      line: { tension: 0.4 },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          maxTicksLimit: 3,
          align: 'start',
          autoSkip: true,
          autoSkipPadding: true,
          maxRotation: 0,
          includeBounds: true,
        },
        border: { display: false },
      },
      y: {
        grid: { display: false },
        border: { display: false },
        // grace: '100%',
        ticks: { precision: 0, beginAtZero: true, min: 0 },
      },
    },
    plugins: {
      zoom: {
        limits: { x: { min: 0, minRange: 10 } },
        pan: { enabled: false, mode: 'x' },
        zoom: {
          wheel: { enabled: false },
          pinch: { enabled: false },
          mode: 'x',
        },
      },
      tooltip: {
        callbacks: {
          // beforeTitle: data => {},
          title: data => data.formattedValue,
          // label: data => {},
          footer: data => {},
        },
      },
    },
  },
})
