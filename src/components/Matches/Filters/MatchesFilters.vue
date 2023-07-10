<template>
  <div class="filters-list">
    <form-field v-for="(filter, idx) in filters" v-bind:key="filter.id" type="switcher" :label="filter.title" :value="filter.value" @input="toggleFilter(idx)" />
  </div>
</template>

<script>
import FormField from '@/components/FormField';

export default {
  name: "MatchesFilters",
  components: {
    FormField
  },
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