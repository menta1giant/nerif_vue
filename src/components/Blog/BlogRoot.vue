<template>
  <v-section responsive>
    <div class="posts-wrapper">
      <blog-post-preview v-for="(post, idx) in posts" :key="`post_${ idx }`" @open="$router.push({ name: 'post', params: { id: idx }})"/>
    </div>
  </v-section>
</template>

<script>
import BlogPostPreview from './BlogPostPreview';

export default {
  name: 'BlogRoot',
  components: {
    BlogPostPreview,
  },
  data() {
    return {
      posts: new Array(20),
    }
  }
}
</script>

<style lang="scss" scoped>
.posts-wrapper {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;

  width: 100%;
  padding-bottom: var(--container-padding-block);
}
</style>