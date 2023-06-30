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
.navigation-bar {
  position: sticky;
  top: 0px;
  background: $primary-ds-800;
  height: $navbar-height;
  border-top: 1px solid rgba($black-10, .25);
}

</style>