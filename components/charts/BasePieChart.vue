<template>
  <div>
    <pie-chart :chart-data="data" :options="options"></pie-chart>
    <!-- <chc-empty-list-message
      v-else
      message="Keine Daten verfügbar"
    ></chc-empty-list-message> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import PieChart from './PieChart.js'

export default defineComponent({
  name: 'BasePieChart',
  components: {
    PieChart,
  },
  props: {
    data: {
      type: Object,
      default: null,
    },
    // options: {
    //   type: Object,
    //   default: () => ,
    // },
  },
  emits: ['dataClick'],
  setup(_, { emit }) {
    const options = ref({
      responsive: true,
      maintainAspectRatio: true,
      height: 200,
      circumference: 3.13,
      rotation: -3.12,
      plugins: {
        legend: false,
        title: {
          display: true,
          text: 'Chart.js Pie Chart',
        },
      },
      onClick(_: any, element: any) {
        emit('dataClick', element[0]._index)
      },
    })
    return { options }
  },
})
</script>

<style lang="postcss">
/* .chartjs-size-monitor {
  @apply relative h-48;
} */
</style>
