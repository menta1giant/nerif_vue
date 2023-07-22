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
.upload-button {
  input {
    display: none;
  }

  &__file-name {
    @include text-xxs;

    margin: .5rem 0 0 1.5rem;

    color: $primary-ds-500;
  }
}
.v-icon {
  color: $primary-ds-200;
}

span {
  text-decoration: dashed underline;
  text-underline-offset: 8px;
}
</style>