<template>
  <v-modal v-model="isShown" header="Log in" status-icon="arrow-right-to-bracket">
    <v-form
      cta-text="Log in"
      :form-api-route="formApiRoute"

      :min-width="400"

      fluid

      @form-submitted="handleFormSubmitted"
    >
      <v-form-field name="email" type="text" placeholder="ab@gmail.com" label="E-mail"></v-form-field>
      <v-form-field name="password" type="password" label="Password">
        <span class="link-text"><b>Forgot password?</b></span>
      </v-form-field>
    </v-form>
    <span class="link-text">Don't have an account? <router-link to="/sign-up"><b>Sign up</b></router-link></span>
    <div class="social-sign-up-buttons">
      <social-sign-up-button social="google">Google</social-sign-up-button>
      <social-sign-up-button social="discord">Discord</social-sign-up-button>
    </div>
  </v-modal>
</template>

<script>
import { LOGIN_FIELDS } from '@/components/Registration/const';
import SocialSignUpButton from '@/components/SocialSignUpButton.vue';

export default {
  name: 'LoginModal',
  components: {
    SocialSignUpButton
  },
  props: {
    modelValue: Boolean,
  },
  data() {
    return {
      isShown: false,

      formApiRoute: 'users/login',
      formFields: LOGIN_FIELDS,
    }
  },
  watch: {
    modelValue: {
      handler(val) {
        this.isShown = val;
      }
    },
    isShown: {
      handler(val) {
        this.$emit('update:modelValue', val);
      }
    },
  },
  methods: {
    async handleFormSubmitted(response) {
      this.$store.commit('setToken', response.token);
      await this.$store.commit('setUserInfo');

      if (this.$route.meta?.requiresGuest) this.$router.push('/');

      this.$emit('update:modelValue', false);
    },
  },
}
</script>
<style lang="scss" scoped>
.social-sign-up-buttons {
  display: grid;
  gap: .75rem;

  margin-top: 1rem;
}
.link-text {
  @include text-xs;

  color: $primary-s-400;

  cursor: pointer;
}
</style>