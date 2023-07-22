<template>
  <v-section responsive padded span>
    <div class="centered-container">
      <div class="not-found-page-content">
        <img class="desktop" src="@/assets/images/404.png" />
        <div class="not-found-page-content__right">
          <section class="not-found-page-content__header">
            <span class="not-found-page-content__big-text">404</span>
            <span class="not-found-page-content__subheader">page not found</span>
          </section>
          <section>
            <p>We’re sorry we couldn’t deliver what you were looking for.</p>
            <p>But maybe you’re also looking for an extremely skilled Frontend Developer? If so, check out his portoflio <b>right here</b></p>
          </section>
        </div>
      </div>
    </div>
  </v-section>
</template>

<style lang="scss" scoped>
.not-found-page-content {
  display: grid;
  grid-template-columns: auto minmax(10vw, 26rem);
  gap: 3rem;

  &__right {
    display: grid;
    gap: 3rem;

    font-family: $ff-display;
  }

  section {
    @include flex-column;
    justify-content: center;
    gap: .5rem;

    max-width: 26rem;
    font-size: $fs-large;
    line-height: $lh-body;

    span {
      font-weight: $fw-semi-bold;
      text-align: center;
    }

    p {
      color: $primary-ds-600;
      font-weight: $fw-medium;
    }

    b {
      text-decoration-style: dashed;
      text-decoration-line: underline;
      text-underline-offset: 6px;
      color: $primary-s-600;

      cursor: pointer;
    }
  }

  &__header {
    color: $primary-s-600;
  }

  &__big-text {
    font-size: 192px;
    line-height: 1;
  }

  &__subheader {
    @include text-h3;
  }

  @media screen and (max-width: $tablet-breakpoint) {
    grid-template-columns: auto;
    img {
      display: none;
    }
  }

  @media screen and (max-width: $mobile-breakpoint) {
    &__big-text {
      font-size: 128px;
    }

    &__subheader {
      @include text-h4;
    }

    p {
      font-size: .75em !important;
    }
  }
}
</style>