<template>
  <div class="navigation-bar">
    <div class="container">
      <div class="logo-wrapper" @click="clickLink('/')">
        <img src="@/assets/logo.png" height="80"/>
        <span>Nerif</span>
    </div>
      <div class="navigation-bar-items">
        <div class="navigation-bar-item" v-for="link in links" v-bind:key="link.path" :class="{ active: $route.fullPath === link.path }" @click="clickLink(link.path)">
          <a :href="link[0]" @click.prevent="">{{ link.name }}</a>
        </div>
      </div>
      <div class="navigation-bar-right">
        <div class="test-button">Subscribe</div>
      </div>
    </div>
</div>
</template>

<script>

export default {
  name: 'NavigationBar',
  data() {
    return {
      links: this.$router.getRoutes(),
    }
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

  &-items {
    padding-left: $container-horizontal-padding-desktop;

    display: flex;
    flex: 1;
    align-items: stretch;
  }

  &-item {
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

  &-item:hover {
    background: $overlay-white-40;
  }


  &-right {
    display: flex;
    align-items: center;
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
    font-size: $font-size-medium;
    line-height: $lh-medium;
}

@media (max-width: $tablet-breakpoint) {
    .logo-wrapper {
        span {
            display: none;
        }
    }

    .navigation-bar {

        &-items {
            padding-left: $container-horizontal-padding-tablet;
        }

        a {
            padding: 0 $container-horizontal-padding-mobile;
        }
    }
}
</style>