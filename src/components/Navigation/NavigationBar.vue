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
              <span class="user-plan-info__title">{{ `${ userInfo.subscription.plan } plan` }}</span>
              <span class="user-plan-info__days-left">{{ `${ userInfo.subscription.daysLeft || 0 } days left` }}</span>
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
                  <img src="@/assets/images/maria.png" />
                </div>
              </template>
              <template #content>
                <profile-popup />
              </template>
            </v-popup>
          </template>
          <template v-else>
            <router-link to="/login"><span><b>Sign in.</b></span></router-link>
            <router-link to="/sign-up"><v-button type="primary-accent" size="small">Subscribe</v-button></router-link>
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
import UserInfoMixin from '../UserInfoMixin';

export default {
  name: 'NavigationBar',
  components: {
    NavigationPages,
    NotificationsPopup,
    ProfilePopup,
  },
  mixins: [UserInfoMixin],
  data() {
    return {
      links: this.$router.getRoutes(),
      isNotificationsTabOpened: false,
      isProfilePopupOpened: false,
      notificationsCount: 234,
    }
  },
  computed: {
    hasNotifications() {
      return this.isUserSignedIn && this.notificationsCount > 0;
    },
    isUserSignedIn() {
      return this.$store.getters.getIsUserAuthenticated;
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Navigation/navigation-bar.scss';

</style>