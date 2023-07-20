<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script>
import { Bar } from 'vue-chartjs';
import { getData, getOptions } from './barChartConfig.js';

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
.chart-container {
  width: 600px; 
  margin: 0 auto;
}

canvas {
  background-color: v-bind(backgroundColor);
  margin: -0.25rem -2rem;
}
</style>