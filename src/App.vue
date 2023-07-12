<template>
  <navigation-bar/>
  <breadcrumbs-bar v-if="$route.meta.hasBreadcrumbs" />
  <router-view/>
  <div class="mobile-navbar-container">
    <mobile-navigation-bar/>
  </div>
</template>

<script>
import NavigationBar from '@/components/Navigation/NavigationBar.vue';
import MobileNavigationBar from '@/components/Navigation/MobileNavigationBar.vue';
import BreadcrumbsBar from '@/components/BreadcrumbsBar.vue';

export default {
  name: 'app',
  components: {
    NavigationBar,
    MobileNavigationBar,
    BreadcrumbsBar,
  },
  beforeCreate() {
    this.$store.commit('initializeStore');
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/global.scss';

#app {
  display: flex;
  flex-direction: column;
  //height: 100%;
  overflow-x: hidden;
  padding-top: $navbar-height;
}

.mobile-navbar-container {
  display: none;
}

@media screen and (max-width: $mobile-breakpoint) {

  #app {
    padding-bottom: 5rem;
  }

  .mobile-navbar-container {
    display: block;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 9000;
  }
}

</style>
