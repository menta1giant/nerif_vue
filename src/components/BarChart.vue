<template>
  <Bar :data="data" :options="options" />
</template>

<script>
import { Bar } from 'vue-chartjs'
import * as lineChartConfig from './lineChartConfig.js'

import {
  Chart,
  Title,
  Tooltip,
  Legend,
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
} from "chart.js";

Chart.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  BarController,
  CategoryScale,
  LinearScale
);

export default {
  name: 'App',
  components: {
    Bar,
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
      data: lineChartConfig.getData({ colors: this.colors }),
      options: lineChartConfig.getOptions({ colors: this.colors }),
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
}
</style>