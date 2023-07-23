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
@import '@/assets/styles/Base/tooltip.scss';
</style>