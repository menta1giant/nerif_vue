<template>
  <v-input placeholder="Search..." type="search" :value="$route.query.search" fluid :disabled="true" @input="handleInput" />
</template>

<script>
import debounce from '@/lib/debounce';

export default {
  name: 'SearchInput',
  methods: {
    handleInput: debounce(function(event) {
      this.$router.push({ path: '/documentation', query: { search: event.target.value } });
    }, 300)
  }
}
</script>

<style lang="scss" scoped>
.v-input {
  flex: 1;
  max-width: 16rem;
}
</style>