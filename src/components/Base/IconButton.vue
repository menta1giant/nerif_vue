<template>
  <v-tooltip v-if="hasTooltip" :is-trigger-focused="isTriggerFocused && !disableFocus">
    <template #trigger>
      <button class="v-icon-button" :class="{ 'v-icon-button--active': disableFocus }" @focus="isTriggerFocused=true" @blur="isTriggerFocused=false"><v-icon :type="iconType" :name="name" /></button>
    </template>
    <template #content>
      <span v-html="tooltipContent"></span>
    </template>
  </v-tooltip>
  <button v-else class="v-icon-button"><v-icon :type="iconType" :name="name" /></button>
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
    hasTooltip() {
      return !!this.tooltipContent;
    },
  }
}
</script>

<style lang="scss" scoped>
.v-icon-button {
  border-radius: $border-radius-small;
  cursor: pointer;

  &:not(.v-icon-button--active):focus {
    outline: 1px solid $primary-s-100;
    outline-offset: 2px;
  }
}
</style>