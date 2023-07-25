<template>
  <div class="empty-results-warning">
    <p class="text-large">
      <slot></slot>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.empty-results-warning {
  padding: 1rem;
  background: $primary-ds-50;
  border-left: 4px solid $accent-500;
}
</style>