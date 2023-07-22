<template>
  <v-section padded responsive>
    <div class="dashboards-wrapper">
      <section class="dashboard dashboard--dark profits-chart">
        <h3 class="h3"><b>Profits Chart</b></h3>
        <div class="dashboard__chart"><line-chart :colors="lineChartColors" :data="profits" /></div>
        <div class="profits-chart__meta">
          <div>Estimated profit in the past 3 days:</div><div>57%</div>
          <div>Projected bank within a month:</div><div>75 USD</div>
          <div>Estimated profit in the past 2 weeks:</div><div>170%</div>
          <div>Projected bank within a year:</div><div>9 280 USD</div>
        </div>
      </section>
      <section class="dashboard">
        <h3 class="h3"><b>Profit by odds</b></h3>
        <div class="dashboard__chart"><bar-chart :colors="barChartsColors" :data="odds" /></div>
      </section>
      <section class="dashboard">
        <h3 class="h3"><b>Detailed stats</b> (past 30 days)</h3>
        <div class="stats-table">
          <table cellpadding="0" cellspacing="0">
            <tr>
              <th></th>
              <th>Scenario</th>
              <th colspan="2">Winrate</th>
              <th colspan="2">RD</th>
              <th colspan="2">BAmC</th>
            </tr>
            <tr
              v-for="(row, rowIdx) in stats.data"
              :key="`row_${ rowIdx }`"
            >
              <template
                v-for="column in stats.columns" 
                :key="`row_${ rowIdx }_${ column.id }`"
              >
                <template v-if="column.spans > 1">
                  <td
                    v-for="(value, idx) in (new Array(column.spans))"
                    :key="`row_${ rowIdx }_${ column.id }${ idx+1 }`"
                    :class="{ 'stats-table__cell--bleak': row[`${ column.id }${ idx+1 }`].unimportant }"
                  >
                    {{ row[`${ column.id }${ idx+1 }`].value }}
                  </td>
                </template>
                <td 
                  v-else-if="column.id === 'is_favorite'"
                  :class="{ 'stats-table__cell--favorite': row[column.id], 'stats-table__cell--opponent': !row[column.id] }"
                >
                </td>
                <td v-else>
                  {{ row[column.id] }}
                </td>
              </template>
            </tr>
          </table>
        </div>
      </section>
      <section class="dashboard upsets-section">
        <h3 class="h3"><b>Upsets</b></h3>
        <div class="upsets-stat">
          <h4 class="upsets-stat__header h4">Worst coeff loser</h4>
          <span class="upsets-stat__meta">12-04-2023 | Map 1</span>
          <div class="upsets-stat__teams">
            <span>Spirit Academy</span>
            <span>vs.</span>
            <span>Copenhagen Flames</span>
          </div>
          <div class="upsets-stat__coeff">
            <span>1.25</span>
          </div>
        </div>
        <div class="upsets-stat">
          <h4 class="upsets-stat__header h4">Worst result on a map</h4>
          <span class="upsets-stat__meta">12-04-2023 | Map 1</span>
          <div class="upsets-stat__teams">
            <span>Spirit Academy</span>
            <span>vs.</span>
            <span>Copenhagen Flames</span>
          </div>
          <div class="upsets-stat__coeff">
            <span>1.25</span>
          </div>
        </div>
      </section>
    </div>
  </v-section>
</template>

<script>
import LineChart from '@/components/charts/LineChart.vue';
import BarChart from '@/components/charts/BarChart.vue';
import { BRIGHT_COLORS, DARK_COLORS } from '@/components/charts/chartConfig';

export default {
  name: 'DashboardsRoot',
  components: {
    LineChart,
    BarChart,
  },
  props: {
    profits: Object,
    odds: Object,
    stats: Object,
    upsets: Object,
  },
  data() {
    return {
      lineChartColors: DARK_COLORS,
      barChartsColors: BRIGHT_COLORS,
    };
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Dashboards/dashboards.scss';
</style>