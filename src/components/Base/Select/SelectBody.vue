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
@import '@/assets/styles/Base/Select/select-body.scss';
</style>