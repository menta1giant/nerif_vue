<template>
  <div class="tf-post">
    <div class="tf-post__header">
      <span class="tf-post__capper-name">{{ capperName }}</span>
      <div class="tf-post__icons">
          <nrf-icon type="brands" name="telegram"/>
          <nrf-icon type="solid" name="ellipsis"/>
      </div>
    </div>
    <p class="tf-post__body">
        {{ "Don't know how he possessed me, but I'm happy that he did. Oh mio padre there's a ghost in my body. Oh mio padre there's a ghost in my body. Oh mio padre there's a ghost in my body. Oh mio padre there's a ghost in my body. Oh mio padre there's a ghost in my body.".slice(0, Math.floor(Math.random()*300)) }}
    </p>
  </div>
</template>
  
<script>

export default {
  name: 'TelegramFeedPost',
  data() {
    return {
      capperName: 'Гагарин | Прогнозы и ставки',
    };
  },
}
</script>

<style lang="scss" scoped>
.tf-post {
  background: $primary-ds-50;
  font-size: $fs-xs;
  padding: 1em;
  gap: 8px;

  display: flex;
  flex-direction: column;

  &__header {
    display: flex;
    justify-content: space-between;

    font-weight: $fw-semi-bold;
    color: $primary-ds-600;
    font-family: $ff-display;
  }

  &__capper-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__icons {
    height: 100%;
    font-size: 1.25em;

    display: flex;
    gap: .5rem;
  }

  &__body {
    font-size: .85em;

    display: -webkit-box;
   -webkit-line-clamp: 4;
   -webkit-box-orient: vertical;  
   overflow: hidden;
  }
}

@media screen and (max-width: $mobile-breakpoint) {
  .tf-post {
    font-size: $fs-medium;
  }
}

</style>