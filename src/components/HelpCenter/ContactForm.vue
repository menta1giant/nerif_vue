<template>
  <form-block 
    header="Contact" 
    cta-text="Send message"
    :validation-rules="validationRules"
    :form-fields="formFields"
    :form-api-route="formApiRoute"

    @form-submitted="handleFormSubmitted"
  />
</template>

<script>
import FormBlock from '@/components/FormBlock.vue';

import { ValidationRule } from '@/lib/validation';
import { CONTACT_FORM_FIELDS } from './const';

export default {
  name: 'ContactForm',
  components: {
    FormBlock,
  },
  data() {
    return {
      validationRules: {
        message: new ValidationRule((message)=>message.length <= 300, 'Your message can not be longer than 300 characters'),
        email: new ValidationRule('email', 'Enter valid e-mail'),
      },
      formApiRoute: 'users/contact',
      formFields: CONTACT_FORM_FIELDS,
    };
  },
  methods: {
    async handleFormSubmitted(response) {
      console.log(response);
    },
  }
}
</script>