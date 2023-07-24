<template>
  <article class="hero-section-feature">
    <div class="hero-section-feature__header"><v-icon :name="icon" /><h3 class="h4 header-common">{{ header }}</h3></div>
    <p><slot></slot></p>
  </article>
</template>

<script>
export default {
  name: 'HeroSectionFeature',
  props: {
    icon: String,
    header: String,
    bodyText: String,
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Landing/hero-section-feature.scss';
</style>