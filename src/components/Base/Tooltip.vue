<template>
  <div class="v-tooltip">
    <v-positioner v-model="isShown" position="center">
      <template v-slot:body>
        <slot name="trigger"></slot>
      </template>
      <template v-slot:dropdown>
        <div class="v-tooltip__content" :style="{ maxWidth: `${ width }px` }"><slot name="content"></slot></div>
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
  },
  data() {
    return {
      isShown: false,
    }
  }
}
</script>

<style lang="scss" scoped>
.v-tooltip__content {
  position: relative;
  background: $primary-ds-800;
  border-radius: $border-radius-small;
  padding: .5rem .75rem;

  color: $black-10;
  font-weight: $fw-regular;
  font-size: $fs-xxs;
  line-height: $lh-small;
}

.v-tooltip__content::after {
  content: '';
  position: absolute;
  left: calc(50% - 2px);
  top: -2px;
  transform: rotate(45deg);

  width: 4px;
  height: 4px;
  background: $primary-ds-800;
}

</style>