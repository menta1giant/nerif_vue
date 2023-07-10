<template>
  <button class="v-button" :class="{ 'fluid': fluid, [`v-button--${type}`]: true, [`v-button--${size}`]: true }" :disabled="disabled || loading" @click="handleClick">
    <v-loader v-if="loading" /><slot></slot>
  </button>
</template>

<script>
import ControlMixin from '@/components/ControlMixin';

const TYPES = ['transparent', 'primary', 'secondary', 'danger', 'primary-accent'];
const SIZES = ['small', 'medium', 'large'];

export default {
  name: 'Button',
  mixins: [
    ControlMixin,
  ],
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
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick(event) {
      if (this.loading && this.disabled) {
        event.preventDefault();
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.v-button {
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: .5em;

  border-radius: $border-radius-small;

  color: $primary-s-500;
  font-family: $ff-display;
  font-weight: $fw-medium;

  white-space: nowrap;

  transition-duration: 200ms;

  &:disabled {
    &:deep(.v-icon) {
      display: none;
    }

    cursor: default;
  }

  &--small {
    padding: .5rem 2rem;

    font-size: $fs-medium;
    line-height: $lh-medium;
  }

  &--medium {
    padding: .75rem 2rem;

    font-size: $fs-large;
    line-height: $lh-large;
  }

  &--large {
    padding: .75rem 3rem;

    font-size: $fs-h4;
    line-height: $fs-h4;
  }

  &--primary {
    background: $primary-s-500;
    color: $black-10;
    border: 2px solid transparent;

    &:deep(i) {
      color: $accent-500;
    }

    &:hover {
      background-color: $primary-s-600;
    }

    &:focus {
      border: 2px solid $black-10;
      box-shadow: 0 0 0 2px $primary-s-500;
    }

    &:disabled {
      background: $primary-s-300;
      color: $primary-ds-200;

      .v-loader {
        --border-color: #{$primary-ds-200};
      }
    }
  }

  &--primary-accent {
    background: $accent-500;
    color: $primary-ds-800;
    border: 2px solid transparent;
    font-weight: $fw-semi-bold;

    &:deep(i) {
      color: $primary-s-500;
    }

    &:hover {
      background-color: $accent-700;
    }

    &:focus {
      border: 2px solid $primary-ds-800;
      box-shadow: 0 0 0 2px $accent-500;
    }

    &:disabled {
      background: $accent-300;
      color: $black-500;

      .v-loader {
        --border-color: #{$black-500};
      }
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

    &:disabled {
      background: $black-10;
      color: $primary-ds-200;

      .v-loader {
        --border-color: #{$primary-ds-200};
      }
    }
  }

  &--transparent {
    padding: 0;
    justify-content: left;

    &:disabled {
      color: $primary-ds-400;

      .v-loader {
        --border-color: #{$primary-ds-400};
      }
    }
  }
}
</style>