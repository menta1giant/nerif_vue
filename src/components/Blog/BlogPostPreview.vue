<template>
  <div class="blog-post">
    <div class="blog-post__image">
      <img :src="imageUrl"/>
      <div v-for="tag in tags" :key="tag.name" class="blog-post__tag">{{ tag.name }}</div>
    </div>
    <div class="blog-post__body">
      <div class="blog-post__header"><h5 @click="$emit('open')">{{ title }}</h5><v-icon name="bookmark"/></div>
      <p><slot></slot></p>
      <div class="blog-post__footer"><span>by <b>{{ author }}</b></span><span><time>{{ date_published }}</time></span></div>
    </div>
  </div>
</template>

<script>
import { getImageUrl } from '@/lib/image';

export default {
  name: 'BlogPostPreview',
  emits: ['open'],
  props: {
    title: String,
    date_published: String,
    author: String,
    tags: Array,
    cover: String,
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
  display: flex;
  flex-direction: column;

  background: white;

  min-height: 100px;
  border: 1px solid $primary-ds-100;
  border-radius: $border-radius-large;

  overflow: hidden;

  &:not(:nth-child(n+4)) {
    grid-column: span 2;

    img {
      height: 25vh;
    }

    @media screen and (max-width: $tablet-breakpoint) {
      grid-column: span 3;

      img {
        height: 10vh;
      }
    } 
  }

  &:nth-child(n+4) {
    p {
      display: none;
    }

    h5 {
      font-size: .8em;
    }

    span:last-child:before {
      display: none !important;
    }
  }

  @media screen and (max-width: $tablet-breakpoint) {
    &:not(:nth-child(n+3)) {
      grid-column: span 3;

      img {
        height: 20vh;
      }
    }

    &:nth-child(n+3) {
      grid-column: span 2;

      img {
        height: 10vh;
      }

      p {
        display: none;
      }

      h5 {
        font-size: .8em;
      }

      span:last-child:before {
        display: none !important;
      }
    }
  } 

  @media screen and (max-width: $mobile-breakpoint) {
    &:not(:nth-child(n+2)) {
      grid-column: span 6;

      img {
        height: 35vh;
      }
    }

    &:nth-child(n+2) {
      grid-column: span 3;

      img {
        height: 15vh;
      }

      p {
        display: none;
      }

      h5 {
        font-size: .8em;
      }

      span:last-child:before {
        display: none !important;
      }
    }
  } 

  &__image {
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__tag {
    position: absolute;
    bottom: 8px;
    left: 8px;

    background: $green-100;
    padding: 0 1rem;

    border-radius: 20px;

    font-family: $ff-display;
    font-weight: $fw-semi-bold;
    font-size: $fs-xxs;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: .75rem;
    flex: 1;

    padding: 1rem;

    font-size: $fs-large;

    h5 {
      color: $primary-s-700;
      font-weight: $fw-semi-bold;
      line-height: 1.4;
    }

    p {
      font-size: $fs-xs;
      line-height: $lh-body;
    }

  }

  &__header {
    display: flex;
    justify-content: space-between;
    gap: .5rem;

    cursor: pointer;
  }

  &__footer {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    align-items: flex-end;

    font-size: $fs-xxs;

    margin-top: auto;

    span:first-child {
      margin-right: .5rem;
    }

    span:last-child {
      color: $primary-ds-500;
    }

    span:last-child:before {
      content: '\2022';
      margin-right: .5rem;
    }
  }

  .v-icon {
    color: $black-250;
  }

  &--bookmark .v-icon {
    color: $accent-500;
  }
}
</style>