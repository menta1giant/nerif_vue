<template>
  <v-section responsive>
    <div class="blog-post">
      <div class="blog-post__header">
        <div class="blog-post__tags">
          <span v-for="tag in tags" :key="tag.name" class="blog-post__tag" :class="[`blog-post__tag--${ tag.name.toLowerCase() }`]">{{ tag.name }}</span>
        </div>
        <div class="blog-post__title">
          <h1 class="h2 text-semi-bold">{{ title }}</h1>
          <save-bookmark-button :id="id" />
        </div>
        <div class="blog-post__meta-info"><span>by <b>{{ author }}</b></span><span><time>{{ date_published }}</time></span></div>
      </div>
      <div class="blog-post__body">
        <p v-html="content"></p>
      </div>
      <img :src="imageUrl" width="400" height="400"/>
    </div>
  </v-section>
</template>

<script>
import { apiRequestGet } from '@/lib/api';
import { getImageUrl } from '@/lib/image';
import SaveBookmarkButton from './SaveBookmarkButton.vue';

export default {
  name: 'BlogPost',
  components: {
    SaveBookmarkButton,
  },
  async beforeRouteEnter(to, from, next) {
    const post = await apiRequestGet(`content/blog/posts/${ to.params.id }`);
    next(vm => {
      ({ title: vm.title, content: vm.content, author: vm.author, date_published: vm.date_published, tags: vm.tags, cover: vm.cover } = post);
      vm.$store.commit('setBreadcrumbsTitle', `Blog post #${ to.params.id }`);
    });
  },
  data() {
    return {
      id: Number(this.$route.params.id),
      title: '',
      content: '',
      author: '',
      date_published: '',
      tags: [],
      cover: '',
    }
  },
  computed: {
    imageUrl() {
      return getImageUrl(this.cover);
    },
  }
}
</script>

<style lang="scss" scoped>
.blog-post {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-auto-flow: column;
  gap: 1rem;

  width: 100%;

  padding-bottom: 1rem;

  &__header {
    @include divider-bottom;
    @include flex-column;
    gap: .5rem;

    padding-bottom: 1rem;
  }

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:deep(.v-icon) {
      @include text-h4;
    }
  }

  &__tags {
    display: flex;
    gap: .75rem;

    span {
      padding: .5rem 1.75rem;
      border-radius: $border-radius-large;

      font-size: $fs-xs;
      font-weight: $fw-bold;
      line-height: $lh-body;
    }
  }

  &__meta-info {
    display: flex;
    gap: 1.5rem;
  }

  &__body p {
    line-height: $lh-body;
  }
}

img {
  grid-row: 1/10;
  margin-left: auto;

  object-fit: cover;
  border: 1px solid $primary-ds-100;
  box-shadow: 0 0 2px 1px $primary-ds-100;
}

@media screen and (max-width: $mobile-breakpoint) {
  .blog-post {
    grid-auto-flow: row;
    grid-template-rows: auto;
  }

  img {
    grid-row: unset;
    margin: auto;
  }
}

@import '@/assets/styles/Blog/blog-post-tag.scss';
</style>