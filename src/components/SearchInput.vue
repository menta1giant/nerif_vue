<template>
  <v-input placeholder="Search..." type="search" :value="$route.query.search" fluid :disabled="isGlobalLoading" @change="handleInput" />
</template>

<script>
import debounce from '@/lib/debounce';
import loadingMixin from './loadingMixin.js';

export default {
  name: 'SearchInput',
  mixins: [loadingMixin],
  methods: {
    handleInput: debounce(function(event) {
      const inputValue = event.target.value;
      let route = { path: this.$route.path };
      if (inputValue) route.query = { search: event.target.value };

      this.$router.push(route);
    }, 100)
  }
}
</script>

<style lang="scss" scoped>
.v-input {
  flex: 1;
  max-width: 16rem;
}
</style>