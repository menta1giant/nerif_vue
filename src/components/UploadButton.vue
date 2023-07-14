<template>
  <div class="upload-button">
    <v-button type="transparent" :size="size"><v-icon name="file" /><span><slot>Upload files</slot></span></v-button>
  </div>
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