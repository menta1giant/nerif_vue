<template>
  <form-block 
    header="Creating account" 
    cta-text="Create account" 
    :validation-rules="validationRules"
    :is-form-processing="isFormProcessing"
    fluid 
    @submit="handleFormSubmit" 
    @invalid="handleFormValidationFail"
    @input="handleInput"
  >
    <div class="social-sign-up-buttons">
      <social-sign-up-button social="google">Google</social-sign-up-button>
      <social-sign-up-button social="discord">Discord</social-sign-up-button>
    </div>
    <div class="sign-up-method-divider"><span>or</span></div>
    <form-field label="E-mail address"
      name="email"
      placeholder="goracio.nelson@gmail.com"
      :has-error="!!errorMessages.email"
      :error-message="errorMessages.email"
      fluid
      autocomplete
    />
    <form-field 
      type="password" 
      label="Password" 
      name="password" 
      placeholder="Minimum 6 characters" 
      :has-error="!!errorMessages.password"
      :error-message="errorMessages.password"
      fluid
    />
    <form-field 
      type="password" 
      label="Confirm password" 
      name="password_confirmation" 
      placeholder="Minimum 6 characters" 
      :has-error="!!errorMessages.password_confirmation"
      :error-message="errorMessages.password_confirmation"
      fluid
    />
  </form-block>
</template>

<script>
import FormBlock from '@/components/FormBlock.vue';
import FormField from '@/components/FormField.vue';
import SocialSignUpButton from '@/components/SocialSignUpButton.vue';

import { apiRequestPost } from '@/lib/api';
import { INITIAL_STEP_VALIDATION_RULES } from './const';
import formHandlerMixin from '../formHandlerMixin';

export default {
  name: 'InitialStep',
  emits: ['change-step'],
  components: {
    SocialSignUpButton,
    FormBlock,
    FormField,
  },
  mixins: [formHandlerMixin],
  data() {
    return {
      validationRules: INITIAL_STEP_VALIDATION_RULES,
    }
  },
  methods: {
    handleInput() {
      this.resetErrors();
    },
    async handleFormSubmit(formData) {
      this.isFormProcessing = true;
      await apiRequestPost('users/sign-up/create-account', formData);
      this.isFormProcessing = false;

      this.$emit('change-step');
    },
  },
}
</script>

<style lang="scss" scoped>
.social-sign-up-buttons {
  display: grid;
  gap: .75rem;
}

.sign-up-method-divider {
  position: relative;
  width: 100%;
  text-align: center;

  &:before {
    position: absolute;
    width: 100%;
    height: 1px;
    top: 50%;
    left: 0;
    background: $primary-ds-100;
    content: '';
    z-index: 99;
  }

  span {
    position: relative;
    padding: 0 .5rem;
    background: $black-10;
    z-index: 100;
  }
}
</style>