<template>
  <div class="v-switcher-field">
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
.v-switcher-field {
  display: flex;
  align-items: center;

  min-width: 0;
  gap: .5rem;

  font-size: $fs-xs;
}
</style>