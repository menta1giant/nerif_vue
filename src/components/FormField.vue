<template>
  <div class="form-field">
    <div v-if="isFormFieldInline" class="form-field--inline">
      <v-radio-button v-if="isInputTypeRadio" :name="name" fluid />
      <v-switcher v-if="isInputTypeSwitcher" :value="value" fluid @change="$emit('input')"/>
      <v-label v-if="label" @click="$emit('input')">{{ label }}</v-label>
    </div>
    <template v-else>
      <v-label v-if="label">{{ label }}</v-label>
      <v-input v-if="isInputTypeText" :type="type" :placeholder="placeholder" fluid/>
      <v-select v-else-if="isInputTypeSelect" :type="type" fluid/>
      <v-textarea v-else-if="isInputTypeTextarea" fluid></v-textarea>
      <span v-if="hasError" class="form-field__error-message">Your name may not contain any sausages and pancakes any sausages or pancakes</span>
    </template>
  </div>
</template>

<script>
const TEXT_TYPES = ['text', 'password', 'payment', 'date'];

export default {
  name: 'FormField',
  props: {
    label: String,
    name: String,
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: [String, Number, Boolean]
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
    isInputTypeRadio() {
      return this.type === 'radio';
    },
    isInputTypeSwitcher() {
      return this.type === 'switcher';
    },
    isFormFieldInline() {
      return this.isInputTypeSwitcher || this.isInputTypeRadio;
    },
    hasError() {
      return false;
    },
  }
}
</script>

<style lang="scss" scoped>
.form-field {
  display: grid;
  gap: .25rem;

  &--inline {
    display: flex;
    align-items: center;
    gap: .5rem;

    .v-label {
      font-size: .9em;
    }
  }

  &__error-message {
    font-size: $fs-xxs;
    line-height: $lh-small;
    color: $red-600;
    font-weight: $fw-medium;
  }
}
</style>