<template>
  <textarea class="v-textarea" :id="id" :name="name" :class="{'v-textarea--error': hasError }"></textarea>
</template>

<script>
import formFieldMixin from './formFieldMixin.js';
import ErrorMixin from '@/components/ErrorMixin.js';

export default {
  name: 'Textarea',
  mixins: [formFieldMixin, ErrorMixin],
}
</script>

<style lang="scss" scoped>
.v-textarea {
  padding: .5rem;
  color: $primary-ds-800;

  background: $black-10;
  border: 1px solid $primary-ds-100;
  border-radius: $border-radius-small;

  font-size: $fs-medium;
  min-height: calc(1.5em * 4.5);
  max-width: 100%;

  resize: vertical;

  &:focus {
    box-shadow: 0 0 0 1px $primary-s-100;
  }

  &--error {
    border-color: $red-600;
  }
}
</style>