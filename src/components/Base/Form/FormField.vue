<template>
  <div class="v-form-field">
    <div v-if="isFormFieldInline" class="v-form-field--inline">
      <v-radio-button
        v-if="isInputTypeRadio" 
        :id="id" :name="name" 
        :value="value" 
        fluid 
      />
      <v-switcher 
        v-if="isInputTypeSwitcher" 
        :id="id" 
        :name="name" 
        :value="value" 
        fluid 

        @change="handleChange"
      />
      <label 
        v-if="label" 
        :for="id"
      >
        {{ label }}
      </label>
    </div>
    <template v-else>
      <label 
        v-if="label" 
        :for="id"
      >
        {{ label }}
      </label>
      <v-input 
        v-if="isInputTypeText" 
        :id="id" 
        :name="name" 
        :type="type"
        :placeholder="placeholder"
        :value="value"
        
        :autocomplete="autocomplete" 
        :has-error="hasError" 
        fluid
      />
      <v-select 
        v-else-if="isInputTypeSelect" 
        :id="id" 
        :name="name" 
        :type="type"

        :value="value"
        :options="resourceData"

        :has-error="hasError" 
        fluid
      />
      <v-textarea 
        v-else-if="isInputTypeTextarea" 
        :id="id" 
        :name="name" 

        :has-error="hasError" 
        fluid
      >
      </v-textarea>
      <span 
        v-if="hasError" 
        class="error-message"
      >
        {{ errorMessage }}
      </span>
    </template>
  </div>
</template>

<script>
const TEXT_TYPES = ['text', 'password', 'payment', 'date'];

import formFieldMixin from '@/components/Base/formFieldMixin';
import { fetchResource } from '@/lib/api';

export default {
  name: 'FormField',
  mixins: [
    formFieldMixin,
  ],
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
    resource: String,
    placeholder: String,
    errorMessage: {
      type: String,
      default: 'Your name may not contain any sausages and pancakes any sausages or pancakes',
    },
    hasError: Boolean,
    autocomplete: Boolean,
  },
  async created() {
    if (this.resource) {
      const data = await fetchResource(this.resource);

      this.resourceData = data;
    }
  },
  data() {
    return {
      resourceData: [],
    };
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
  },
  methods: {
    handleInput(val) {
      this.$emit('input', val);
    },
    handleChange(val) {
      this.$emit('change', val);
    },
  },
}
</script>

<style lang="scss" scoped>
.v-form-field {
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
}

label {
  white-space: nowrap;
  overflow-y: hidden;
  overflow-y: visible;
  text-overflow: ellipsis;

  font-weight: $fw-medium;
  color: $primary-ds-900;
  font-size: 1em;
  line-height: $lh-small;

  flex: 1;
}
</style>