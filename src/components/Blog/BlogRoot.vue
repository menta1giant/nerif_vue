<template>
  <v-section responsive>
    <div class="posts-wrapper">
      <blog-post-preview v-for="post in posts" :key="`post_${ post.id }`" v-bind="post" @open="$router.push({ name: 'post', params: { id: post.id }})">
        {{ post.content }}
      </blog-post-preview>
    </div>
  </v-section>
</template>

<script>
import { apiRequestGet } from '@/lib/api';
import BlogPostPreview from './BlogPostPreview';

export default {
  name: 'BlogRoot',
  components: {
    BlogPostPreview,
  },
  async beforeRouteEnter(to, from, next) {
    const posts = await apiRequestGet('content/blog/posts');
    next(vm => {
      vm.posts = posts;
    });
  },
  data() {
    return {
      posts: [],
    }
  },
  methods: {
    async fetchPosts() {
      const posts = await apiRequestGet('content/blog/posts');

      this.posts = posts;
    },
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