<template>
  <div class="v-select__dropdown">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SelectDropdown',
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