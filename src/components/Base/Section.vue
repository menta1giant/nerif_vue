<template>
  <div class="v-section" :class="{ 'dark': dark, 'span': span }">
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
    },
    span: {
      type: Boolean,
      default() {
        return false;
      }
    },
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

  &.span {
    height: 100%;

    //.container {
    //  height: 100%;
    //}
  }
}
</style>