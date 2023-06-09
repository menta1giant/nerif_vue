<template>
  <div class="label">
    <slot>{{ msg }}</slot>
  </div>
</template>

<script>
export default {
  name: 'Label',
  props: {
    msg: {
      type: String,
      default: '123',
    },
  }
}
</script>

<style lang="scss" scoped>
.label {
    white-space: nowrap;
    overflow-y: hidden;
    overflow-y: visible;
    text-overflow: ellipsis;

    font-weight: $fw-regular;
    color: $primary-ds-900;
    font-size: $fs-xs;
    line-height: $lh-small;

    flex: 1;
}
</style>