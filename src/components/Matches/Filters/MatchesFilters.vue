<template>
  <div class="filters-list">
    <form-field v-for="(filter) in FILTERS" v-bind:key="filter.id" type="switcher" :label="filter.title" :value="filter.default" />
  </div>
</template>

<script>
import { filters } from './const';
import FormField from '@/components/FormField';

export default {
  name: "MatchesFilters",
  components: {
    FormField
  },
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
  gap: .75rem;
}
</style>