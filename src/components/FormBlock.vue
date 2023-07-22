<template>
  <div class="form-block" :class="{ fluid: fluid }">
    <div class="form-block__header">
      <span class="h4 text-bold text-ds-700">{{ header }}</span>
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
import controlMixin from '@/components/mixins/controlMixin.js';

export default {
  name: 'FormBlock',
  emits: ['form-submitted'],
  mixins: [controlMixin],
  props: {
    header: String,
    subheader: String,
    ...Form.props,
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/form-block.scss';
</style>