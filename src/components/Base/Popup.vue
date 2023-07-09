<template>
  <v-positioner v-model="isVisible" :position="left ? 'left' : 'center'" :horizontal-margin="horizontalMargin" triggers-on-click>
    <template #body>
      <slot name="trigger"></slot>
    </template>
    <template #dropdown>
      <div class="v-popup">
        <slot name="content"></slot>
      </div>
    </template>
  </v-positioner>
</template>

<script>
export default {
  name: 'Popup',
  props: {
    modelValue: Boolean,
    horizontalMargin: {
      type: Number,
      default: 28,
    },
    left: Boolean,
  },
  data() {
    return {
      isVisible: false,
    };
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(val) {
        this.isVisible = val;
      }
    },
    isVisible: {
      handler(val) {
        this.$emit('update:modelValue', val);
      }
    },
    $route() {
      this.isVisible = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.v-popup {
  background: $black-10;
  border-radius: $border-radius-small;
  padding: .5rem;
}

</style>