<template>
  <hamburger-menu v-if="isHamburgerMenuOpened" />
  <navigation-bar @toggle-hamburger-menu="isHamburgerMenuOpened=!isHamburgerMenuOpened"/>
  <breadcrumbs-bar v-if="$route.meta.hasBreadcrumbs" />
  <router-view/>
  <div class="mobile-navbar-container">
    <mobile-navigation-bar/>
  </div>
  <global-notifications />
</template>

<script>
import NavigationBar from '@/components/Navigation/NavigationBar.vue';
import MobileNavigationBar from '@/components/Navigation/MobileNavigationBar.vue';
import BreadcrumbsBar from '@/components/BreadcrumbsBar.vue';
import GlobalNotifications from '@/components/GlobalNotifications/GlobalNotifications.vue';
import userInfoMixin from './components/userInfoMixin';
import HamburgerMenu from '@/components/Navigation/HamburgerMenu.vue';

export default {
  name: 'app',
  components: {
    NavigationBar,
    MobileNavigationBar,
    BreadcrumbsBar,
    GlobalNotifications,
    HamburgerMenu,
  },
  mixins: [userInfoMixin],
  beforeCreate() {
    this.$store.commit('initializeStore');
  },
  data() {
    return {
      isHamburgerMenuOpened: false,
    }
  },
  watch: {
    isUserAuthenticated(val) {
      if (!val && this.$route.meta.requiresAuth) {
        this.$router.replace({ name: 'root', query: { 'log-in': 1 } });
      }
    },
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
