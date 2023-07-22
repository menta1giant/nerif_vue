<template>
  <v-section responsive>
    <div class="documentation-article">
      <h2 class="h2">{{ article?.header }}</h2>
      <p>
        {{ article?.content }}
      </p>
    </div>
  </v-section>
</template>

<script>
import { apiRequestGet } from '@/lib/api';

export default {
  name: 'DocumentationArticle',
  props: {
    title: String,
  },
  async beforeRouteEnter(to, from, next) {
    const article = await apiRequestGet(`content/documentation/articles/${ to.params.id }`);
    next(vm => {
      vm.$store.commit('setBreadcrumbsTitle', `Article #${ to.params.id }`);
      vm.article = article;
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
.documentation-article {
  max-width: 52rem;

  display: grid;
  gap: .5rem;

  h2 {
    @include divider-bottom;

    padding-bottom: 1rem;
    margin-bottom: 1rem;

    color: $primary-s-700;
    font-weight: $fw-semi-bold;
  }

  p {
    font-size: $fs-large;
    line-height: $lh-body;
  }
}
</style>