<template>
  <form class="v-form" :name="formName" :style="{width: minWidthStyle}" @submit.prevent="">
    <div class="v-form__body">
      <template v-if="$slots.default">
        <div class="v-form__column">
          <slot></slot>
        </div>
      </template>
      <template v-else>
        <div 
          v-for="(fieldsColumn, idx) in formFields"
          :key="`field-column_${ idx }`"
          class="v-form__column"
        >
          <template v-for="(component, index) in fieldsColumn" :key="index">
            <component 
              :is="component.component" 
              v-bind="component.props"
              :value="formData[component.props.name]"
  
              :error-message="errorMessages[component.props.name]"
  
              :has-error="!!errorMessages[component.props.name]" 
  
              @toggle="handleSubmit"
              @input="handleInput"
            >
            </component>
          </template>
        </div>
      </template>
    </div>
    <div class="v-form__footer">
      <template v-if="$slots.cta">
        <slot name="cta"></slot>
      </template>
      <template v-else-if="!noCta">
        <slot name="cta">
          <v-button size="small" :fluid="fluid" :loading="isFormProcessing" @click="handleSubmit">{{ ctaText }}</v-button>
        </slot>
      </template>
      <div>
        <span 
          v-if="!!defaultErrorMessage" 
          class="error-message"
        >
          {{ defaultErrorMessage }}
        </span>
      </div>
    </div>
  </form>
</template>
<script>
import controlMixin from '@/components/mixins/controlMixin.js';
import { validateFields } from '@/lib/validation';
import { apiRequestPostForm, apiRequestGet } from '@/lib/api';
import formHandlerMixin from '@/components/mixins/formHandlerMixin.js';

export default {
  name: 'Form',
  inheritAttrs: false,
  mixins: [controlMixin, formHandlerMixin],
  emits: ['form-submitted'],
  props: {
    minWidth: {
      type: [Number, String],
      default: 400,
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
    ctaText: {
      type: String,
      default: 'Save changes'
    },
    noCta: Boolean,

    prefetchRequired: Boolean,
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
    minWidthStyle() {
      return typeof this.minWidth === 'string' ? this.minWidth : `${ this.minWidth }px`;
    },
    defaultErrorMessage() {
      const errorFieldWithDefaultError = 'default' in this.validationRules && this.validationRules.default.find(field => field in this.errorMessages);

      return this.errorMessages[errorFieldWithDefaultError] || this.errorMessages.error;
    },
  },
  methods: {
    async fetchFormData() {
      this.isFormProcessing = true;
      try {
        const data = await apiRequestGet(this.formApiRoute);

        this.formData = data;
      } catch(e) {
        undefined
      } finally {
        this.isFormProcessing = false;
      }
    },
    handleInput() {
      this.resetErrors();
    },
    async sendForm(formData) {
      this.resetErrors();
      
      this.isFormProcessing = true;
      try {
        const response = await apiRequestPostForm(this.formApiRoute, formData, this.handleFormValidationFail);

        this.formData = formData;
        return response;
      } catch(e) {
        undefined
      } finally {
        this.isFormProcessing = false;
      }
    },
    async validateForm() {
      const form = document.forms[this.formName];
      let formData = new FormData(form);
      formData = Object.fromEntries(formData.entries());

      const errorFields = validateFields(formData, this.validationRules);
      
      if (Object.keys(errorFields).length) {
        this.handleFormValidationFail(errorFields);
        return;
      }

      try {
        const response = await this.sendForm(formData);
        this.$emit('form-submitted', response);
      } catch(e) {
        undefined
      }
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
@import '@/assets/styles/Base/Form/form.scss';
</style>