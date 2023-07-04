<template>
  <button class="v-select__body">
    <slot></slot>
    <v-chevron :model-value="isDropdownVisible" />
  </button>
</template>

<script>
export default {
  name: 'SelectBody',
  props: {
    isDropdownVisible: Boolean,
  },
}
</script>

<style lang="scss" scoped>
.v-select__body {
  border: 1px solid $black-100;
  border-radius: $border-radius-small;
  background: $black-10;
  width: 100%;
  padding: .25rem;
  padding-right: .5rem;

  font-size: $fs-xs;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: .5rem;

  cursor: pointer;

  &:focus {
    box-shadow: 0 0 0 1px $primary-s-100;
  }
}
</style>