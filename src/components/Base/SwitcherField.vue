<template>
  <div class="switcher-field">
    <nrf-switcher :id="label" :value="true" />
    <nrf-label>{{ label }}</nrf-label>
  </div>
</template>

<script>

export default {
  name: 'SwitcherField',
  props: {
    label: {
      type: String,
      required: true,
    }
  }
}
</script>

<style lang="scss" scoped>
.switcher-field {
  display: flex;
  align-items: center;

  min-width: 0;
  gap: .5rem;
  padding: .5rem;
}
</style>