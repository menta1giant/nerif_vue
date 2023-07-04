<template>
  <div class="image-upload">
    <v-label v-if="label">{{ label }}</v-label>
    <img src="@/assets/images/logo.png" width="100" height="100"/>
    <upload-button size="small">Upload photo</upload-button>
  </div>
</template>

<script>
import UploadButton from './UploadButton';

export default {
  name: 'ImageUpload',
  components: {
    UploadButton,
  },
  props: {
    label: String,
  },
}
</script>

<style lang="scss" scoped>
.image-upload {
  display: flex;
  flex-direction: column;

  width: min-content;
}
</style>