<template>
  <div class="filters-list">
    <v-switcher-field v-for="(filter) in FILTERS" v-bind:key="filter.id" :label="filter.title" :value="filter.default" />
  </div>
</template>

<script>
import { filters } from './const';

export default {
  name: "MatchesFilters",
  data() {
    return {
      FILTERS: filters,
    };
  },
}
</script>

<style lang="scss" scoped>
.filters-list {
  width: 100%;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20ch, 1fr));
  grid-column-gap: .75rem;
}
</style>