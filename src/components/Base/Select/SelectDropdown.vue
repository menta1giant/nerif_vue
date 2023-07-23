<template>
  <div class="v-select__dropdown">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SelectDropdown',
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Base/Select/select-dropdown.scss';
</style>