<template>
  <div class="filters-list">
    <nrf-switcher-field v-for="(a) in Array(12)" v-bind:key="a" label="Ча ча чаачачачач" />
  </div>
</template>

<script>
export default {
  name: "MatchesFilters",
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