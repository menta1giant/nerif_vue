<template>
  <v-section responsive>
    <div class="blog-post">
      <div class="blog-post__header">
        <div class="blog-post__tags">
          <span>News</span>
          <span>Updates</span>
        </div>
        <div class="blog-post__title">
          <h2>{{ title }}</h2>
          <v-tooltip>
            <template #trigger>
              <v-icon name="bookmark"/>
            </template>
            <template #content>
              Save post
            </template>
          </v-tooltip>
        </div>
        <div class="blog-post__meta-info"><span>by <b>{{ author }}</b></span><span>2024-20-05</span></div>
      </div>
      <div class="blog-post__body">
        <p><slot>Today we are celebrating the new era of Nerif technology with the ability to write not just one or two, but three and more lines of text to describe an article at our blog which nobody will ever see!</slot></p>
      </div>
    </div>
  </v-section>
</template>

<script>
export default {
  name: 'BlogPost',
  beforeRouteEnter(to, from, next) {
    console.log(to);
    next(vm => vm.$store.commit('setBreadcrumbsTitle', `Blog post #${ to.params.id }`));
  },
  props: {
    title: {
      type: String,
      default: 'Default title',
    },
    author: {
      type: String,
      default: 'Selena Gomez',
    },
  }
}
</script>

<style lang="scss" scoped>
.blog-post {
  display: grid;
  gap: 1rem;

  max-width: 40rem;

  &__header {
    @include divider-bottom;

    display: grid;
    gap: .5rem;

    padding-bottom: 1rem;
  }

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .v-icon {
      font-size: $fs-h4;
    }
  }

  &__tags {
    display: flex;
    gap: .75rem;

    span {
      background: green;
      padding: .5rem 1.75rem;
      color: white;
      border-radius: $border-radius-large;
      font-size: $fs-xxs;
      line-height: 1.2;
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
</style>