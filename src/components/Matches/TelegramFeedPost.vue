<template>
  <div class="tf-post">
    <div class="tf-post__header">
        <span>Гагарин</span>
        <div class="tf-post__icons">
            <nrf-icon type="brands" name="telegram"/>
            <nrf-icon type="solid" name="ellipsis"/>
        </div>
    </div>
    <div class="tf-post__body">
        {{ "Don't know how he possessed me, but I'm happy that he did. Oh mi padre there's a ghost in my body. Oh mi padre there's a ghost in my body. Oh mi padre there's a ghost in my body. Oh mi padre there's a ghost in my body. Oh mi padre there's a ghost in my body.".slice(0, Math.floor(Math.random()*300)) }}
    </div>
  </div>
</template>
  
<script>

export default {
  name: 'TelegramFeedPost',
}
</script>

<style lang="scss" scoped>
.tf-post {
  background: $primary-ds-50;
  font-size: $font-size-xxs;
  padding: 1em;
  gap: 8px;

  display: flex;
  flex-direction: column;

  &__header {
    display: flex;
    justify-content: space-between;

    font-weight: 600;
    color: $primary-ds-600;
    font-family: $font-display;
  }

  &__icons {
    height: 100%;
    font-size: $font-size-xs;

    display: flex;
    gap: .5rem;
  }

  &__body {
    display: -webkit-box;
   -webkit-line-clamp: 4;
   -webkit-box-orient: vertical;  
   overflow: hidden;
  }
}

</style>