<template>
  <textarea class="v-textarea" :id="id" :name="name" :class="{'v-textarea--error': hasError }"></textarea>
</template>

<script>
import formFieldMixin from '@/components/mixins/formFieldMixin.js';
import errorMixin from '@/components/mixins/errorMixin.js';

export default {
  name: 'Textarea',
  mixins: [formFieldMixin, errorMixin],
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Base/textarea.scss';
</style>