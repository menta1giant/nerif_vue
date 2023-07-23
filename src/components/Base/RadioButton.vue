<template>
  <div class="v-radio-button">
    <label>
      <input type="radio" :id="id" :name="name" :value="0" checked/>
    </label>
  </div>
</template>

<script>
import formFieldMixin from '@/components/mixins/formFieldMixin.js';

export default {
  name: 'RadioButton',
  mixins: [formFieldMixin],
  props: {
    value: Number,
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Base/radio-button.scss';
</style>