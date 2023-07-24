<template>
  <article class="documentation-article-preview">
    <router-link :to="`/documentation/${ id }`" class="link-text"><span class="documentation-article-preview__title text-large">{{ title }}<v-icon name="arrow-right"/></span></router-link>
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