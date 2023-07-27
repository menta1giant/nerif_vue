<template>
  <hamburger-menu :class="{ 'hamburger-menu--active': isHamburgerMenuOpened }" />
  <navigation-bar @toggle-hamburger-menu="isHamburgerMenuOpened=!isHamburgerMenuOpened"/>
  <breadcrumbs-bar v-if="$route.meta.hasBreadcrumbs" />
  <main>
    <router-view/>
  </main>
  <mobile-navigation-bar/>
  <global-notifications />
</template>

<script>
import NavigationBar from '@/components/Navigation/NavigationBar.vue';
import MobileNavigationBar from '@/components/Navigation/MobileNavigationBar.vue';
import BreadcrumbsBar from '@/components/BreadcrumbsBar.vue';
import GlobalNotifications from '@/components/GlobalNotifications/GlobalNotifications.vue';
import userInfoMixin from '@/components/mixins/userInfoMixin.js';
import HamburgerMenu from '@/components/Navigation/HamburgerMenu.vue';

import axios from "axios"

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
    axios.defaults.baseURL = process.env.VUE_APP_API;

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
  @include flex-column;
  
  overflow-x: hidden;
  padding-top: $navbar-height;

  @media screen and (max-width: $mobile-breakpoint) {
    padding-bottom: 5rem;
  }

  .v-section:has(.breadcrumbs-bar) + main:not(:has(.sections-wrapper)) {
    @include divider-top-bleak;
    padding-top: 1rem;
  }
}

</style>
