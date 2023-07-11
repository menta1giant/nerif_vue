<template>
  <form-block 
  header="Localization" 
  subheader="Aloha!"

  @submit="handleFormSubmit" 
  >
    <form-field type="select" label="Language" name="language"/>
    <form-field type="select" label="Timezone" name="timezone"/>
  </form-block>
</template>

<script>
import FormBlock from '@/components/FormBlock.vue';
import FormField from '@/components/FormField.vue';

import { apiRequestPost } from '@/lib/api';
import formHandlerMixin from '@/components/formHandlerMixin';

export default {
  name: 'LocalizationForm',
  components: {
    FormBlock,
    FormField
  },
  mixins:[formHandlerMixin],
  methods: {
    async handleFormSubmit(formData) {
      this.resetErrors();
      this.isFormProcessing = true;
      await apiRequestPost('users/sign-up/set-up-plan', formData);
      this.isFormProcessing = false;

      this.$emit('change-step');
    },
  }
}
</script>