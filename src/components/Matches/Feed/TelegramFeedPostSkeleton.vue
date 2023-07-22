<template>
  <article class="tf-post">
    <div class="tf-post__header">
      <animated-placeholder width="50%"/>
    </div>
    <p class="tf-post__body">
      <animated-placeholder width="100%" height="56px"/>
    </p>
  </article>
</template>
  
<script>
import AnimatedPlaceholder from '@/components/AnimatedPlaceholder';

export default {
  name: 'TelegramFeedPost',
  components: {
    AnimatedPlaceholder,
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Matches/Feed/telegram-feed-post.scss';

</style>