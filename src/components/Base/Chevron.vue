<template>
  <div class="v-chevron">
    <v-icon type="solid" :name="isOpen ? 'chevron-down' : 'chevron-up'"/>
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
.v-chevron {
  display: flex;
  align-items: center;
  font-size: .8em;
  margin-left: .25rem;
}

.v-chevron > * {
  transform: translateY(3px);
}
</style>