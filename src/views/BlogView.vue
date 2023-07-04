<template>
  <v-section responsive>
    <div class="posts-wrapper">
      <blog-post />
      <blog-post />
      <blog-post />
      <blog-post />
      <blog-post />
      <blog-post />
      <blog-post />
      <blog-post />
      <blog-post />
      <blog-post />
      <blog-post />
      <blog-post />
      <blog-post />
      <blog-post />
      <blog-post />
      <blog-post />
      <blog-post />
    </div>
  </v-section>
</template>

<script>
import BlogPost from '@/components/Blog/BlogPost';

export default {
  name: 'BlogView',
  components: {
    BlogPost,
  },
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