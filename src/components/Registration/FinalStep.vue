<template>
  <form-block 
    header="Tell us more about yourself" 
    cta-text="Complete registration" 
    :min-width="500"

    :validation-rules="validationRules"
    :form-fields="formFields"
    :form-api-route="formApiRoute"

    @form-submitted="handleFormSubmitted"
  />
</template>

<script>
import FormBlock from '@/components/FormBlock.vue';

import { FINAL_STEP_VALIDATION_RULES, FINAL_STEP_FIELDS } from './const';

export default {
  name: 'FinalStep',
  components: {
    FormBlock,
  },
  data() {
    return {
      formFields: FINAL_STEP_FIELDS,
      formApiRoute: 'users/sign-up/complete',
      validationRules: FINAL_STEP_VALIDATION_RULES,
    }
  },
  methods: {
    async handleFormSubmitted() {
      await this.$store.commit('setUserInfo');
      this.$router.push('/profile');
    },
  }
}
</script>