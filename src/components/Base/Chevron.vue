<template>
  <div class="v-chevron" :class="{ 'v-chevron--active': modelValue }" @click="toggleChevron">
    <v-icon type="solid" name="chevron-down" />
  </div>
</template>

<script>

export default {
  name: 'Chevron',
  props: {
    modelValue: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  methods: {
    toggleChevron() {
      this.$emit('update:modelValue', !this.modelValue);
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Base/chevron.scss';
</style>