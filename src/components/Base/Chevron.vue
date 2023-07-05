<template>
  <div class="v-chevron" :class="{ 'v-chevron--active': modelValue }" @click="toggleChevron">
    <v-icon type="solid" name="chevron-up" />
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
.v-chevron {
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: .8em;
  margin-left: .25rem;
  border-radius: 50%;
  aspect-ratio: 1;
  height: 1.5em;

  cursor: pointer;

  transition-duration: 300ms;
  transform: translateY(2px);

  &--active {
    rotate: 180deg;
    transform: translateY(0px);
  }
}
</style>