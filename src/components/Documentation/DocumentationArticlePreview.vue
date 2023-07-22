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
@import '@/assets/styles/Documentation/documentation-article-preview.scss';
</style>