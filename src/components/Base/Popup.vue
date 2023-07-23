<template>
  <v-positioner v-model="isShown" :position="left ? 'left' : 'center'" :horizontal-margin="horizontalMargin" triggers-on-click>
    <template #body>
      <slot name="trigger"></slot>
    </template>
    <template #dropdown>
      <div class="v-popup">
        <slot name="content"></slot>
        <div v-if="showX" class="v-popup__close" @click="closePopup"><v-icon name="xmark" /></div>
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
    showX: Boolean,
  },
  data() {
    return {
      isShown: false,
    };
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(val) {
        this.isShown = val;
      }
    },
    isShown: {
      handler(val) {
        this.$emit('update:modelValue', val);
      }
    },
    '$route.path': {
      handler() {
        this.closePopup();
      }
    }
  },
  methods: {
    closePopup() {
      this.isShown = false;
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Base/popup.scss';

</style>