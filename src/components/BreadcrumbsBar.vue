<template>
  <v-section padded responsive>
    <div class="breadcrumbs-bar">
      <div class="breadcrumbs-bar__body">
        <router-link to="/"><v-icon name="house" /></router-link>
        <template v-for="page in path" v-bind:key="page.name">
          <span>></span>
          <router-link :to="page.path"><span>{{ page.name }}</span></router-link>
        </template>
        <template v-if="routeName">
          <span>></span>
          <span>{{ routeName }}</span>
        </template>
      </div>
      <template v-if="$route.meta.breadcrumbsSlot">
        <component :is="$route.meta.breadcrumbsSlot" />
      </template>
    </div>
  </v-section>
</template>

<script>
export default {
  name: 'BreadcrumbsBar',
  computed: {
    path() {
      return this.$route.matched.slice(0,-1).map(({ name, path }) => ({ name, path })).filter(route => route.path !== this.$route.path);
    },
    routeName() {
      if (this.$route.name === 'root') {
        return null;
      }

      return this.$route.meta.isCustomBreadcrumbsTitle ? this.$store.getters.getBreadcrumbsTitle : this.$route.name;
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumbs-bar {
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  width: 100%;
  height: 2.5rem;
  
  &__body {
    display: flex;
    align-items: center;
    gap: .5rem;

    font-size: $fs-large;
    font-weight: $fw-semi-bold;
    line-height: $lh-large;
    color: $primary-ds-700;

    .v-icon {
      color: $primary-ds-400;
    }
  }
}
</style>