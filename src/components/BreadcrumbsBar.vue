<template>
  <v-section padded responsive>
    <div class="breadcrumbs-bar">
      <div class="breadcrumbs-bar__body">
        <router-link to="/"><v-icon name="house" /></router-link>
        <template v-for="page in path" :key="page.name">
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
@import '@/assets/styles/breadcrumbs-bar.scss';
</style>