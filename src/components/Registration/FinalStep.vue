<template>
  <form-block 
    header="Tell us more about yourself" 
    cta-text="Complete registration" 
    :validation-rules="validationRules" 

    :is-form-processing="isFormProcessing"
    fluid 

    @submit="handleFormSubmit" 
    @invalid="handleFormValidationFail"
    @input="handleInput"
  >
    <template #default>
      <form-field label="First name" name="first_name" placeholder="Maria" :has-error="!!errorMessages.first_name" :error-message="errorMessages.first_name"/>
      <form-field label="Last name" name="last_name" placeholder="Santos" :has-error="!!errorMessages.last_name" :error-message="errorMessages.last_name"/>
      <form-field type="select" name="location" label="Location" fluid/>
    </template>
    <template #right>
      <image-upload />
    </template>
  </form-block>
</template>

<script>
import FormBlock from '@/components/FormBlock.vue';
import FormField from '@/components/FormField.vue';
import ImageUpload from '@/components/ImageUpload.vue';

import { apiRequestPost } from '@/lib/api';
import { FINAL_STEP_VALIDATION_RULES } from './const';
import formHandlerMixin from '../formHandlerMixin';

export default {
  name: 'FinalStep',
  components: {
    FormField,
    FormBlock,
    ImageUpload,
  },
  mixins: [formHandlerMixin],
  data() {
    return {
      validationRules: FINAL_STEP_VALIDATION_RULES,
    }
  },
  methods: {
    handleInput() {
      this.resetErrors();
    },
    async handleFormSubmit(formData) {
      this.resetErrors();
      this.isFormProcessing = true;
      await apiRequestPost('users/sign-up/complete', formData);
      this.isFormProcessing = false;

      this.$router.push('/profile');
    },
  }
}
</script>

<style lang="scss" scoped>
</style>