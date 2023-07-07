<template>
  <form-block header="Creating account" cta-text="Create account" fluid @proceed="$emit('change-step')">
    <div class="social-sign-up-buttons">
      <social-sign-up-button social="google">Google</social-sign-up-button>
      <social-sign-up-button social="discord">Discord</social-sign-up-button>
    </div>
    <div class="sign-up-method-divider"><span>or</span></div>
    <form-field label="E-mail address" placeholder="goracio.nelson@gmail.com" fluid/>
    <form-field type="password" label="Password" placeholder="Minimum 6 characters" fluid/>
    <form-field type="password" label="Confirm password" placeholder="Minimum 6 characters" fluid/>
  </form-block>
</template>

<script>
import FormBlock from '@/components/FormBlock.vue';
import FormField from '@/components/FormField.vue';
import SocialSignUpButton from '@/components/SocialSignUpButton.vue';

export default {
  name: 'InitialStep',
  emits: ['change-step'],
  components: {
    SocialSignUpButton,
    FormBlock,
    FormField,
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