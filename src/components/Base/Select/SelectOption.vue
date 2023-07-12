<template>
  <button class="v-select__option" :class="{ 'v-select__option--selected': selected }" type="button" @mouseup="toggleOption()"><slot></slot></button>
</template>

<script>
export default {
  name: 'SelectOption',
  props: {
    selected: Boolean,
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
  line-height: $lh-medium;

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