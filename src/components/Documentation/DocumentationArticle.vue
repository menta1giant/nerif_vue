<template>
  <div class="documentation-article">
    <h5>{{ title }}</h5>
    <p>
      <slot></slot>
    </p>
  </div>
</template>

<script>
export default {
  name: 'DocumentationArticle',
  props: {
    title: String,
  },
}
</script>

<style lang="scss" scoped>
.documentation-article {
  @include divider-bottom;

  max-width: 40rem;
  padding-block: 2rem;

  display: grid;
  gap: 1rem;

  h5 {
    color: $primary-s-700;
    font-size: $fs-large;
    line-height: $lh-large;
    font-weight: $fw-semi-bold;
  }

  p {
    padding-left: 1rem;
    border-left: 3px solid $primary-s-400;

    font-size: $fs-medium;
    line-height: $lh-body;
  }
}
</style>