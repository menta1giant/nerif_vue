export default {
  computed: {
    userInfo() {
      return this.$store.getters.getUserInfo;
    },
    isUserAuthenticated() {
      return this.$store.getters.getIsUserAuthenticated;
    }
  },
}