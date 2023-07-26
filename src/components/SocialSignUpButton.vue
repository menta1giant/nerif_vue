<template>
  <button class="social-sign-up-button" :class="[`social-sign-up-button--${ social }`]" type="button" disabled><img height="20" width="20" :src="imagePath"/>Continue with <slot></slot></button>
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
@import '@/assets/styles/social-sign-up-button.scss';
</style>