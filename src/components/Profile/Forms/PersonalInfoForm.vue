<template>
  <form-block 
    header="Personal info" 
    subheader="Tell us more about yourself" 
    :validation-rules="validationRules"

    :is-form-processing="isFormProcessing"

    @submit="handleFormSubmit" 
    @invalid="handleFormValidationFail"
    @input="handleInput"
  >
    <template #default>
      <form-field label="First name" placeholder="Maria" name="first_name" :has-error="!!errorMessages.first_name" :error-message="errorMessages.first_name"/>
      <form-field label="Last name" placeholder="Santos" name="last_name" :has-error="!!errorMessages.last_name" :error-message="errorMessages.last_name"/>
      <form-field label="Phone number" placeholder="+79009009090" name="phone" :has-error="!!errorMessages.phone" :error-message="errorMessages.phone"/>
      <form-field label="E-mail" placeholder="goracio.nelson@gmail.com" name="email" :has-error="!!errorMessages.email" :error-message="errorMessages.email" autocomplete/>
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
import { PERSONAL_INFO_FORM_VALIDATION_RULES } from '../const';
import formHandlerMixin from '@/components/formHandlerMixin';

export default {
  name: 'PersonalInfoForm',
  components: {
    FormBlock,
    FormField,
    ImageUpload
  },
  mixins: [formHandlerMixin],
  data() {
    return {
      validationRules: PERSONAL_INFO_FORM_VALIDATION_RULES,
    };
  },
  methods: {
    handleInput() {
      this.resetErrors();
    },
    async handleFormSubmit(formData) {
      this.resetErrors();
      this.isFormProcessing = true;
      await apiRequestPost('users/profile/update-personal-info', formData);
      this.isFormProcessing = false;
    },
  }
}
</script>

<style lang="scss" scoped>

</style>