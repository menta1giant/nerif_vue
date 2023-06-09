<template>
  <div class="navigation-bar">
    <div class="container">
      <div class="navigation-bar__items">
        <div class="logo-wrapper" @click="clickLink('/')">
          <img src="@/assets/logo.png" height="80"/>
          <span>Nerif</span>
        </div>
        <navigation-pages />
        <div class="navigation-bar__right">
          <template v-if="isUserSignedIn">
            <div class="user-plan-info">
              <span class="user-plan-info__title">{{ `${ userInfo.subscription.plan } plan` }}</span>
              <span class="user-plan-info__days-left">{{ `${ userInfo.subscription.daysLeft || 0 } days left` }}</span>
            </div>
            <div class="navbar-square-button notifications-button">
              <div class="notifications-count">
                2
              </div>
              <nrf-icon type="solid" name="bell" />
            </div>
            <div class="navbar-square-button profile-button">
              <img src="@/assets/maria.png" />

            </div>
          </template>
          <template v-else>
            <span><b>Sign in.</b></span>
            <div class="test-button">Subscribe</div>
          </template>
          <div class="navbar-square-button hamburger-menu-button mobile">
            <nrf-icon type="solid" name="bars" />
          </div>
        </div>
      </div>
      </div>
  </div>
</template>

<script>
import NavigationPages from '@/components/Navigation/NavigationPages.vue';

export default {
  name: 'NavigationBar',
  components: {
    NavigationPages
  },
  data() {
    return {
      links: this.$router.getRoutes(),
      isUserSignedIn: true,
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.getUserInfo;
    },
  },
  methods: {
    clickLink(link) {
      this.$router.push(link);
    }
  }
}
</script>

<style lang="scss" scoped>

.container {
    padding-top: 0px;
    padding-bottom: 0px;
    height: 100% !important;
    overflow: hidden;
}

.navigation-bar {
  position: sticky;
  top: 0px;
  background: $primary-ds-800;
  height: $navbar-height;
  z-index: 99999;

  //@media screen and (max-width: $mobile-breakpoint) {
  //  display: none;
  //}

  &__items {
    width: 100%;

    display: flex;
    justify-content: space-between;
  }

  &__navigation {
    display: flex;
    flex: 1;
    align-items: stretch;

    &__item {
      padding: 0 $container-horizontal-padding-tablet;

      color: $black-10;
      font-weight: 600;
      font-family: $font-display;
      transition: background-color 200ms ease-out;

      cursor: pointer;

      display: flex;
      align-items: center;

      &.active {
        box-shadow: inset 0 -4px 0 $accent-500;
        background: $overlay-white-40;
      } 

      a {
        text-decoration: none;
      }
    }
  }

  &__item:hover {
    background: $overlay-white-40;
  }


  &__right {
    display: flex;
    align-items: center;

    color: $accent-500;
    font-size: $font-size-medium;
    line-height: $lh-medium;

    gap: 16px;

    span {
      white-space: nowrap;
      font-size: 0.875em;
    }

    .hamburger-menu-button {
      color: $black-10;
    }
  }
}

.logo-wrapper {
  font-family: $font-logo;
  font-size: $font-size-h4;
  color: $primary-ds-100;
  cursor: pointer;

  display: flex;
  align-items: center;

  img {
      max-inline-size: none;
  }

}

.test-button {
  padding: .5em 2em;
  background-color: $accent-500;
  border-radius: $border-radius-small;

  color: $primary-ds-800;
  font-weight: 600;
}

@media (max-width: $tablet-breakpoint) {
  .logo-wrapper {
    span {
        display: none;
    }
  }

  .navigation-bar {
    a {
      padding: 0 $container-horizontal-padding-mobile;
    }
  }
}

.user-plan-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: .25rem;

  font-family: $font-display;
  color: $black-10;
  font-weight: 600;
  font-size: $font-size-xs;
  line-height: $lh-small;

  &__days-left {
    font-weight: 400;
    font-size: $font-size-xxs;
  }
}

.navbar-square-button {
  width: 2.5rem;
  height: 2.5rem;
  background: $overlay-white-80;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;

  &.notifications-button {
    position: relative;
    font-size: $font-size-h4;

    .notifications-count {
      color: $primary-ds-800;
      font-size: .625rem;
      line-height: 1rem;
      font-weight: 500;
      text-align: center;

      width: 1.5rem;
      height: 1rem;
      background: $accent-300;
      position: absolute;
      right: -8px;
      top: calc(-1rem + 8px);

      border-radius: $border-radius-medium;
    }
  }

  &.profile-button {
    border: 1px solid $primary-ds-100;

    overflow: hidden;
  }
}
</style>