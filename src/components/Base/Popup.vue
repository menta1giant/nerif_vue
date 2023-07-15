<template>
  <v-positioner v-model="isVisible" :position="left ? 'left' : 'center'" :horizontal-margin="horizontalMargin" triggers-on-click>
    <template #body>
      <slot name="trigger"></slot>
    </template>
    <template #dropdown>
      <div class="v-popup">
        <slot name="content"></slot>
        <div class="v-popup__close" @click="closePopup"><v-icon name="xmark" /></div>
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
  },
  methods: {
    closePopup() {
      this.isVisible = false;
    },
  },
}
</script>

<style lang="scss" scoped>
.v-popup {
  background: $black-10;
  border-radius: $border-radius-small;
  padding: .5rem;

  &__close {
    position: absolute;
    right: 12px;
    top: 12px;
    
    font-size: $fs-large;
    color: $primary-ds-300;

    cursor: pointer;
  }
}

</style>