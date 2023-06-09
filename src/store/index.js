import { createStore } from 'vuex'

export default createStore({
  state: {
    userInfo: {
      subscription: {
        plan: 'Standard',
        daysLeft: 12,
      }
    }
  },
  getters: {
    getUserInfo (state) {
      return state.userInfo;
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
