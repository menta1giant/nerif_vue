<template>
  <sections-navigation v-model="selectedSection" :sections="sections" :sections-counts="articlesCounts" />
  <v-section responsive>
    <div class="documentation-articles-wrapper">
      <documentation-article-preview v-for="(article, idx) in articles" :key="`article_${ idx }`" :title="article.header" @open="$router.push(`/documentation/${ article.id }`)">
        {{ article.content }}
      </documentation-article-preview>
    </div>
  </v-section>
</template>

<script>
import SectionsNavigation from '@/components/Navigation/SectionsNavigation.vue';
import DocumentationArticlePreview from '@/components/Documentation/DocumentationArticlePreview.vue';
import { apiRequestGet, apiRequestGetWithCache } from '@/lib/api';

export default {
  name: 'DocumentationRoot',
  components: {
    SectionsNavigation,
    DocumentationArticlePreview,
  },
  async created() {
    this.isLoading = true;
    await this.fetchSections();
    await this.fetchArticles(this.$route.query);
    this.isLoading = false;
  },
  data() {
    return {
      sections: ['General questions', 'Payment', 'Telegram feed', 'Personalized dashboards', 'Customer support', 'Special features'],
      selectedSection: 0,
      articles: [],
      articlesCounts: {},
      searchQuery: false,

      isLoading: true,
    };
  },
  watch: {
    selectedSection: {
      handler() {
        this.fetchArticles();
      }
    },
    '$route.query': {
      handler() {
        if (this.isLoading) return;
        const searchQuery = this.$route.query['search'];
        console.log('a');
        if (!searchQuery) return;
        this.fetchArticles(searchQuery);
      }
    },
    // INSTEAD OF THIS DISABLE SEARCH INPUT ON LOADING AND MAKE DEBOUNCE TIME LONGER
    isLoading(val) {
      const searchQuery = this.$route.query['search'];
      if (!val && this.searchQuery !== searchQuery) {
        this.fetchArticles(searchQuery);
      }
    }
  },
  methods: {
    async fetchSections() {
      this.isLoading = true;
      const sections = await apiRequestGetWithCache('content/documentation/sections', { cacheProp: 'documentationSections' });

      this.sections = sections;
      this.isLoading = false;
    },
    async fetchArticles(searchQuery) {
      this.isLoading = true;
      let query = { section: this.sections[this.selectedSection].id }
      if (searchQuery) {
        query.search = searchQuery;
        this.searchQuery = searchQuery;
      }

      const { articles, counts } = await apiRequestGet('content/documentation/articles', query);

      this.articles = articles;
      this.articlesCounts = counts;
      this.isLoading = false;
    },
  },
}
</script>

<style lang="scss" scoped>
</style>