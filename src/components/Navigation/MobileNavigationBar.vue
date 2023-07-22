<template>
  <div class="mobile-navbar">
    <navigation-pages is-mobile/>
  </div>
</template>

<script>
import NavigationPages from '@/components/Navigation/NavigationPages.vue';

export default {
  name: 'MobileNavigationBar',
  components: {
    NavigationPages
  },
  data() {
     return {
      links: this.$router.getRoutes(),
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Navigation/mobile-navigation-bar.scss';
</style>