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
@import '@/assets/styles/Blog/blog-post.scss';
</style>