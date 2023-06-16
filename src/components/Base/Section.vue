<template>
  <div class="v-section">
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Section',
}
</script>

<style lang="scss" scoped>
.v-section {
  display: flex;
  height: 100%;
  min-height: 0;
}
</style>