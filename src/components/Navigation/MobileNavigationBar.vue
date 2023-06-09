<template>
  <div class="navigation-bar">
    <navigation-pages is-mobile/>
  </div>
</template>

<script>

import NavigationPages from '@/components/Navigation/NavigationPages.vue';

export default {
  name: 'MobileNavigationBar',
  components: {
    NavigationPages
  },
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

  &-right {
    display: flex;
    align-items: center;
  }
}

.logo-wrapper {
    font-family: $ff-logo;
    font-size: $fs-h4;
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
    font-weight: $fw-semi-bold;
    font-size: $fs-medium;
    line-height: $lh-medium;
}

</style>