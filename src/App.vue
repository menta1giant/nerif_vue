<template>
  <navigation-bar/>
  <router-view/>
  <div class="mobile-navbar-container">
    <mobile-navigation-bar/>
  </div>
</template>

<script>
import NavigationBar from '@/components/Navigation/NavigationBar.vue';
import MobileNavigationBar from '@/components/Navigation/MobileNavigationBar.vue';

export default {
  name: 'app',
  components: {
    NavigationBar,
    MobileNavigationBar
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/global.scss';

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-x: hidden;
}

.mobile-navbar-container {
  display: none;
}

@media screen and (max-width: $mobile-breakpoint) {

  //#app {
  //  height: unset;
  //}

  .mobile-navbar-container {
    display: block;
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}

</style>
