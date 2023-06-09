<template>
  <div class="navigation-pages" :class="{ desktop: !isMobile }">
    <div
      class="navigation-pages__item"
      :class="{ active: $route.fullPath === link.path }"
      v-for="link in links"
      v-bind:key="link.path"
      @click="clickLink(link.path)"
    >
      <a :href="link[0]" @click.prevent="">{{ link.name }}</a>
    </div>
  </div>
</template>

<script>

export default {
  name: 'NavigationPages',
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    }
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

.navigation-pages {
  width: 100%;
  height: 100%;

  display: flex;
  flex: 1;
  align-items: stretch;

  &__item {
    color: $black-10;
    font-weight: 600;
    font-family: $font-display;
    transition: background-color 200ms ease-out;

    cursor: pointer;

    display: flex;
    align-items: center;

    a {
      text-decoration: none;
    }
  }
}
.navigation-pages.desktop {
  justify-content: flex-start;
  padding-left: min(2.2vw, $desktop-breakpoint);
  .navigation-pages__item {
    padding: 0 $container-horizontal-padding-tablet;

    &.active {
      box-shadow: inset 0 -4px 0 $accent-500;
      background: $overlay-white-40;
    } 
  }

  .navigation-pages__item:hover {
    background: $overlay-white-40;
  }
}

.navigation-pages:not(.desktop) {
  justify-content: space-between;

  .navigation-pages__item {
    justify-content: center;
    flex-basis: 33%;

    &.active {
      color: $accent-500;
    } 
  }
}

</style>