<template>
  <div class="animated-placeholder">
    &nbsp;
  </div>
</template>

<script>
export default {
  name: 'AnimatedPlaceholder',
  props: {
    height: {
      type: String,
      default: '100%',
    },
    width: {
      type: String,
      default: '100%',
    },
    borderRadius: {
      type: String,
      default: '3px',
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/animated-placeholder.scss';
</style>