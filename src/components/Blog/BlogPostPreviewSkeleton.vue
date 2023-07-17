<template>
  <div class="blog-post">
    <div class="blog-post__image">
      <animated-placeholder />
    </div>
    <div class="blog-post__body">
      <div class="blog-post__header"><animated-placeholder height="28px" width="50%" /></div>
      <p><animated-placeholder height="64px" width="95%" /></p>
      <div class="blog-post__footer"><animated-placeholder height="24px" width="80%" /></div>
    </div>
  </div>
</template>

<script>
import { getImageUrl } from '@/lib/image';
import AnimatedPlaceholder from '@/components/AnimatedPlaceholder';

export default {
  name: 'BlogPostPreview',
  components: {
    AnimatedPlaceholder,
  },
  emits: ['open'],
  props: {
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