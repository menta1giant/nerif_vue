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
    height: calc(100vh - $navbar-height);
    height: calc(100svh - $navbar-height);
    height: calc(100dvh - $navbar-height);
  }

  @media screen and (max-width: $mobile-breakpoint) {
    &.span {
      height: calc(100dvh - $navbar-height - $navbar-height);
    }
  }
}
</style>