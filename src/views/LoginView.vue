<template>
  <v-section responsive padded>
    <form-block 
      header="Login" 
      cta-text="Login" 

      :form-fields="formFields"
      :form-api-route="formApiRoute"

      @form-submitted="handleFormSubmitted"
    />
  </v-section>
</template>
<script>
import FormBlock from '@/components/FormBlock.vue';
import { LOGIN_FIELDS } from '@/components/Registration/const';

export default {
  name: 'LoginView',
  components: {
    FormBlock,
  },
  data() {
    return {
      formApiRoute: 'users/login',
      formFields: LOGIN_FIELDS,
    };
  },
  methods: {
    async handleFormSubmitted(response) {
      this.$store.commit('setToken', response.token);
    },
  },
}
</script>