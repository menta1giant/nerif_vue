<template>
  <form-block 
    header="Choose your subscription plan" 
    cta-text="Activate your subscription"
    min-width="500" 

    :validation-rules="validationRules"
    :form-fields="formFields"
    :form-api-route="formApiRoute"

    @form-submitted="handleFormSubmitted"
  />
</template>

<script>
import FormBlock from '@/components/FormBlock.vue';

import { PAYMENT_STEP_VALIDATION_RULES, PAYMENT_STEP_FIELDS } from './const';

export default {
  name: 'PaymentStep',
  emits: ['change-step'],
  components: {
    FormBlock,
  },
  data() {
    return {
      formFields: PAYMENT_STEP_FIELDS,
      formApiRoute: 'users/sign-up/set-up-plan',
      validationRules: PAYMENT_STEP_VALIDATION_RULES,
    };
  },
  methods: {
    async handleFormSubmitted() {

      await this.$store.commit('setUserInfo');
      this.$emit('change-step');
    },
  },
}
</script>