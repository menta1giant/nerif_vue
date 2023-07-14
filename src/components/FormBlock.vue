<template>
  <div class="form-block" :class="{ fluid: fluid }">
    <div class="form-block__header">
      <h4>{{ header }}</h4>
      <span>{{ subheader }}</span>
    </div>
    <slot></slot>
    <v-form
      :form-name="formName"
      :error-message="defaultErrorMessage" 

      @input="handleInput"
    >
      <template #default>
        <div 
          v-for="(fieldsColumn, idx) in formFields"
          :key="`field-column_${ idx }`"
          class="form-block__column"
        >
          <template v-for="(component, index) in fieldsColumn" :key="index">
            <component 
              :is="component.component" 
              v-bind="component.props"
              :value="formData[component.props.name]"

              :error-message="errorMessages[component.props.name]"

              :has-error="!!errorMessages[component.props.name]" 

              @toggle="handleSubmit"
            >
            </component>
          </template>
        </div>
      </template>
      <template #cta v-if="!noCta">
        <slot name="cta">
          <v-button size="small" :fluid="fluid" :loading="isFormProcessing" @click="handleSubmit">{{ ctaText }}</v-button>
        </slot>
      </template>
    </v-form>
  </div>
</template>

<script>
import controlMixin from './controlMixin';
import { validateFields } from '@/lib/validation';
import { apiRequestPostForm, apiRequestGet } from '@/lib/api';
import formHandlerMixin from '@/components/formHandlerMixin';

export default {
  name: 'FormBlock',
  mixins: [controlMixin, formHandlerMixin],
  emits: ['form-submitted'],
  props: {
    header: String,
    subheader: String,
    ctaText: {
      type: String,
      default: 'Save changes'
    },
    formName: {
      type: String,
      default() {
        return `form_${ Math.round(Math.random()*100) }`;
      },
    },
    formApiRoute: String,
    formFields: {
      type: Array,
      default() {
        return [[]];
      },
    },
    validationRules: {
      type: Object,
      default() {
        return {};
      },
    },
    customHandler: Function,

    prefetchRequired: Boolean,
    noCta: Boolean,
  },
  async created() {
    if (this.prefetchRequired) await this.fetchFormData();
  },
  data() {
    return {
      formData: {},
    }
  },
  computed: {
    defaultErrorMessage() {
      console.log(this.errorMessages);
      const errorFieldWithDefaultError = 'default' in this.validationRules && this.validationRules.default.find(field => field in this.errorMessages);

      return this.errorMessages[errorFieldWithDefaultError] || this.errorMessages.error;
    },
  },
  methods: {
    async fetchFormData() {
      const data = await apiRequestGet(this.formApiRoute);

      this.formData = data;
    },
    handleInput() {
      this.resetErrors();
    },
    async sendForm(formData) {
      this.resetErrors();
      
      this.isFormProcessing = true;
      const response = await apiRequestPostForm(this.formApiRoute, formData, this.handleFormValidationFail);
      this.isFormProcessing = false;

      this.formData = formData;

      return response;
    },
    async validateForm() {
      const form = document.forms[this.formName];
      let formData = new FormData(form);
      formData = Object.fromEntries(formData.entries());
      console.log(formData);

      const errorFields = validateFields(formData, this.validationRules);
      
      if (Object.keys(errorFields).length) {
        this.handleFormValidationFail(errorFields);
        return;
      }

      const response = await this.sendForm(formData);
      this.$emit('form-submitted', response);
    },
    handleSubmit() {
      if (this.customHandler) {
        this.customHandler();

        return;
      }

      this.validateForm();
    },
  },
}
</script>

<style lang="scss" scoped>
.form-block {
  display: grid;

  padding: 1.5rem;
  
  min-width: 18rem;
  width: fit-content;
  max-width: 100%;

  border: 1px solid $primary-ds-100;
  border-radius: $border-radius-large;

  &__header {
    @include divider-bottom;
    padding-bottom: 1rem;
  }

  &__column {
    display: grid;
    gap: 1rem;
    flex: 1;
  }
}
</style>