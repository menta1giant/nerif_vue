<template>
  <v-button type="transparent" :size="size"><v-icon name="file" /><span><slot></slot></span></v-button>
</template>

<script>
export default {
  name: 'UploadButton',
  props: {
    size: String,
  },
}
</script>

<style lang="scss" scoped>
.v-icon {
  color: $primary-ds-200;
}

span {
  text-decoration: dashed underline;
  text-underline-offset: 8px;
}
</style>