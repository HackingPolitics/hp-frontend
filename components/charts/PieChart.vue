<template>
  <div>
    <pie-chart v-if="data" :chart-data="data" :options="options"></pie-chart>
    <!-- <chc-empty-list-message
      v-else
      message="Keine Daten verfügbar"
    ></chc-empty-list-message> -->
  </div>
</template>

<script>
import PieChart from './PieChart.js'

export default {
  components: {
    PieChart,
  },
  props: {
    data: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default: () => {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Pie Chart'
      }

  }},
    },
  },
}
</script>
