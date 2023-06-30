<template>
  <div class="navigation-pages" :class="{ desktop: !isMobile }">
    <div
      v-for="link in links"
      v-bind:key="link.path"
      class="navigation-pages__item"
      :class="{ 'navigation-pages__item--active': $route.fullPath === link.path }"
      @click="clickLink(link.path)"
    >
      <a :href="link.path" @click.prevent="">
        <div class="navigation-pages__item__icon">
          <v-icon :name="link.meta.icon" />
        </div>
        {{ link.name }}
      </a>
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
@import '@/assets/styles/Navigation/navigation-pages.scss';

</style>