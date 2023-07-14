import { createStore } from 'vuex';
import { filters } from '@/components/Matches/Filters/const';
import { getCookie, setCookie, deleteCookie } from '@/lib/cookie';
import { updateAuthorizationToken } from '@/lib/authorization';
import { apiRequestGet } from '@/lib/api';

export default createStore({
  state: {
    breadcrumbsTitle: '',
  },
  getters: {
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
        userInfo: {
          subscription: {
            plan: 'Standard',
            daysLeft: 12,
          }
        },
      },
      getters: {
        getUserInfo (state) {
          return state.userInfo;
        },
        getIsUserAuthenticated(state) {
          return state.isAuthenticated;
        },
      },
      mutations: {
        async initializeStore() {
          const token = getCookie('Token');
        
          if (token) {
            this.commit('setToken', token);

            await this.commit('setUserInfo');
          } else {
            this.commit('removeToken');
          } 
        },
        async setUserInfo(state) {
          const [userInfo, subscriptionInfo] = await Promise.all([apiRequestGet('users/profile/personal-info'), apiRequestGet('users/profile/subscription-info')]);

          state.userInfo = Object.assign({}, userInfo, { subscription: subscriptionInfo });
          console.log(state.userInfo);
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
