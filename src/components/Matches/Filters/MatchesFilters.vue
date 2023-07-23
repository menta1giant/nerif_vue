<template>
  <div class="filters-list">
    <v-form-field v-for="(filter, idx) in filters" :key="filter.id" type="switcher" :label="filter.title" :value="filter.value" @toggle="toggleFilter(idx)" />
  </div>
</template>

<script>
export default {
  name: "MatchesFilters",
  computed: {
    filters() {
      return this.$store.getters.getMatchesFilters;
    },
  },
  methods: {
    toggleFilter(idx) {
      this.$store.commit('toggleMatchesFilter', idx);
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Matches/Filters/matches-filters.scss';
</style>