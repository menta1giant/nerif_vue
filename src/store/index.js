import { createStore } from 'vuex'

export default createStore({
  state: {
    userInfo: {
      subscription: {
        plan: 'Standard',
        daysLeft: 12,
      }
    },
    matchesSelectedDate: new Date(),
    breadcrumbsTitle: '',
  },
  getters: {
    getUserInfo (state) {
      return state.userInfo;
    },
    getBreadcrumbsTitle (state) {
      return state.breadcrumbsTitle;
    },
    getMatchesSelectedDate (state) {
      return state.matchesSelectedDate;
    },
  },
  mutations: {
    setBreadcrumbsTitle (state, newTitle) {
      state.breadcrumbsTitle = newTitle;
    },
    setMatchesSelectedDate (state, newDate) {
      state.matchesSelectedDate = newDate;
    },
  },
  actions: {
  },
  modules: {
  }
})
