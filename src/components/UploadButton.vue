<template>
  <div class="upload-button">
    <input 
      ref="file-input" 
      :id="id" 
      :name="name" 
      type="file" 
      :accept="accept"
      :multiple="multiple"
      @change="updateFileName" 
    >
    <v-button type="transparent" :size="size" @click="$refs['file-input'].click()"><v-icon name="file" /><span><slot>Upload files</slot></span></v-button>
    <div 
      class="upload-button__file-name"
      v-for="fileName in uploadedFileNames"
      :key="fileName"
    >{{ fileName }}</div>
  </div>
</template>

<script>
export default {
  name: 'UploadButton',
  props: {
    size: String,
    id: {
      type: String,
      default: 'file-input',
    },
    name: String,
    accept: {
      type: String,
      default: 'image/*',
    },
    multiple: Boolean,
  },
  data() {
    return {
      uploadedFileNames: [],
      imageSource: null,
    }
  },
  methods: {
    updateFileName(event) {
      this.uploadedFileNames = Array.from(event.target.files).map(file=>file.name);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/upload-button.scss';
</style>