<template>
  <div class="nrf-chevron">
    <nrf-icon type="solid" :name="isOpen ? 'chevron-down' : 'chevron-up'"/>
  </div>
</template>

<script>

export default {
  name: 'Chevron',
  props: {
    isOpen: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
}
</script>

<style>
.nrf-chevron {
  display: flex;
  align-items: center;
  font-size: .8em;
  margin-left: .25rem;
}

.nrf-chevron > * {
  transform: translateY(3px);
}
</style>