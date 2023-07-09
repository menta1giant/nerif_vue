<template>
  <div class="tf-post">
    <div class="tf-post__header">
      <span class="tf-post__capper-name">{{ capperName }}</span>
      <div class="tf-post__icons">
          <v-icon-button name="telegram" tooltip-content="View source" brands disable-focus @click="$emit('show-modal')"/>
          <v-icon-button name="ellipsis" tooltip-content="Details" />
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
      isModalShown: false,
    };
  },
  methods: {
    showModal() {
      this.isModalShown = true;
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Matches/Feed/telegram-feed-post.scss';

</style>