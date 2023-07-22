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
label {
  width: 1.3em;
  height: 1.3em;
  box-shadow: 0 0 0 1px $primary-s-500;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
}

input {
  width: 50%;
  height: 50%;
  border-radius: 50%;

  &:checked {
    background: $primary-s-500;
  }
}
</style>