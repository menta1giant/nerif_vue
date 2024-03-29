<template>
  <sections-navigation v-model="selectedSection" :sections="sections" :sections-counts="articlesCounts" :loading="isGlobalLoading" />
  <v-section responsive>
    <div class="documentation-articles-wrapper">
      <template v-if="articles.length">
        <documentation-article-preview v-for="(article, idx) in articles" :key="`article_${ idx }`" :title="article.header" :id="article.id">
          {{ article.content }}
        </documentation-article-preview>
      </template>
      <empty-results-warning v-else-if="!isGlobalLoading" style="margin-top: 2rem">
        Unfortunately, there are no articles to show.
      </empty-results-warning>
    </div>
  </v-section>
</template>

<script>
import SectionsNavigation from '@/components/Navigation/SectionsNavigation.vue';
import DocumentationArticlePreview from '@/components/Documentation/DocumentationArticlePreview.vue';
import EmptyResultsWarning from '@/components/modules/EmptyResultsWarning.vue';
import { apiRequestGet, apiRequestGetWithCache } from '@/lib/api';
import loadingMixin from '@/components/mixins/loadingMixin.js';

export default {
  name: 'DocumentationRoot',
  components: {
    SectionsNavigation,
    DocumentationArticlePreview,
    EmptyResultsWarning,
  },
  mixins: [loadingMixin],
  async created() {
    this.changeLoadingStatus(true);
    await this.fetchSections();
    await this.fetchArticles(this.$route.query.search);
    this.changeLoadingStatus(false);
  },
  data() {
    return {
      sections: ['General questions', 'Payment', 'Telegram feed', 'Personalized dashboards', 'Customer support', 'Special features'],
      selectedSection: 0,
      articles: [],
      articlesCounts: {},
      searchQuery: false,
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
        if (this.isGlobalLoading) return;
        const searchQuery = this.$route.query['search'];

        this.fetchArticles(searchQuery);
      }
    },
  },
  methods: {
    async fetchSections() {
      this.changeLoadingStatus(true);
      const sections = await apiRequestGetWithCache('content/documentation/sections', { cacheProp: 'documentationSections' });

      this.sections = sections;
      this.changeLoadingStatus(false);
    },
    async fetchArticles(searchQuery) {
      this.changeLoadingStatus(true);
      let query = { section: this.sections[this.selectedSection].id }
      if (searchQuery) {
        this.searchQuery = searchQuery;
      }

      if (this.searchQuery) {
        query.search = this.searchQuery;
      }

      const { articles, counts } = await apiRequestGet('content/documentation/articles', query);

      this.articles = articles;
      this.articlesCounts = this.searchQuery ? counts : {};
      this.changeLoadingStatus(false);
    },
  },
}
</script>