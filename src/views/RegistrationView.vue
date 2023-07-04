<template>
  <v-section responsive padded>
    <div class="registration">
      <h2>Congratulations on joining Nerif!</h2>
      <div class="registration-steps">
        <div class="registration-steps__scale">
          <div class="registration-steps__line"></div>
          <div class="registration-steps__step-indicator" :class="{ 'registration-steps__step-indicator--completed': activeStep >= 0, 'registration-steps__step-indicator--active': activeStep == 0 }"></div>
          <div class="registration-steps__line"></div>
          <div class="registration-steps__line"></div>
          <div class="registration-steps__step-indicator" :class="{ 'registration-steps__step-indicator--completed': activeStep >= 1, 'registration-steps__step-indicator--active': activeStep == 1 }"></div>
          <div class="registration-steps__line"></div>
          <div class="registration-steps__line"></div>
          <div class="registration-steps__step-indicator" :class="{ 'registration-steps__step-indicator--completed': activeStep >= 2, 'registration-steps__step-indicator--active': activeStep == 2 }"></div>
          <div class="registration-steps__line"></div>
        </div>
        <div class="registration-steps__titles">
          <div class="registration-steps__title" :class="{ 'registration-steps__title--completed': activeStep >= 0 }">Create account</div>
          <div class="registration-steps__title" :class="{ 'registration-steps__title--completed': activeStep >= 1 }">Choose plan</div>
          <div class="registration-steps__title" :class="{ 'registration-steps__title--completed': activeStep >= 2 }">Finish registration</div>
        </div>
      </div>
      <form-block v-if="activeStep === 0" header="Creating account" cta-text="Create account" fluid @proceed="activeStep++">
        <div class="social-sign-up-buttons">
          <social-sign-up-button social="google">Google</social-sign-up-button>
          <social-sign-up-button social="discord">Discord</social-sign-up-button>
        </div>
        <div class="sign-up-method-divider"><span>or</span></div>
        <form-field label="E-mail address" placeholder="goracio.nelson@gmail.com" fluid/>
        <form-field type="password" label="Password" placeholder="Minimum 6 characters" fluid/>
        <form-field type="password" label="Confirm password" placeholder="Minimum 6 characters" fluid/>
      </form-block>
      <form-block v-if="activeStep === 1" header="Choose your subscription plan" cta-text="Activate your subscription" fluid @proceed="activeStep++">
        <form-field type="select" label="Currency" fluid/>
        <form-field type="payment" label="Credit or debit card info" placeholder="Add credit or debit card info" fluid/>
      </form-block>
      <form-block v-if="activeStep === 2" header="Tell us more about yourself" cta-text="Complete registration" fluid @proceed="$router.push('/profile')">
        <template #default>
          <form-field label="First name" placeholder="Maria"/>
          <form-field label="Last name" placeholder="Santos"/>
          <form-field type="select" label="Location" fluid/>
        </template>
        <template #right>
          <image-upload />
        </template>
      </form-block>
    </div>
  </v-section>
</template>
<script>
import FormBlock from '@/components/FormBlock.vue';
import FormField from '@/components/FormField.vue';
import SocialSignUpButton from '@/components/SocialSignUpButton.vue';
import ImageUpload from '@/components/ImageUpload.vue';

export default {
  name: 'RegistrationView',
  components: {
    FormBlock,
    FormField,
    SocialSignUpButton,
    ImageUpload,
  },
  data() {
    return {
      activeStep: 0,
    };
  },
}
</script>

<style lang="scss" scoped>

h2 {
  margin-bottom: 1.5rem;
}

.registration-steps {
  display: grid;
  gap: .5rem;

  padding-block: 1rem;

  &__line {
    flex: 1;
    background: $primary-ds-100;
    height: 4px;

    &:first-child, &:last-child {
      background: transparent;
    }
  }

  &__scale {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__step-indicator {
    border-radius: 50%;
    background: $primary-ds-100;
    width: 1.25rem;
    height: 1.25rem;
    position: relative;
    z-index: 100;

    &--completed {
      background: $accent-700;
    }

    &--active {
      box-shadow: 0 0 0 4px $black-10, 0 0 0 8px $accent-700;
    }
  }

  &__step-indicator--completed:not(.registration-steps__step-indicator--active) {
    &+.registration-steps__line {
      background: $accent-700;

      &+.registration-steps__line {
        background: $accent-700;
      }
    }
  }

  &__titles {
    display: flex;
  }

  &__title {
    text-align: center;
    flex-basis: 100%;
    font-size: $fs-xs;
    line-height: $lh-small;
    color: $primary-ds-200;
    font-weight: $fw-medium;

    &--completed {
      color: $primary-ds-700;
    }

  }
}

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