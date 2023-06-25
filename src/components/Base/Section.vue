<template>
  <div class="v-section" :class="{ 'dark': dark }">
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Section',
  props: {
    dark: {
      type: Boolean,
      default() {
        return false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.v-section {
  display: flex;
  min-height: 0;

  &.dark {
    background: $primary-ds-800;
    color: $black-10;
  }
}
</style>