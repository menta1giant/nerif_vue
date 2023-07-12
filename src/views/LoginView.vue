<template>
  <v-section responsive padded>
    <form-block 
      header="Login" 
      cta-text="Login" 
      :is-form-processing="isFormProcessing"
      fluid 
      @submit="handleFormSubmit" 
      @invalid="handleFormValidationFail"
      @input="handleInput"
    >
      <form-field label="E-mail address"
        name="email"
        placeholder="goracio.nelson@gmail.com"
        fluid
        autocomplete
      />
      <form-field 
        type="password" 
        label="Password" 
        name="password" 
        placeholder="Minimum 6 characters" 
        fluid
      />
    </form-block>
  </v-section>
</template>
<script>
import FormBlock from '@/components/FormBlock.vue';
import FormField from '@/components/FormField.vue';

import { apiRequestPost } from '@/lib/api';
import formHandlerMixin from '@/components/formHandlerMixin';

export default {
  name: 'LoginView',
  components: {
    FormBlock,
    FormField,
  },
  mixins: [formHandlerMixin],
  methods: {
    handleInput() {
      this.resetErrors();
    },
    async handleFormSubmit(formData) {
      this.isFormProcessing = true;
      const response = await apiRequestPost('users/login', formData);
      this.isFormProcessing = false;

      this.$store.commit('setToken', response.token);
    },
  },
}
</script>