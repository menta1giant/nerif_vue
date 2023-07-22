<template>
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
</template>

<script>
export default {
  name: 'RegistrationSteps',
  props: {
    activeStep: Number,
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Registration/registration-steps.scss';
</style>