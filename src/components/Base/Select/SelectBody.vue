<template>
  <button class="v-select__body" :class="{ 'v-select__body--error': hasError, 'v-select__body--loading': isLoading }" :id="id" type="button">
    <slot></slot>
    <v-chevron :model-value="isDropdownVisible" />
  </button>
</template>

<script>
import errorMixin from '@/components/mixins/errorMixin.js';
import formFieldMixin from '@/components/mixins/formFieldMixin.js';

export default {
  name: 'SelectBody',
  mixins: [
    errorMixin,
    formFieldMixin,
  ],
  props: {
    isDropdownVisible: Boolean,
    isLoading: Boolean,
  },
}
</script>

<style lang="scss" scoped>
.v-select__body {
  font-size: $fs-xs;
  line-height: $lh-default;

  border: 1px solid $black-100;
  border-radius: $border-radius-small;
  background: $black-10;
  width: 100%;
  padding: .25rem;
  padding-right: .5rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: .5rem;

  cursor: pointer;

  &:focus {
    box-shadow: 0 0 0 1px $primary-s-100;
  }

  &--error {
    border-color: $red-600;
  }

  &--loading {
    background: $primary-ds-50;
  }
}
</style>