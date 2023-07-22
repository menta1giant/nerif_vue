<template>
  <hamburger-menu :class="{ 'hamburger-menu--active': isHamburgerMenuOpened }" />
  <navigation-bar @toggle-hamburger-menu="isHamburgerMenuOpened=!isHamburgerMenuOpened"/>
  <breadcrumbs-bar v-if="$route.meta.hasBreadcrumbs" />
  <router-view/>
  <mobile-navigation-bar/>
  <global-notifications />
</template>

<script>
import NavigationBar from '@/components/Navigation/NavigationBar.vue';
import MobileNavigationBar from '@/components/Navigation/MobileNavigationBar.vue';
import BreadcrumbsBar from '@/components/BreadcrumbsBar.vue';
import GlobalNotifications from '@/components/GlobalNotifications/GlobalNotifications.vue';
import UserInfoMixin from './components/UserInfoMixin.js';
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
  mixins: [UserInfoMixin],
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
@import '@/assets/styles/main.scss';

#app {
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  padding-top: $navbar-height;

  @media screen and (max-width: $mobile-breakpoint) {
    padding-bottom: 5rem;
  }
}

</style>
