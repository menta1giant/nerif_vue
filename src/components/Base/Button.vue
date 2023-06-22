<template>
  <button class="v-button" :class="[`v-button--${type}`, `v-button--${size}`]">
    <slot></slot>
  </button>
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
  gap: .5em;

  border-radius: $border-radius-small;

  color: $primary-s-500;
  font-family: $ff-display;
  font-weight: $fw-medium;

  white-space: nowrap;

  transition-duration: 200ms;

  &--primary {
    background: $primary-s-500;
    color: $black-10;
    border: 2px solid transparent;

    &::v-deep i {
      color: $accent-500;
    }

    &:hover {
      background-color: $primary-s-600;
    }

    &:focus {
      border: 2px solid $black-10;
      box-shadow: 0 0 0 2px $primary-s-500;
    }
  }

  &--secondary {
    background: $black-10;
    color: $primary-ds-600;

    border: 2px solid $primary-ds-100;

    &:hover {
      color: $primary-s-500;
      background-color: $primary-ds-50;
    }

    &:focus {
      border-color: $primary-s-200;
    }
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
    padding: .75rem 3rem;

    font-size: $fs-h4;
    line-height: $fs-h4;
  }
}
</style>