<template>
  <div class="blog-post">
    <div class="blog-post__image">
      <img :src="imageUrl"/>
      <div class="blog-post__tags">
        <div v-for="tag in tags" :key="tag.name" class="blog-post__tag" :class="[`blog-post__tag--${ tag.name.toLowerCase() }`]">{{ tag.name }}</div>
      </div>
    </div>
    <div class="blog-post__body">
      <div class="blog-post__header"><h5 @click="$emit('open')">{{ title }}</h5><save-bookmark-button :id="id" /></div>
      <p><slot></slot></p>
      <div class="blog-post__footer"><span>by <b>{{ author }}</b></span><span><time>{{ date_published }}</time></span></div>
    </div>
  </div>
</template>

<script>
import { getImageUrl } from '@/lib/image';
import SaveBookmarkButton from './SaveBookmarkButton.vue';

export default {
  name: 'BlogPostPreview',
  components: {
    SaveBookmarkButton
  },
  emits: ['open'],
  props: {
    id: Number,
    title: String,
    date_published: String,
    author: String,
    tags: Array,
    cover: String,
  },
  computed: {
    imageUrl() {
      return getImageUrl(this.cover);
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Blog/blog-post-preview.scss';
</style>