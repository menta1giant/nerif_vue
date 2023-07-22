<template>
  <div class="v-form-field">
    <div v-if="isFormFieldInline" class="v-form-field--inline">
      <v-radio-button
        v-if="isInputTypeRadio" 
        :id="id" 
        :name="name" 
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
      <image-upload
        v-if="isInputTypeImage"
        :id="id" 
        :name="name" 
        :value="value"
      />
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

        :is-loading-resource="isLoadingResource"
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
      <slot></slot>
      <span 
        v-if="hasError" 
        class="error-message"
      >
        {{ displayedErrorMessage }}
      </span>
    </template>
  </div>
</template>

<script>
const TEXT_TYPES = ['text', 'password', 'payment', 'date'];

import formFieldMixin from '@/components/mixins/formFieldMixin.js';
import ImageUpload from '@/components/ImageUpload.vue';
import { fetchResource } from '@/lib/api';

export default {
  name: 'FormField',
  components: {
    ImageUpload,
  },
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
      type: [String, Number, Boolean, File],
      default() {
        return null;
      },
    },
    resource: String,
    placeholder: String,
    errorMessage: {
      type: [String, Array],
      default: 'Your name may not contain any sausages and pancakes any sausages or pancakes',
    },
    hasError: Boolean,
    autocomplete: Boolean,
  },
  async created() {
    if (this.resource) {
      this.isLoadingResource = true;
      const data = await fetchResource(this.resource);
      this.isLoadingResource = false;

      this.resourceData = data;
    }
  },
  data() {
    return {
      resourceData: [],
      isLoadingResource: false,
    };
  },
  computed: {
    displayedErrorMessage() {
      return Array.isArray(this.errorMessage) ? this.errorMessage.at(-1) : this.errorMessage;
    },
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
    isInputTypeImage() {
      return this.type === 'image';
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
  grid-template-rows: min-content;
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