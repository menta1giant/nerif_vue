<template>
  <div class="profile-popup">
    <div class="profile-popup__header">
      <span class="profile-popup__header__name">{{ fullName }}</span>
      <span class="profile-popup__header__email">{{ userInfo.email }}</span>
    </div>
    <div class="profile-popup__common-buttons">
      <v-button type="transparent" size="small" to="/profile"><v-icon name="gear" /><span>Profile settings</span></v-button>
      <v-button type="transparent" size="small" to="/documentation"><v-icon name="book" /><span>Documentation</span></v-button>
      <v-button type="transparent" size="small" to="/help-center"><v-icon name="handshake-angle" /><span>Help center</span></v-button>
    </div>
    <div class="profile-popup__common-buttons">
      <v-button type="transparent" size="small" class="v-button--bleak" :loading="isLogoutInProcess" @click="handleLogOut"><v-icon name="right-from-bracket" /><span>Log out</span></v-button>
    </div>
  </div>
</template>

<script>
import { apiRequestPost } from '@/lib/api';
import userInfoMixin from '@/components/mixins/userInfoMixin.js';

export default {
  name: 'NotificationPopup',
  mixins: [userInfoMixin],
  data() {
    return {
      profile: new Array(3),
      isLogoutInProcess: false,
    };
  },
  computed: {
    fullName() {
      return this.userInfo.first_name && this.userInfo.last_name ? `${ this.userInfo.first_name } ${ this.userInfo.last_name }` : ' Our dearest user';
    },
  },
  methods: {
    async handleLogOut() {
      this.isLogoutInProcess = true;
      try {
        await apiRequestPost('users/logout');
      } catch(e) {
        undefined
      } finally {
        this.isLogoutInProcess = false;

        this.$store.commit('removeToken');

        if (this.$route.meta?.requiresAuth) {
          this.$router.push('/');
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Profile/profile-popup.scss';

</style>