<template>
  <div class="v-select__dropdown">
    <select-option v-for="(option, idx) in options" v-bind:key="idx" :option="option" @select="handleSelectOption(idx)">{{ option.value }}</select-option>
  </div>
</template>

<script>
import SelectOption from './SelectOption';

export default {
  name: 'SelectDropdown',
  components: {
    SelectOption,
  },
  props: {
    options: Array,
  },
  methods: {
    handleSelectOption(id) {
      this.$emit('select', id);
    },
  },
}
</script>

<style lang="scss" scoped>
.v-select__dropdown {
  border: 1px solid $primary-ds-100;
  border-radius: $border-radius-small;
  background: $black-10;
  padding: .5rem;

  display: flex;
  flex-direction: column;
  gap: .25rem;
}
</style>