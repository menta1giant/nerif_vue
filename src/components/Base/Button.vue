<template>
  <div class="v-button" :class="[`v-button--${type}`, `v-button--${size}`]">
    <slot></slot>
  </div>
</template>

<script>
const TYPES = ['transparent', 'primary', 'secondary', 'danger', 'primary-accent'];
const SIZES = ['small', 'medium', 'large'];

export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      vaidator(value) {
        return TYPES.includes(value);
      },
      default() {
        return 'primary';
      },
    },
    size: {
      type: String,
      vaidator(value) {
        return SIZES.includes(value);
      },
      default() {
        return 'medium';
      },
    },

  },

}
</script>

<style lang="scss" scoped>
.v-button {
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: .5rem;

  color: $primary-s-500;
  font-weight: $fw-medium;
  
  &__icon {
    color: $primary-ds-500;
  }

  &--small {
    font-size: $fs-medium;
    line-height: $lh-medium;
  }

  &--medium {
    font-size: $fs-large;
    line-height: $lh-large;
  }

  &--large {
    font-size: $fs-h4;
    line-height: $fs-h4;
  }
}
</style>