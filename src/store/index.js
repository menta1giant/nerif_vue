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
    matches: {
      state: {
        matchesSelectedDate: new Date(),
        selectedMatch: null,
      },
      getters: {
        getMatchesSelectedDate (state) {
          return state.matchesSelectedDate;
        },
        getSelectedMatch(state) {
          return state.selectedMatch;
        },
      },
      mutations: {
        setMatchesSelectedDate (state, newDate) {
          state.matchesSelectedDate = newDate;
        },
        setSelectedMatch(state, match) {
          state.selectedMatch = match;
        },
      },
    }
  }
})
