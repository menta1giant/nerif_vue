<template>
  <v-section responsive padded span>
    <div class="centered-container">
      <div class="not-found-page-content">
        <img class="desktop" src="@/assets/images/404.webp" />
        <div class="not-found-page-content__right">
          <div class="not-found-page-content__header">
            <span class="not-found-page-content__big-text text-semi-bold">404</span>
            <span class="not-found-page-content__subheader">page not found</span>
          </div>
          <div>
            <p class="text-large">We’re sorry we couldn’t deliver what you were looking for.</p>
            <p class="text-large">But maybe you’re also looking for an extremely skilled Frontend Developer? If so, check out his portoflio <a class="link-text">right here</a></p>
          </div>
        </div>
      </div>
    </div>
  </v-section>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/page-not-found.scss';
</style>