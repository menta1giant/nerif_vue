<template>
  <Line :data="data" :options="options" />
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
    }
  },
  data() {
    return {
      data: getData({ colors: this.colors }),
      options: getOptions({ colors: this.colors }),
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-container {
  width: 600px; 
  margin: 0 auto;
}

canvas {
  background-color: v-bind(backgroundColor);
  margin: -.25rem -2rem;
}
</style>