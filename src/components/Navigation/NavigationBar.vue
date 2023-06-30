<template>
  <div class="navigation-bar">
    <div class="container">
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
            <v-positioner v-model="isNotificationsTabOpened" position="center" :horizontal-margin="28">
              <template v-slot:body>
                <div class="navbar-square-button notifications-button" :class="{ 'notifications-button--active': hasNotifications }">
                  <div v-if="hasNotifications" class="notifications-count">
                    {{ notificationsCount }}
                  </div>
                  <v-icon type="solid" name="bell" />
                </div>
              </template>
              <template v-slot:dropdown>
                <notifications-popup />
              </template>
            </v-positioner>

            <v-positioner v-model="isProfilePopupOpened" position="center" :horizontal-margin="28">
              <template v-slot:body>
                <div class="navbar-square-button profile-button">
                  <img src="@/assets/images/maria.png" />
                </div>
              </template>
              <template v-slot:dropdown>
                <profile-popup />
              </template>
            </v-positioner>

          </template>
          <template v-else>
            <span><b>Sign in.</b></span>
            <v-button type="primary-accent" size="small" @click="isUserSignedIn = true">Subscribe</v-button>
          </template>
          <div class="navbar-square-button hamburger-menu-button mobile">
            <v-icon type="solid" name="bars" />
          </div>
        </div>
      </div>
      </div>
  </div>
</template>

<script>
import NavigationPages from '@/components/Navigation/NavigationPages.vue';
import NotificationsPopup from '@/components/Notifications/NotificationsPopup.vue';
import ProfilePopup from '@/components/Profile/ProfilePopup.vue';

export default {
  name: 'NavigationBar',
  components: {
    NavigationPages,
    NotificationsPopup,
    ProfilePopup,
  },
  data() {
    return {
      links: this.$router.getRoutes(),
      isUserSignedIn: false,
      isNotificationsTabOpened: false,
      isProfilePopupOpened: false,
      notificationsCount: 234,
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.getUserInfo;
    },
    hasNotifications() {
      return this.isUserSignedIn && this.notificationsCount > 0;
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Navigation/navigation-bar.scss';

</style>