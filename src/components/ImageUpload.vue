<template>
  <div class="image-upload">
    <label :for="id">
      <img 
        ref="image" 
        src="@/assets/images/logo-desat-small.webp" 
        :srcset="imageSource" 
        width="160" 
        height="160"
        class="image-upload__image"
        :class="{ 'image-upload__image--loading': imageSource === null }"
      />
    </label>
    <upload-button size="small" :id="id" :name="name" @change="processFile">Upload photo</upload-button>
  </div>
</template>

<script>
import formFieldMixin from '@/components/mixins/formFieldMixin.js';
import UploadButton from './UploadButton';
import { getImageUrl } from '@/lib/image';

export default {
  name: 'ImageUpload',
  components: {
    UploadButton,
  },
  mixins:[formFieldMixin],
  data() {
    return {
      imageSource: null,
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (val instanceof File || !val) return;

        this.setImageSource(getImageUrl(val));
      }
    }
  },
  methods: {
    setImageSource(src) {
      this.imageSource = src;
    },
    processFile(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        this.setImageSource(e.target.result);
      }

      reader.readAsDataURL(file);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/image-upload.scss';
</style>