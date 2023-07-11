<template>
  <form-block 
    header="Contact" 
    cta-text="Send message"
    :validation-rules="validationRules"

    :is-form-processing="isFormProcessing"

    @submit="handleFormSubmit" 
    @invalid="handleFormValidationFail"
    @input="handleInput"
  >
    <form-field name="email" label="E-mail" placeholder="goracio.nelson@gmail.com" :has-error="!!errorMessages.email" :error-message="errorMessages.email" autocomplete/>
    <form-field name="message" type="textarea" label="Message" placeholder="Enter your message" :maxlength="301" :has-error="!!errorMessages.message" :error-message="errorMessages.message"/>
    <div>
      <upload-button size="small">Upload files</upload-button>
    </div>
  </form-block>
</template>

<script>
import FormBlock from '@/components/FormBlock.vue';
import FormField from '@/components/FormField.vue';
import UploadButton from '@/components/UploadButton.vue';

import { apiRequestPost } from '@/lib/api';
import formHandlerMixin from '@/components/formHandlerMixin';
import { ValidationRule } from '@/lib/validation';

export default {
  name: 'ContactForm',
  components: {
    FormBlock,
    FormField,
    UploadButton,
  },
  mixins: [formHandlerMixin],
  data() {
    return {
      validationRules: {
        message: new ValidationRule((message)=>message.length <= 300, 'Your message can not be longer than 300 characters'),
        email: new ValidationRule('email', 'Enter valid e-mail'),
      }
    };
  },
  methods: {
    handleInput() {
      this.resetErrors();
    },
    async handleFormSubmit(formData) {
      this.resetErrors();
      this.isFormProcessing = true;
      await apiRequestPost('users/sign-up/set-up-plan', formData);
      this.isFormProcessing = false;
    },
  }
}
</script>