<template>
  <v-section responsive>
    <div class="posts-wrapper" v-if="posts.length || isGlobalLoading">
      <template v-if="isGlobalLoading">
        <blog-post-preview-skeleton v-for="_, idx in (new Array(3))" :key="`post_skeleton_${ idx }`"/>
      </template>
      <template v-else>
        <blog-post-preview v-for="post in posts" :key="`post_${ post.id }`" v-bind="post">
          {{ post.content }}
        </blog-post-preview>
      </template>
    </div>
    <template v-else>
      <p>Unfortunately, there are no posts to show.</p>
    </template>
  </v-section>
</template>

<script>
import { apiRequestGet } from '@/lib/api';
import BlogPostPreview from './BlogPostPreview';
import BlogPostPreviewSkeleton from './BlogPostPreviewSkeleton';
import loadingMixin from '@/components/mixins/loadingMixin.js';

export default {
  name: 'BlogRoot',
  components: {
    BlogPostPreview,
    BlogPostPreviewSkeleton,
  },
  mixins: [loadingMixin],
  async created() {
    this.changeLoadingStatus(true);
    await this.fetchPosts(this.$route.query.search);
    this.changeLoadingStatus(false);
  },
  data() {
    return {
      posts: [],
    }
  },
  watch: {
    '$route.query': {
      handler() {
        if (this.isGlobalLoading) return;
        const searchQuery = this.$route.query['search'];

        this.fetchPosts(searchQuery);
      }
    },
  },
  methods: {
    async fetchPosts(searchQuery) {
      this.changeLoadingStatus(true);
      let query = searchQuery ? { search: searchQuery } : '';

      const posts = await apiRequestGet('content/blog/posts', query);

      this.posts = posts;
      this.changeLoadingStatus(false);
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Blog/blog.scss';
</style>