<template>
  <div class="navigation-bar">
    <v-section dark responsive>
      <div class="navigation-bar__items">
        <router-link to="/">
          <div class="logo-wrapper">
            <img src="@/assets/images/logo.png" height="80"/>
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
            <v-popup v-model="isNotificationsTabOpened">
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

            <v-popup v-model="isProfilePopupOpened">
              <template #trigger>
                <div class="navbar-square-button profile-button">
                  <img src="@/assets/images/logo-desat.png" :srcset="profilePhotoUrl" />
                </div>
              </template>
              <template #content>
                <profile-popup />
              </template>
            </v-popup>
          </template>
          <template v-else>
            <router-link to="/login"><span><b>Sign in.</b></span></router-link>
            <v-button type="primary-accent" size="small"  to="/sign-up">Subscribe</v-button>
          </template>
          <button class="navbar-square-button hamburger-menu-button mobile">
            <v-icon type="solid" name="bars" />
          </button>
        </div>
      </div>
    </v-section>
  </div>
</template>

<script>
import NavigationPages from '@/components/Navigation/NavigationPages.vue';
import NotificationsPopup from '@/components/Notifications/NotificationsPopup.vue';
import ProfilePopup from '@/components/Profile/ProfilePopup.vue';
import userInfoMixin from '../userInfoMixin';
import { BACKEND_URL } from '@/lib/config';

export default {
  name: 'NavigationBar',
  components: {
    NavigationPages,
    NotificationsPopup,
    ProfilePopup,
  },
  mixins: [userInfoMixin],
  data() {
    return {
      links: this.$router.getRoutes(),
      isNotificationsTabOpened: false,
      isProfilePopupOpened: false,
      notificationsCount: 234,
    }
  },
  computed: {
    profilePhotoUrl() {
      return this.userInfo.profile_photo && `${BACKEND_URL}${this.userInfo.profile_photo}`
    },
    hasNotifications() {
      return this.isUserSignedIn && this.notificationsCount > 0;
    },
    isUserSignedIn() {
      return this.$store.getters.getIsUserAuthenticated;
    }
  },
  watch: {
    isUserSignedIn(val) {
      if (val) return;

      this.isNotificationsTabOpened = false;
      this.isProfilePopupOpened = false;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Navigation/navigation-bar.scss';

</style>