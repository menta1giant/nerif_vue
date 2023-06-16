<template>
  <div class="help-icon">
    <nrf-tooltip>
      <template v-slot:trigger>
        <nrf-icon name="circle-question" />
      </template>
      <template v-slot:content>
        <slot></slot>
      </template>
    </nrf-tooltip>
  </div>
</template>

<script>
export default {
  name: 'HelpIcon',
}
</script>

<style lang="scss" scoped>
.help-icon {
  color: $primary-s-500;
  font-size: $fs-medium;
  margin-left: .25rem;
}
</style>