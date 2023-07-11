import { createStore } from 'vuex';
import { filters } from '@/components/Matches/Filters/const';

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
        matchesFilters: filters,
        selectedMatch: null,
      },
      getters: {
        getMatchesSelectedDate (state) {
          return state.matchesSelectedDate;
        },
        getSelectedMatch(state) {
          return state.selectedMatch;
        },
        getMatchesFilters(state) {
          return state.matchesFilters;
        },
      },
      mutations: {
        setMatchesSelectedDate (state, newDate) {
          state.matchesSelectedDate = newDate;
        },
        setSelectedMatch(state, match) {
          state.selectedMatch = match;
        },
        toggleMatchesFilter(state, idx) {
          state.matchesFilters[idx].value = !state.matchesFilters[idx].value;
        },
      },
    }
  }
})
