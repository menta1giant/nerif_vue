<template>
  <div class="v-section" :class="{ 'dark': dark, 'span': span, 'padded': padded }">
    <div class="container" :class="{'responsive': responsive }">
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
    padded: {
      type: Boolean,
      default() {
        return false;
      }
    },
    responsive: {
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

  &.padded {
    padding-block: var(--container-padding-block);
  }

  @media screen and (max-width: $mobile-breakpoint) {
    &.span {
      height: calc(100dvh - $navbar-height - $navbar-height);
    }
  }
}
</style>