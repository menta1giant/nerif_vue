<template>
  <template v-if="to">
    <a 
      v-if="isExternalLink" 
      v-bind="$attrs" 
      class="v-button" 
      :class="classes" 
      :href="disabled ? null : to" 
      :target="externalLinkTarget"
    >
      <slot></slot>
    </a>
    <router-link 
      v-else 
      v-bind="$props"
      v-slot="{ navigate }"
      custom
    >
      <a
        v-bind="$attrs"
        class="v-button" 
        :class="classes" 
        :href="disabled ? null : to"
        @click="navigate"
      >
        <slot></slot>
      </a>
    </router-link>
  </template>
  <template v-else>
    <button v-bind="$attrs" class="v-button" :class="classes" :disabled="disabled || loading" type="button" @click="handleClick">
      <v-loader v-if="loading" /><slot></slot>
    </button>
  </template>
</template>

<script>
import controlMixin from '@/components/controlMixin';

const TYPES = ['transparent', 'primary', 'secondary', 'danger', 'primary-accent'];
const SIZES = ['small', 'medium', 'large'];

export default {
  name: 'Button',
  inheritAttrs: false,
  mixins: [
    controlMixin,
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
    disabled: {
      type: Boolean,
      default: false,
    },
    to: {
      type: String,
      default: '',
    },
  },
  computed: {
    classes() {
      return { 'fluid': this.fluid, [`v-button--${this.type}`]: true, [`v-button--${this.size}`]: true }
    },
    buttonType() {
      return this.submit ? 'submit' : 'button'
    },
    externalLinkTarget() {
      return this.to.startsWith('#') ? '' : '_blank';
    },
    isExternalLink() {
      return typeof this.to === 'string' && (this.to.startsWith('http') || this.to.startsWith('#'));
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

  &:disabled, &:not(button):not(a[href]) {
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

    &:disabled, &:not(button):not(a[href]) {
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

    &:disabled, &:not(a[href]) {
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

    &:disabled, &:not(button):not(a[href]) {
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

    &:disabled, &:not(button):not(a[href]) {
      color: $primary-ds-400;

      .v-loader {
        --border-color: #{$primary-ds-400};
      }
    }
  }
}
</style>