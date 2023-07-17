export default {
  computed: {
    isGlobalLoading() {
      return this.$store.getters.getLoadingStatus;
    },
  },
  methods: {
    changeLoadingStatus(val) {
      this.$store.commit('setLoadingStatus', val);
    }
  }
}