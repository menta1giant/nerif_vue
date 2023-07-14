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
    }
  }
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