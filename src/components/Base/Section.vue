<template>
  <section class="v-section" :class="{ 'dark': dark, 'span': span, 'padded': padded }">
    <div class="container" :class="{'responsive': responsive }">
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Section',
  props: {
    dark: {
      type: Boolean,
      default() {
        return false;
      }
    },
    span: {
      type: Boolean,
      default() {
        return false;
      }
    },
    padded: {
      type: Boolean,
      default() {
        return false;
      }
    },
    responsive: {
      type: Boolean,
      default() {
        return false;
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Base/section.scss';
</style>