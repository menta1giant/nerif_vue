<template>
  <div class="v-tooltip" @mouseenter="handleHover" @mouseleave="handleHoverOut">
    <v-positioner :model-value="isHovered" position="center" :force-top="top">
      <template #body>
        <slot name="trigger"></slot>
      </template>
      <template #dropdown>
        <div class="v-tooltip__content" :class="{ 'v-tooltip__content--top': top }" :style="{ maxWidth: `${ width }px` }"><slot name="content"></slot></div>
      </template>
    </v-positioner>
  </div>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    width: {
      type: Number,
      default: 250,
    },
    top: Boolean,
    isTriggerFocused: Boolean,
  },
  data() {
    return {
      isHovered: false,
      timeout: null
    }
  },
  methods: {
    clearTimeout() {
      if (!this.timeout) return;
      clearTimeout(this.timeout);
      this.timeout = null;
    },
    handleHover() {
      this.clearTimeout();
      this.isHovered = true;
    },
    handleHoverOut() {
      this.timeout = setTimeout(()=>this.isHovered=false, 500);
    },
  }
}
</script>

<style lang="scss" scoped>
.v-tooltip {
  &__content {
    position: relative;
    background: $primary-ds-800;
    outline: 1px solid $black-10;
    border-radius: $border-radius-small;
    padding: .5rem .75rem;

    color: $black-10;
    font-weight: $fw-regular;
    font-size: $fs-xxs;
    line-height: $lh-small;

    &::after {
      content: '';
      position: absolute;
      left: calc(50% - 2px);
      top: -2px;
      transform: rotate(45deg);

      width: 4px;
      height: 4px;
      background: $primary-ds-800;
    }

    &--top::after {
      top: unset !important;
      bottom: -2px;
      transform: rotate(45deg);
    }
  }
}
</style>