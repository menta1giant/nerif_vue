<template>
  <v-section padded responsive>
    <div class="breadcrumbs-bar">
      <div class="breadcrumbs-bar__body">
        <router-link to="/"><v-icon name="house" /></router-link>
        <span>></span>
        <span>{{ $route.name }}</span>
      </div>
      <template v-if="$route.meta.breadcrumbsSlot">
        <component :is="$route.meta.breadcrumbsSlot" />
      </template>
    </div>
  </v-section>
</template>

<style lang="scss" scoped>
.breadcrumbs-bar {
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  width: 100%;
  
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