<template>
  <div class="form-block" :class="{ fluid: fluid }">
    <div class="form-block__header">
      <h4>{{ header }}</h4>
      <span>{{ subheader }}</span>
    </div>
    <v-form
      :form-name="formName"
      :error-message="errorMessages.default" 

      @input="handleInput"
    >
      <template>
        <div 
          v-for="(fieldsColumn, idx) in formFields"
          :key="`field-column_${ idx }`"
          class="form-block__column"
        >
          <v-form-field 
            v-for="field in fieldsColumn" 
            :key="`${ formName }_${ field.name }`"

            :type="field.type"
            :label="field.label" 
            :placeholder="field.placeholder" 
            :name="field.name" 
            :value="formData[field.name]" 
            :options=field.options
            :error-message="errorMessages[field.name]"

            :has-error="!!errorMessages[field.name]" 
          />
        </div>
      </template>
      <template #cta v-if="ctaText">
        <v-button size="small" :fluid="fluid" :loading="isFormProcessing" @click="handleSubmit">{{ ctaText }}</v-button>
      </template>
    </v-form>
  </div>
</template>

<script>
import ControlMixin from './ControlMixin';
import { validateFields } from '@/lib/validation';
import { apiRequestPost, apiRequestGet } from '@/lib/api';
import formHandlerMixin from '@/components/formHandlerMixin';

export default {
  name: 'FormBlock',
  mixins: [ControlMixin, formHandlerMixin],
  props: {
    header: String,
    subheader: String,
    ctaText: String,
    formName: {
      type: String,
      default() {
        return `form_${ Math.random()*100 }`;
      },
    },
    formAPIRoute: String,
    formFields: {
      type: Array,
      default() {
        return [[]];
      },
    },
    validationRules: Object,

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
  methods: {
    async fetchFormData() {
      const data = await apiRequestGet(this.formAPIRoute);

      this.formData = data;
    },
    handleInput() {
      this.resetErrors();
    },
    async sendForm(formData) {
      this.resetErrors();
      
      this.isFormProcessing = true;
      await apiRequestPost(this.formAPIRoute, formData);
      this.isFormProcessing = false;

      this.formData = formData;
    },
    validateForm() {
      const form = document.forms[this.formName];
      let formData = new FormData(form);
      formData = Object.fromEntries(formData.entries());

      const errorFields = validateFields(formData, this.validationRules);
      
      if (Object.keys(errorFields).length) {
        this.handleFormValidationFail(errorFields);
        return;
      }

      this.sendForm(formData);
    },
    handleSubmit() {
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
    padding-bottom: 1rem;
  }

  &__body {
    @include divider-top;

    display: flex;
    gap: 1.5rem;

    padding-top: 1rem;
    max-width: 36rem;

    &__left {
      display: grid;
      gap: 1rem;
      flex: 1;
    }

    @media screen and (max-width: $mobile-breakpoint) {
      flex-direction: column;
    }
  }

  &__footer {
    @include divider-top;

    padding-top: 1.5rem;
    margin-top: 1rem;
  }
}
</style>