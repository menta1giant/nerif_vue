<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { getData, getOptions } from './lineChartConfig.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default {
  name: 'App',
  components: {
    Line
  },
  props: {
    colors: Object,
    backgroundColor: {
      type: String,
      default: 'transparent',
    },
    data: Object,
  },
  data() {
    return {
      chartData: {},
      chartOptions: getOptions({ colors: this.colors }),
    }
  },
  watch: {
    data: {
      immediate: true,
      handler(data) {
        this.chartData = getData({ data: data.data, labels: data.labels, colors: this.colors });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/charts.scss';
</style>