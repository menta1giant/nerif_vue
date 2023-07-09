<template>
  <v-tooltip :is-trigger-focused="isTriggerFocused && !disableFocus">
    <template #trigger>
      <button class="icon-button" :class="{ 'icon-button--active': disableFocus }" @focus="isTriggerFocused=true" @blur="isTriggerFocused=false"><v-icon :type="iconType" :name="name" /></button>
    </template>
    <template #content>
      <span v-html="tooltipContent"></span>
    </template>
  </v-tooltip>
</template>

<script>
export default {
  name: 'IconButton',
  props: {
    name: String,
    tooltipContent: String,
    disableFocus: Boolean,
    brands: Boolean,
  },
  data() {
    return {
      isTriggerFocused: false,
    }
  },
  computed: {
    iconType() {
      return this.brands ? 'brands' : 'solid';
    },
  }
}
</script>

<style lang="scss" scoped>
.icon-button {
  border-radius: $border-radius-small;
  cursor: pointer;

  &:not(.icon-button--active):focus {
    outline: 1px solid $primary-s-50;
    outline-offset: 2px;
  }
}
</style>