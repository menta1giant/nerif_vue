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
    @include text-xs;

    text-align: center;
    flex-basis: 100%;
    color: $primary-ds-200;
    font-weight: $fw-medium;

    &--completed {
      color: $primary-ds-700;
    }

  }
}
</style>