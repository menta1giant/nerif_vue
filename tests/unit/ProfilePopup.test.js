import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import ProfilePopup from '@/components/Profile/ProfilePopup.vue';

test('Shows full name', async () => {
  const store = createStore({
    state: {
      userInfo: {
        first_name: 'Maria',
        last_name: 'Santos',
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
    },
  });

  const wrapper = mount(ProfilePopup, {
    global: {
      plugins: [store],
    },
  });

  const headerName = wrapper.find('.profile-popup__header__name').text();

  expect(headerName).toBe(`${ store.state.userInfo.first_name } ${ store.state.userInfo.last_name }`);
})