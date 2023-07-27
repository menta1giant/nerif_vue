import { createStore } from 'vuex';
import { filters } from '@/components/Matches/Filters/const';
import { getCookie, setCookie, deleteCookie } from '@/lib/cookie';
import { updateAuthorizationToken } from '@/lib/authorization';
import { apiRequestGet } from '@/lib/api';
import { getLocalStorageDataByKey, setLocalStorageData } from '@/lib/localStorage';

export default createStore({
  state: {
    breadcrumbsTitle: '',
    isLoading: false,
  },
  getters: {
    getBreadcrumbsTitle (state) {
      return state.breadcrumbsTitle;
    },
    getLoadingStatus (state) {
      return state.isLoading;
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

      const matchesSelectedDate = Date.parse(getLocalStorageDataByKey('matches_selected_date'));
      if (matchesSelectedDate) this.commit('setMatchesSelectedDate', new Date(matchesSelectedDate));
    },
    setBreadcrumbsTitle (state, newTitle) {
      state.breadcrumbsTitle = newTitle;
    },
    setLoadingStatus (state, isLoading) {
      state.isLoading = isLoading;
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
        async setUserInfo(state) {
          try {
            const [userInfo, subscriptionInfo] = await Promise.all([apiRequestGet('users/profile/personal-info'), apiRequestGet('users/profile/subscription-info')]);

            state.userInfo = Object.assign({}, userInfo, { subscription: subscriptionInfo });
          } catch(e) {
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
          if (!state.isAuthenticated) return;
          
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
          setLocalStorageData('matches_selected_date', newDate);
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
