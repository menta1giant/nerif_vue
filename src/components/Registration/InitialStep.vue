<template>
  <form-block
    header="Creating account" 
    cta-text="Create account" 

    :min-width="500"
    :validation-rules="validationRules"
    :form-fields="formFields"
    :form-api-route="formApiRoute"

    @form-submitted="handleFormSubmitted"
  >
    <div class="social-sign-up-buttons">
      <social-sign-up-button social="google">Google</social-sign-up-button>
      <social-sign-up-button social="discord">Discord</social-sign-up-button>
    </div>
    <div class="sign-up-method-divider"><span>or</span></div>
  </form-block>
</template>

<script>
import FormBlock from '@/components/FormBlock.vue';
import SocialSignUpButton from '@/components/SocialSignUpButton.vue';

import { INITIAL_STEP_VALIDATION_RULES, INITIAL_STEP_FIELDS } from './const';

export default {
  name: 'InitialStep',
  emits: ['change-step'],
  components: {
    SocialSignUpButton,
    FormBlock,
  },
  data() {
    return {
      validationRules: INITIAL_STEP_VALIDATION_RULES,
      formFields: INITIAL_STEP_FIELDS,
      formApiRoute: 'users/sign-up/create-account'
    }
  },
  methods: {
    async handleFormSubmitted(response) {
      this.$store.commit('setToken', response.token);

      await this.$store.commit('setUserInfo');

      this.$emit('change-step');
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Registration/initial-step.scss';
</style>