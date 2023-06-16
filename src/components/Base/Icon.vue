<template>
    <div class="v-icon"><i :class="iconClasses"></i></div>
</template>

<script>

export default {
  name: 'Icon',
  props: {
    type: {
      type: String,
      default: 'solid',
    },
    name: {
      type: String,
      default: '',
    },
  },
  computed: {
    iconClasses() {
      return `fa-${ this.type } fa-${ this.name }`;
    },
  },
}
</script>

<style lang="scss" scoped>
.v-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 1.2em;
  aspect-ratio: 1 / 1;
}
</style>