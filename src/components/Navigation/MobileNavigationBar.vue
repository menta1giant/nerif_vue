<template>
  <div class="navigation-bar">
    <div class="navigation-bar-items">
      <div class="navigation-bar-item" v-for="link in links" v-bind:key="link.route" :class="{ active: $route.fullPath === link.route }" @click="clickLink(link.route)">
        <a :href="link[0]" @click.prevent="">{{ link.name }}</a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MobileNavigationBar',
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
    height: 100% !important;
}

.navigation-bar {
  position: sticky;
  top: 0px;
  background: $primary-ds-800;
  height: $navbar-height;

  &-items {
    width: 100%;
    height: 100%;

    display: flex;
    flex: 1;
    align-items: stretch;
    justify-content: space-between;
  }

  &-item {

    color: $black-10;
    font-weight: 600;
    font-family: $font-display;
    transition: background-color 200ms ease-out;

    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-basis: 33%;

    &.active {
      color: $accent-500;
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

</style>