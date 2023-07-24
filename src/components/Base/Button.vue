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
      v-slot="{ href, navigate }"
      custom
    >
      <a
        v-bind="$attrs"
        class="v-button" 
        :class="classes" 
        :href="disabled ? null : href"
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
import controlMixin from '@/components/mixins/controlMixin.js';

const TYPES = ['transparent', 'primary', 'secondary', 'danger', 'primary-accent', 'transparent-accent'];
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
      type: [String, Object],
      default: '',
    },
  },
  computed: {
    classes() {
      return { 'fluid': this.fluid, [`v-button--${this.type}`]: true, [`v-button--${this.size}`]: true, 'v-button--loading': this.loading }
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
@import '@/assets/styles/Base/button.scss';
</style>