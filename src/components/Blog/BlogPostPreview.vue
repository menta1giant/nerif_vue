<template>
  <article class="blog-post-preview">
    <div class="blog-post-preview__image">
      <img :src="imageUrl"/>
      <div class="blog-post-preview__tags">
        <div v-for="tag in tags" :key="tag.name" class="blog-post__tag" :class="[`blog-post__tag--${ tag.name.toLowerCase() }`]">{{ tag.name }}</div>
      </div>
    </div>
    <div class="blog-post-preview__body">
      <div class="blog-post-preview__header"><span class="blog-post-preview__title" @click="$emit('open')">{{ title }}</span><save-bookmark-button :id="id" /></div>
      <p><slot></slot></p>
      <div class="blog-post-preview__footer"><span>by <b>{{ author }}</b></span><span><time>{{ date_published }}</time></span></div>
    </div>
  </article>
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