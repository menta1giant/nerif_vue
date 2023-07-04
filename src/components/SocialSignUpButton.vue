<template>
  <button class="social-sign-up-button" :class="[`social-sign-up-button--${ social }`]"><img height="20" width="20" :src="imagePath"/>Continue with <slot></slot></button>
</template>

<script>
export default {
  name: 'SocialSignUpButton',
  props: {
    social: {
      type: String,
      default: 'google',
    }
  },
  computed: {
    imagePath() {
      return require(`@/assets/images/${ this.social }.svg`);
    },
  },
}
</script>

<style lang="scss" scoped>
.social-sign-up-button {
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: .5em;

  padding: .5rem;
  width: 100%;

  border-radius: $border-radius-small;

  color: $primary-s-500;
  font-family: $ff-display;
  font-weight: $fw-semi-bold;

  white-space: nowrap;

  &--google {
    background: #F9FAFB;
    color: $primary-ds-900;
    box-shadow: 0 0 0 1px $primary-ds-100;
  }

  &--discord {
    background: #5865F2;
    color: $black-10;
  }
}
</style>