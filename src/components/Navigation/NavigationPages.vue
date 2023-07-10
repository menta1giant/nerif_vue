<template>
  <div class="navigation-pages" :class="{ desktop: !isMobile }">
    <router-link 
      v-for="link in linksToPages"
      :key="link.path"
      :to="link.path">
      <v-icon :name="link.meta.icon" />
      {{ link.name }}
    </router-link>
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
      routes: this.$router.getRoutes(),
    }
  },
  computed: {
    linksToPages() {
      return this.routes.filter(route => route.meta.isInMainNavigation);
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Navigation/navigation-pages.scss';

</style>