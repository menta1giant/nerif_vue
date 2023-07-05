<template>
  <v-section responsive>
    <div class="documentation-article">
      <h2>How accurate are your CS:GO predictions compared to other betting services in the market?</h2>
      <p>
        Our CS:GO prediction algorithm has consistently demonstrated high accuracy rates, outperforming many competitors in the industry. Our focus on advanced data analysis and real-time updates sets us apart.
      </p>
    </div>
  </v-section>
</template>

<script>
export default {
  name: 'DocumentationArticle',
  props: {
    title: String,
  },
  beforeRouteEnter(to, from, next) {
    console.log(from);
    next(vm => vm.$store.commit('setBreadcrumbsTitle', `Article #${ to.params.id }`));
  },
}
</script>

<style lang="scss" scoped>
.documentation-article {
  max-width: 52rem;

  display: grid;
  gap: 1rem;

  h2 {
    @include divider-bottom;

    padding-bottom: 1.5rem;
    margin-bottom: 1.5rem;

    color: $primary-s-700;
    font-weight: $fw-semi-bold;
  }

  p {
    font-size: $fs-large;
    line-height: $lh-body;
  }
}
</style>