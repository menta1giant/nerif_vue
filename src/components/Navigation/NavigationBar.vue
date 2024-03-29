<template>
  <header class="navigation-bar">
    <v-section dark responsive>
      <div class="navigation-bar__items">
        <router-link to="/">
          <div class="logo-wrapper">
            <img srcset="@/assets/images/logo-small.webp, @/assets/images/logo.webp 2x" height="80" alt="Nerif logo"/>
            <span>Nerif</span>
          </div>
        </router-link>
        <navigation-pages />
        <div class="navigation-bar__right">
          <template v-if="isUserSignedIn">
            <div class="user-plan-info">
              <span class="user-plan-info__title">{{ `${ userInfo.subscription?.plan } plan` }}</span>
              <span class="user-plan-info__days-left">{{ `${ userInfo.subscription?.days_left || 0 } days left` }}</span>
            </div>
            <v-popup v-model="isNotificationsTabOpened" show-x>
              <template #trigger>
                <button class="navbar-square-button notifications-button" :class="{ 'notifications-button--active': hasNotifications }">
                  <div v-if="hasNotifications" class="notifications-count">
                    {{ notificationsCount }}
                  </div>
                  <v-icon type="solid" name="bell" />
                </button>
              </template>
              <template #content>
                <notifications-popup />
              </template>
            </v-popup>

            <v-popup v-model="isProfilePopupOpened" show-x>
              <template #trigger>
                <div class="navbar-square-button profile-button">
                  <img src="@/assets/images/logo-desat-small.webp" :srcset="profilePhotoUrl" alt="profile-photo" />
                </div>
              </template>
              <template #content>
                <profile-popup />
              </template>
            </v-popup>
          </template>
          <template v-else>
            <v-button type="transparent-accent" size="small" @click="showLoginModal"><span>Sign in.</span></v-button>
            <v-button type="primary-accent" size="small" to="/sign-up">Subscribe</v-button>
          </template>
          <hamburger-menu-button 
            class="navbar-square-button hamburger-menu-button mobile"
            :class="{ 'hamburger-menu-button--active': isHamburgerMenuOpened }" 
            :aria-expanded="isHamburgerMenuOpened" 
            @click="handleToggleHamburgerMenu"
          />
        </div>
      </div>
    </v-section>
    <global-loading-bar />
  </header>
  <login-modal v-model="isLoginModalShown" />
</template>

<script>
import { getImageUrl } from '@/lib/image';
import NavigationPages from '@/components/Navigation/NavigationPages.vue';
import HamburgerMenuButton from '@/components/Navigation/HamburgerMenuButton.vue';
import NotificationsPopup from '@/components/Notifications/NotificationsPopup.vue';
import ProfilePopup from '@/components/Profile/ProfilePopup.vue';
import LoginModal from '@/components/Registration/LoginModal.vue';
import GlobalLoadingBar from './GlobalLoadingBar.vue';
import userInfoMixin from '@/components/mixins/userInfoMixin.js';

export default {
  name: 'NavigationBar',
  components: {
    NavigationPages,
    HamburgerMenuButton,
    NotificationsPopup,
    ProfilePopup,
    LoginModal,
    GlobalLoadingBar,
  },
  emits: ['toggle-hamburger-menu'],
  mixins: [userInfoMixin],
  created() {
    if ('log-in' in this.$route.query) {
      this.showLoginModal();
    }
  },
  data() {
    return {
      links: this.$router.getRoutes(),
      isNotificationsTabOpened: false,
      isProfilePopupOpened: false,
      isLoginModalShown: false,
      isHamburgerMenuOpened: false,
      notificationsCount: 234,
    }
  },
  computed: {
    profilePhotoUrl() {
      return this.userInfo.profile_photo && getImageUrl(this.userInfo.profile_photo);
    },
    hasNotifications() {
      return this.isUserSignedIn && this.notificationsCount > 0;
    },
    isUserSignedIn() {
      return this.$store.getters.getIsUserAuthenticated;
    }
  },
  watch: {
    $route: {
      immediate: true,
      deep: true,
      handler(route) {
        if ('log-in' in route.query) {
          this.showLoginModal();
        }

        if (this.isHamburgerMenuOpened) {
          this.handleToggleHamburgerMenu();
        }
      }
    },
    isUserSignedIn(val) {
      if (val) return;

      this.isNotificationsTabOpened = false;
      this.isProfilePopupOpened = false;
    }
  },
  methods: {
    showLoginModal() {
      this.isLoginModalShown = true;
    },
    handleToggleHamburgerMenu() {
      this.isHamburgerMenuOpened = !this.isHamburgerMenuOpened;

      if (this.isHamburgerMenuOpened) {
        document.body.classList.add("scroll-lock");
      } else {
        document.body.classList.remove("scroll-lock");
      }

      this.$emit('toggle-hamburger-menu');
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Navigation/navigation-bar.scss';

</style>