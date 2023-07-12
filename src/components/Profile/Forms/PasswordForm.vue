<template>
  <form-block 
    header="Password" 
    subheader="Enter and confirm new password"

    :validation-rules="validationRules"

    :is-form-processing="isFormProcessing"

    @submit="handleFormSubmit" 
    @invalid="handleFormValidationFail"
    @input="handleInput"
  >
    <form-field type="password" label="Current password" name="old_password" placeholder="" :has-error="!!errorMessages.old_password" :error-message="errorMessages.old_password"/>
    <form-field type="password" label="New password" name="password" placeholder="Minimum 6 characters" :has-error="!!errorMessages.password" :error-message="errorMessages.password"/>
    <form-field type="password" label="Confirm password" name="repeat_password" placeholder="Minimum 6 characters" :has-error="!!errorMessages.repeat_password" :error-message="errorMessages.repeat_password"/>
  </form-block>
</template>

<script>
import FormBlock from '@/components/FormBlock.vue';
import FormField from '@/components/FormField.vue';

import { PASSWORD_FORM_VALIDATION_RULES } from '../const';
import { apiRequestPost } from '@/lib/api';
import formHandlerMixin from '@/components/formHandlerMixin';

export default {
  name: 'PersonalInfoForm',
  components: {
    FormBlock,
    FormField
  },
  mixins:[formHandlerMixin],
  data() {
    return {
      validationRules: PASSWORD_FORM_VALIDATION_RULES,
    }
  },
  methods: {
    handleInput() {
      this.resetErrors();
    },
    async handleFormSubmit(formData) {
      this.resetErrors();
      this.isFormProcessing = true;
      await apiRequestPost('users/profile/change-password', formData);
      this.isFormProcessing = false;
    },
  }
}
</script>