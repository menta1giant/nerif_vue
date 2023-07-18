<template>
  <v-section span padded responsive>
    <div class="dashboards-wrapper">
      <div class="dashboard"><line-chart :colors="lineChartColors" /></div>
      <div class="dashboard"><bar-chart :colors="barChartsColors" /></div>
      <div class="dashboard"></div>
      <div class="dashboard"></div>
    </div>
  </v-section>
</template>

<script>
import LineChart from '@/components/LineChart.vue';
import BarChart from '@/components/BarChart.vue';
import { BRIGHT_COLORS, DARK_COLORS } from '@/lib/chart';

export default {
  name: 'DashboardsRoot',
  components: {
    LineChart,
    BarChart,
  },
  data() {
    return {
      lineChartColors: DARK_COLORS,
      barChartsColors: BRIGHT_COLORS,
    };
  }
}
</script>

<style lang="scss" scoped>
.dashboards-wrapper {
  width: 100%;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 2rem;
}

.dashboard {
  max-width: 100%;
  width: 50%;
  box-shadow: 0 4px 4px 0 rgba($primary-ds-900, .1);
  border-radius: $border-radius-large;

  &:nth-child(1) {
    background: $primary-ds-600;
    height: 500px;
  }
  &:nth-child(2) {
    background: white;
    height: 500px;
  }
  &:nth-child(3) {
    background: green;
    height: 200px;
  }
  &:nth-child(4) {
    background: blue;
    height: 800px;
  }
}
</style>