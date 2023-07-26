<template>
  <v-tooltip v-if="hasTooltip" :is-trigger-focused="isTriggerFocused && !disableFocus">
    <template #trigger>
      <button v-bind="$attrs" class="v-icon-button" :class="{ 'v-icon-button--active': disableFocus }" :aria-label="$attrs['aria-label'] || tooltipContent" @focus="isTriggerFocused=true" @blur="isTriggerFocused=false"><v-icon :type="iconType" :name="name" /></button>
    </template>
    <template #content>
      <span v-html="tooltipContent"></span>
    </template>
  </v-tooltip>
  <button v-else v-bind="$attrs" class="v-icon-button"><v-icon :type="iconType" :name="name" /></button>
</template>

<script>
export default {
  name: 'IconButton',
  inheritAttrs: false,
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
@import '@/assets/styles/Base/icon-button.scss';
</style>