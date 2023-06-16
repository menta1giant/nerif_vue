<template>
  <div class="switcher-field">
    <v-switcher :id="label" :value="value" />
    <v-label>{{ label }}</v-label>
  </div>
</template>

<script>

export default {
  name: 'SwitcherField',
  props: {
    value: {
      type: Boolean,
      required: false,
    },
    label: {
      type: String,
      required: true,
    },
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