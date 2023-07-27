<template>
  <v-section responsive>
    <div class="documentation-article">
      <h1 class="documentation-article__title h2 header-common">{{ article?.header }}</h1>
      <p>
        {{ article?.content }}
      </p>
    </div>
  </v-section>
</template>

<script>
import { apiRequestGet } from '@/lib/api';
import { setMetaData } from '@/lib/meta';
import { showPageLoader, finishPageLoading } from '@/lib/loading';

export default {
  name: 'DocumentationArticle',
  props: {
    title: String,
  },
  async beforeRouteEnter(to, from, next) {
    showPageLoader();
    const article = await apiRequestGet(`content/documentation/articles/${ to.params.id }`);
    next(vm => {
      vm.$store.commit('setBreadcrumbsTitle', `Article #${ to.params.id }`);
      vm.article = article;

      setMetaData({
        title: vm.article.header,
        description: to.meta.description,
      })

      finishPageLoading();
    });
  },
  data() {
    return {
      article: null,
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Documentation/documentation-article.scss';
</style>