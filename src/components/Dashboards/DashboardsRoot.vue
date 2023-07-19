<template>
  <v-section padded responsive>
    <div class="dashboards-wrapper">
      <section class="dashboard dashboard--dark profits-chart">
        <h3><b>Profits Chart</b></h3>
        <div class="dashboard__chart"><line-chart :colors="lineChartColors" /></div>
        <div class="profits-chart__meta">
          <div>Estimated profit in the past 3 days:</div><div>57%</div>
          <div>Projected bank within a month:</div><div>75 USD</div>
          <div>Estimated profit in the past 2 weeks:</div><div>170%</div>
          <div>Projected bank within a year:</div><div>9 280 USD</div>
        </div>
      </section>
      <section class="dashboard">
        <h3><b>Profit by odds</b></h3>
        <div class="dashboard__chart"><bar-chart :colors="barChartsColors" /></div>
      </section>
      <section class="dashboard">
        <h3><b>Detailed stats</b> (past 30 days)</h3>
        <div class="stats-table">
          <table cellpadding="0" cellspacing="0">
            <tr>
              <th></th>
              <th>Pref</th>
              <th colspan="2">Winrate</th>
              <th colspan="2">RD</th>
              <th colspan="2">BAmC</th>
            </tr>
            <tr>
              <td class="stats-table__cell--favorite"></td>
              <td><span>1st map,</span><br/><span>Favorite pick</span></td>
              <td>0.34333</td>
              <td>0.34</td>
              <td>0.34</td>
              <td>0.3777</td>
              <td>0.34</td>
              <td>0.34</td>
            </tr>
            <tr>
              <td class="stats-table__cell--opponent"></td>
              <td>1st map,<br/>Favorite pick</td>
              <td class="stats-table__cell--bleak">0.34</td>
              <td>0.34</td>
              <td>0.34</td>
              <td>0.34</td>
              <td>0.34</td>
              <td>0.34</td>
            </tr>
            <tr>
              <td class="stats-table__cell--favorite"></td>
              <td><span>1st map,</span><br/><span>Favorite pick</span></td>
              <td>0.34333</td>
              <td>0.34</td>
              <td>0.34</td>
              <td>0.3777</td>
              <td>0.34</td>
              <td>0.34</td>
            </tr>
            <tr>
              <td class="stats-table__cell--favorite"></td>
              <td><span>1st map,</span><br/><span>Favorite pick</span></td>
              <td>0.34333</td>
              <td>0.34</td>
              <td>0.34</td>
              <td>0.3777</td>
              <td>0.34</td>
              <td>0.34</td>
            </tr>
            <tr>
              <td class="stats-table__cell--favorite"></td>
              <td><span>1st map,</span><br/><span>Favorite pick</span></td>
              <td>0.34333</td>
              <td>0.34</td>
              <td>0.34</td>
              <td>0.3777</td>
              <td>0.34</td>
              <td>0.34</td>
            </tr>
            <tr>
              <td class="stats-table__cell--favorite"></td>
              <td><span>1st map,</span><br/><span>Favorite pick</span></td>
              <td>0.34333</td>
              <td>0.34</td>
              <td>0.34</td>
              <td>0.3777</td>
              <td>0.34</td>
              <td>0.34</td>
            </tr>
          </table>
        </div>
      </section>
      <section class="dashboard upsets-section">
        <h3><b>Upsets</b></h3>
        <div class="upsets-stat">
          <h4 class="upsets-stat__header">Worst coeff loser</h4>
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
          <h4 class="upsets-stat__header">Worst result on a map</h4>
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
import LineChart from '@/components/LineChart.vue';
import BarChart from '@/components/BarChart.vue';
import { BRIGHT_COLORS, DARK_COLORS } from '@/components/chartConfig';
import { apiRequestGet } from '@/lib/api';

export default {
  name: 'DashboardsRoot',
  components: {
    LineChart,
    BarChart,
  },
  async created() {
    await this.fetchDashboardsData();
  },
  data() {
    return {
      lineChartColors: DARK_COLORS,
      barChartsColors: BRIGHT_COLORS,

      profits: [],
      odds: [],
      stats: [],
      upsets: [],
    };
  },
  methods: {
    async fetchDashboardsData() {
      [this.profits, this.odds, this.stats, this.upsets] = await Promise.all([
        apiRequestGet('dashboards/profits'), 
        apiRequestGet('dashboards/odds-intervals'),
        apiRequestGet('dashboards/stats'),
        apiRequestGet('dashboards/upsets'),
      ]);

    }
  }
}
</script>

<style lang="scss" scoped>
.dashboards-wrapper {
  width: 100%;
  height: 85vh;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 2rem;

  @media screen and (max-width: $laptop-breakpoint) {
    height: unset;
  }
}

.dashboard {
  width: calc(50% - 1rem);
  box-shadow: 0 4px 4px 0 rgba($primary-ds-900, .1);
  border-radius: $border-radius-large;
  padding: 1.5rem;
  background: white;

  &__chart {
    height: 400px;
  }

  h3 {
    font-size: $fs-h4;
    line-height: $lh-h4;
    font-weight: $fw-regular;
  }

  &--dark {
    color: $black-10;
  }

  &:nth-child(1) {
    background: $primary-ds-600;
  }
  
  &:nth-child(2) {
    padding-right: 3.5rem;
  }

  @media screen and (max-width: $laptop-breakpoint) {
    width: 100%;
  }
}

.profits-chart {
  &__meta {
    display: grid;
    column-gap: .25rem;
    grid-template-columns: repeat(4, auto);

    font-size: $fs-xs;
    line-height: $lh-small;
    font-weight: $fw-medium;
    
    div {
      padding-block: .25rem;

      &:nth-child(2n) {
        color: $accent-500;
        margin-right: .75rem;
        padding-right: .5rem;

        font-weight: $fw-semi-bold;
      }

      &:nth-child(4n-2) {
        border-right: 1px solid $primary-ds-500;
      }
    }
  }
}
.stats-table {
  padding-block: 1.25rem;
  color: $primary-ds-700;

  overflow-x: auto;

  table {
    td, th {
      padding: .5rem;

      background: white;
    }

    th {
      font-weight: $fw-semi-bold;
      color: $primary-s-700;
    }

    td {
      font-weight: $fw-medium;
      vertical-align: top;
      position: relative;
    }

    :where(td, th):not(:nth-child(n+3)) {
      position: sticky;
      left: 0px;
      z-index: 1000;
    }

    td:nth-child(2) {
      font-size: $fs-xxs;
      line-height: 1rem;
    }
    
    td:nth-child(2n+4) {
      text-align: right;
      border-left: 1px solid $primary-ds-100;
    }

    td:not(:nth-child(2n+3)) {
      padding-right: 1.5rem;
    }
  }

  &__cell {
    &--bleak {
      color: $primary-ds-300;
    }

    &--favorite::after, &--opponent::after {
      display: block;

      border-radius: 50%;
      width: 24px;
      height: 24px;

      color: $primary-ds-900;
      text-align: center;
      font-size: $fs-xxs;
      font-weight: $fw-medium;
    }

    &--favorite:after {
      content: 'F';
      background: $green-100;
    }

    &--opponent:after {
      content: 'O';
      background: $red-100;
    }
  }
}

.upsets-section {
  display: flex;
  flex-direction: column;
  
  .upsets-stat {
    display: grid;
    grid-auto-flow: column;
    padding-block: .75rem;

    &:first-of-type {
      @include divider-bottom-bleak;

      margin-top: .75rem;
    }

    &__header {
      font-size: $fs-large;
      font-weight: $fw-medium;
      color: $primary-s-700;

      padding-bottom: .75rem;
    }

    &__meta {
      color: $primary-s-100;
      font-size: $fs-xxs;
      line-height: $lh-small;
    }

    &__teams {
      display: flex;
      gap: .25rem;

      color: $primary-s-500;
      font-weight: $fw-semi-bold;

      span:nth-child(2) {
        color: $primary-s-200;
      }
    }

    &__coeff {
      grid-row: 2/4;
      color: $accent-900;
      font-weight: $fw-bold;

      display: flex;
      align-items: flex-end;
      width: 100%;
      justify-content: flex-end;
    }
  }
}
</style>