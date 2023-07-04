<template>
  <div class="blog-post">
    <div class="blog-post__image">
      <img src="@/assets/images/blog-post1.png"/>
      <div class="blog-post__tag">News</div>
    </div>
    <div class="blog-post__body">
      <div class="blog-post__header"><h5>Three new features rolled out today</h5><v-icon name="bookmark"/></div>
      <p>Today we are celebrating the new era of Nerif technology with the ability to write not just one or two, but three and more lines of text to describe an article at our blog which nobody will ever see!</p>
      <div class="blog-post__footer"><span>by <b>Martin Scorcese</b></span><span>24-05-2023</span></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.blog-post {
  background: white;

  min-height: 100px;
  border: 1px solid $primary-ds-100;
  border-radius: $border-radius-large;

  overflow: hidden;

  --keks: 4;

  &:not(:nth-child(n+4)) {
    grid-column: span 2;

    @media screen and (max-width: $tablet-breakpoint) {
      grid-column: span 3;
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
    }

    &:nth-child(n+3) {
      grid-column: span 2;

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
    }

    &:nth-child(n+2) {
      grid-column: span 3;

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
    display: grid;
    gap: .75rem;

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
  }

  &__footer {
    display: flex;
    flex-wrap: wrap;

    font-size: $fs-xxs;

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

  &:deep(.v-icon) {
    color: $black-250;
  }

  &--bookmark:deep(.v-icon) {
    color: $accent-500;
  }
}
</style>