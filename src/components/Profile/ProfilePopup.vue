<template>
  <div class="profile-popup">
    <div class="profile-popup__header">
      <span class="profile-popup__header__name">{{ fullName }}</span>
      <span class="profile-popup__header__email">{{ userInfo.email }}</span>
    </div>
    <div class="profile-popup__common-buttons">
      <router-link to='/profile'><v-button type="transparent" size="small"><v-icon name="gear" />Profile settings</v-button></router-link>
      <router-link to='/documentation'><v-button type="transparent" size="small"><v-icon name="book" />Documentation</v-button></router-link>
      <router-link to="/help-center"><v-button type="transparent" size="small"><v-icon name="handshake-angle" />Help center</v-button></router-link>
    </div>
    <div class="profile-popup__common-buttons profile-popup__common-buttons--bleak">
      <v-button type="transparent" size="small" :loading="isLogoutInProcess" @click="handleLogOut"><v-icon name="right-from-bracket" /><span class="button-content-bleak">Log out</span></v-button>
    </div>
  </div>
</template>

<script>
import { apiRequestPost } from '@/lib/api';
import userInfoMixin from '@/components/userInfoMixin';

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
      await apiRequestPost('users/logout');
      this.isLogoutInProcess = false;

      this.$store.commit('removeToken');
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Profile/profile-popup.scss';

</style>