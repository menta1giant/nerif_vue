<template>
  <div class="form-field">
    <v-label v-if="label">{{ label }}</v-label>
    <v-input v-if="isInputTypeText" :type="type" :placeholder="placeholder" fluid />
    <v-select v-else-if="isInputTypeSelect" :type="type" fluid />
    <v-textarea v-else-if="isInputTypeTextarea" fluid></v-textarea>
  </div>
</template>

<script>
const TEXT_TYPES = ['text', 'password', 'payment', 'date'];

export default {
  name: 'FormField',
  props: {
    label: String,
    type: {
      type: String,
      default: 'text',
    },
    placeholder: String,
  },
  computed: {
    isInputTypeText() {
      return TEXT_TYPES.includes(this.type);
    },
    isInputTypeSelect() {
      return this.type === 'select';
    },
    isInputTypeTextarea() {
      return this.type === 'textarea';
    },
  }
}
</script>

<style lang="scss" scoped>
.form-field {
  display: grid;
  gap: .25rem;
}
</style>