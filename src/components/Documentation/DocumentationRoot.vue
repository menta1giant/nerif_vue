<template>
  <sections-navigation v-model="selectedSection" :sections="sections" />
  <v-section responsive>
    <div class="documentation-articles-wrapper">
      <documentation-article-preview v-for="(article, idx) in articles" v-bind:key="`article_${ idx }`" title="How accurate are your CS:GO predictions compared to other betting services in the market?" @open="$router.push(`/documentation/${ idx }`)">
        Our CS:GO prediction algorithm has consistently demonstrated high accuracy rates, outperforming many competitors in the industry. Our focus on advanced data analysis and real-time updates sets us apart.
      </documentation-article-preview>
    </div>
  </v-section>
</template>

<script>
import SectionsNavigation from '@/components/Navigation/SectionsNavigation.vue';
import DocumentationArticlePreview from '@/components/Documentation/DocumentationArticlePreview.vue';

export default {
  name: 'DocumentationRoot',
  components: {
    SectionsNavigation,
    DocumentationArticlePreview,
  },
  data() {
    return {
      sections: ['General questions', 'Payment', 'Telegram feed', 'Personalized dashboards', 'Customer support', 'Special features'],
      selectedSection: 0,
      articles: new Array(10),
    };
  },
}
</script>

<style lang="scss" scoped>
</style>