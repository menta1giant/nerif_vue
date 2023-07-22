<template>
  <div class="form-block" :class="{ fluid: fluid }">
    <div class="form-block__header">
      <h4>{{ header }}</h4>
      <span>{{ subheader }}</span>
    </div>
    <slot></slot>
    <v-form
      v-bind="$props"
      @form-submitted="(resp) => $emit('form-submitted', resp)"
    >
    </v-form>
  </div>
</template>

<script>
import Form from '@/components/Base/Form/Form';
import ControlMixin from '@/components/ControlMixin.js';

export default {
  name: 'FormBlock',
  emits: ['form-submitted'],
  mixins: [ControlMixin],
  props: {
    header: String,
    subheader: String,
    ...Form.props,
  },
}
</script>

<style lang="scss" scoped>
.form-block {
  padding: 1.5rem;
  
  min-width: 18rem;
  width: fit-content;
  max-width: 100%;

  border: 1px solid $primary-ds-100;
  border-radius: $border-radius-large;

  &__header {
    @include divider-bottom-bleak;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }
}
</style>