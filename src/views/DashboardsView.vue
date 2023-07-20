<template>
  <dashboards-root v-bind="{ profits, odds, stats, upsets }" />
</template>

<script>
import { apiRequestGet } from '@/lib/api';
import DashboardsRoot from '@/components/Dashboards/DashboardsRoot';

export default {
  name: 'DashboardsView',
  components: {
    DashboardsRoot
  },
  async beforeRouteEnter(to, from, next) {
    const [profits, odds, stats, upsets] = await Promise.all([
        apiRequestGet('dashboards/profits'), 
        apiRequestGet('dashboards/odds-intervals'),
        apiRequestGet('dashboards/stats'),
        apiRequestGet('dashboards/upsets'),
      ]);
    next(vm => {
      vm.profits = profits;
      vm.odds = odds;
      vm.stats = stats;
      vm.upsets = upsets;
    });
  },
  data() {
    return {
      profits: {},
      odds: {},
      stats: {},
      upsets: {},
    };
  },
}
</script>
