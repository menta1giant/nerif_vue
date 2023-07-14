<template>
  <div class="image-upload">
    <label :for="id"><img :src="imgSrc" width="100" height="100"/></label>
    <input 
      ref="porvafor" 
      :id="id" 
      :name="name" 
      type="file" 
      accept="image/*" 
      @change="processFile"
    >
    <upload-button size="small" @click="$refs.porvafor.click()">Upload photo</upload-button>
    <div class="image-upload__file-name">{{ cringe }}</div>
  </div>
</template>

<script>
import formFieldMixin from './Base/formFieldMixin';
import UploadButton from './UploadButton';
import { BACKEND_URL } from '@/lib/config';

export default {
  name: 'ImageUpload',
  components: {
    UploadButton,
  },
  mixins:[formFieldMixin],
  data() {
    return {
      cringe: null,
    }
  },
  computed: {
    imgSrc() {
      return `${BACKEND_URL}${this.value}`;
    },
  },
  methods: {
    processFile() {
      console.dir(this.$refs.porvafor);
      this.cringe = this.$refs.porvafor?.files?.[0]?.name;
    }
  }
}
</script>

<style lang="scss" scoped>
.image-upload {
  display: flex;
  flex-direction: column;

  width: min-content;

  input[type=file] {
    display: none;
  }

  &__file-name {
    margin-left: 1.5rem;
    margin-top: .5rem;

    font-size: $fs-xxs;
    line-height: $lh-small;
    color: $primary-ds-500;
  }

  img {
    margin: auto;
  }
}
</style>