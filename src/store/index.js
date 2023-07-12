import { createStore } from 'vuex';
import { filters } from '@/components/Matches/Filters/const';
import { getCookie, setCookie, deleteCookie } from '@/lib/cookie';
import { updateAuthorizationToken } from '@/lib/authorization';

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
    authentication: {
      state: {
        token: '',
        isAuthenticated: false,
      },
      getters: {
        getIsUserAuthenticated(state) {
          return state.isAuthenticated;
        },
      },
      mutations: {
        initializeStore() {
          const token = getCookie('Token');
        
          if (token) {
            this.commit('setToken', token);
          } else {
            this.commit('removeToken');
          } 
        },
        setToken(state, token) {
          state.token = token;
          state.isAuthenticated = true;

          setCookie('Token', token, 7);
          updateAuthorizationToken(token);
        },  
        removeToken(state) {
          state.token = '';
          state.isAuthenticated = false;

          deleteCookie('Token');
          updateAuthorizationToken('');
        },
      },
    },
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
