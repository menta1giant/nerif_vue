<template>
  <button class="v-select__option" :class="{ 'v-select__option--selected': option.selected }" type="button" @mouseup="toggleOption()" @focus="toggleOption()"><slot></slot></button>
</template>

<script>
export default {
  name: 'SelectOption',
  props: {
    option: Object,
  },
  methods: {
    toggleOption() {
      this.$emit('select');
    }
  }
}
</script>
<style lang="scss" scoped>

.v-select__option {
  font-weight: $fw-medium;

  padding: .5rem;
  cursor: pointer;

  &:hover {
    background: $primary-ds-50;
  }

  &--selected {
    background: $primary-ds-100 !important;
  }
}
</style>