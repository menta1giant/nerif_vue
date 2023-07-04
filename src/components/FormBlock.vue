<template>
  <div class="form-block" :class="{ fluid: fluid }">
    <div class="form-block__header">
      <h4>{{ header }}</h4>
      <span>{{ subheader }}</span>
    </div>
    <div class="form-block__body">
      <div class="form-block__body__left">
        <slot></slot>
      </div>
      <div v-if="$slots['right']" class="form-block__body__right">
        <slot name="right"></slot>
      </div>
    </div>
    <div v-if="!noCta" class="form-block__footer">
      <v-button size="small" :fluid="fluid" @click="handleClickProceed">{{ ctaText }}</v-button>
    </div>
  </div>
</template>

<script>
import ControlMixin from './ControlMixin';

export default {
  name: 'FormBlock',
  mixins: [ControlMixin],
  emits: ['proceed'],
  props: {
    header: String,
    subheader: String,
    ctaText: {
      type: String,
      default: 'Save changes',
    },
    noCta: Boolean,
  },
  methods: {
    handleClickProceed() {
      this.$emit('proceed');
    },
  },
}
</script>

<style lang="scss" scoped>
.form-block {
  display: grid;

  padding: 1.5rem;
  
  min-width: 18rem;
  width: fit-content;
  max-width: 100%;

  border: 1px solid $primary-ds-100;
  border-radius: $border-radius-large;

  &__header {
    padding-bottom: 1rem;
  }

  &__body {
    @include divider-top;

    display: flex;
    gap: 1.5rem;

    padding-top: 1rem;

    &__left {
      display: grid;
      gap: 1rem;
      flex: 1;
    }

    @media screen and (max-width: $mobile-breakpoint) {
      flex-direction: column;
    }
  }

  &__footer {
    @include divider-top;

    padding-top: 1.5rem;
    margin-top: 1rem;
  }
}
</style>