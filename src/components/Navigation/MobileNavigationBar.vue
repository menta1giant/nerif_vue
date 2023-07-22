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
.mobile-navbar {
  display: none;

  background: $primary-ds-800;
  height: $navbar-height;
  border-top: 1px solid rgba($black-10, .25);

  @media screen and (max-width: $mobile-breakpoint) {
    display: block;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 9000;
  }
}

</style>