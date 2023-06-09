<template>
    <i :class="iconClasses"></i>
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