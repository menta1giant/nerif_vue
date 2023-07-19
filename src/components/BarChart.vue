<template>
  <Bar :data="data" :options="options" />
</template>

<script>
import { Bar } from 'vue-chartjs';
import { generateData, generateLabels } from './chartConfig';
import { getData, getOptions } from './barChartConfig.js';
const a = generateData().slice(0,6);
const b = generateLabels().slice(0,6);

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
      data: getData({ data: a, labels: b, colors: this.colors }),
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
  margin: -0.25rem -2rem;
}
</style>