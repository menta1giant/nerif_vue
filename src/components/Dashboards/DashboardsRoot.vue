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
import LineChart from '@/components/LineChart.vue';
import BarChart from '@/components/BarChart.vue';
import { BRIGHT_COLORS, DARK_COLORS } from '@/components/chartConfig';

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
.dashboards-wrapper {
  @include flex-column;

  width: 100%;
  min-height: 72rem;
  max-height: 85vh;

  flex-wrap: wrap;
  gap: 2rem;

  @media screen and (max-width: $laptop-breakpoint) {
    flex-wrap: nowrap;
    height: unset;
    min-height: unset;
    max-height: unset;
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

      white-space: pre-wrap;
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
      font-weight: $fw-semi-bold;
      line-height: 24px;
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
  @include flex-column;
  
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