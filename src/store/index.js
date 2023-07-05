import { createStore } from 'vuex'

export default createStore({
  state: {
    userInfo: {
      subscription: {
        plan: 'Standard',
        daysLeft: 12,
      }
    },
    breadcrumbsTitle: '',
  },
  getters: {
    getUserInfo (state) {
      return state.userInfo;
    },
    getBreadcrumbsTitle (state) {
      return state.breadcrumbsTitle;
    },
  },
  mutations: {
    setBreadcrumbsTitle (state, newTitle) {
      state.breadcrumbsTitle = newTitle;
    },
  },
  actions: {
  },
  modules: {
  }
})
