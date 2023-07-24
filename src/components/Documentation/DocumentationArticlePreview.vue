<template>
  <article class="documentation-article-preview">
    <router-link :to="`/documentation/${ id }`"><span class="documentation-article-preview__title">{{ title }}</span></router-link>
    <p>
      <slot></slot>
    </p>
  </article>
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
@import '@/assets/styles/Documentation/documentation-article-preview.scss';
</style>