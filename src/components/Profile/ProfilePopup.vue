<template>
  <div class="profile-popup">
    <div class="profile-popup__header">
      <span class="profile-popup__header__name">Maria de la Alexandra si Antonia viva la vida Santos</span>
      <span class="profile-popup__header__email">maria.santos@nerif.bet</span>
    </div>
    <div class="profile-popup__common-buttons">
      <router-link to='/profile'><v-button type="transparent" size="small" loading><v-icon name="gear" />Profile settings</v-button></router-link>
      <router-link to='/documentation'><v-button type="transparent" size="small"><v-icon name="book" />Documentation</v-button></router-link>
      <router-link to="/help-center"><v-button type="transparent" size="small"><v-icon name="handshake-angle" />Help center</v-button></router-link>
    </div>
    <div class="profile-popup__common-buttons">
      <v-button type="transparent" size="small"><div class="icon-bleak"><v-icon name="right-from-bracket" /></div><span class="button-content-bleak">Log out</span></v-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificationPopup',
  data() {
    return {
      profile: new Array(3),
    };
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Profile/profile-popup.scss';

</style>