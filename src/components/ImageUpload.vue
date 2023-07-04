<template>
  <div class="image-upload">
    <v-label v-if="label">{{ label }}</v-label>
    <img src="@/assets/images/logo.png" width="100" height="100"/>
    <v-button type="transparent" size="small">Upload photo</v-button>
  </div>
</template>

<script>
export default {
  name: 'ImageUpload',
  props: {
    label: String,
  },
}
</script>

<style lang="scss" scoped>
.image-upload {
  display: flex;
  flex-direction: column;
}
</style>