<template>
  <div class="documentation-article-preview">
    <router-link :to="`/documentation/${ id }`"><h5>{{ title }}</h5></router-link>
    <p>
      <slot></slot>
    </p>
  </div>
</template>

<script>
export default {
  name: 'DocumentationArticlePreview',
  props: {
    title: String,
    id: Number,
  },
}
</script>

<style lang="scss" scoped>
.documentation-article-preview {
  max-width: 40rem;
  padding-block: 2rem;

  display: grid;
  gap: 1rem;

  h5 {
    color: $primary-s-700;
    font-size: $fs-large;
    line-height: $lh-large;
    font-weight: $fw-semi-bold;

    cursor: pointer;
  }

  p {
    padding-left: 1rem;
    border-left: 3px solid $primary-s-400;

    font-size: $fs-medium;
    line-height: $lh-body;
  }

  & + .documentation-article-preview {
    @include divider-top;
  }
}
</style>