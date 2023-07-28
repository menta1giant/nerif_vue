<template>
  <section class="feed">
    <div class="feed__title">
      <h2 id="tfeed-header" class="h3 header-common">Telegram Feed</h2>
      <v-icon-button name="circle-question" aria-describedby="tfeed-header" tooltip-content="This section contains Telegram post from revered CS:GO cappers"/>
    </div>
    <label class="feed__cappers-select__label label">Select cappers</label>
    <div class="feed__cappers-select__wrapper">
      <v-multiselect :options="cappers" placeholder="By default, all cappers are selected" @change="handleSelectCappers" />
    </div>
    <div class="feed__posts-list">
      <template v-if="!areEndorsementsLoading">
        <telegram-feed-post 
          v-for="endorsement in endorsements" 
          :key="`endorsement_${endorsement.id}`" 
          :author="endorsement.author"
          :content="endorsement.content"
          :related-map="endorsement.related_map"
          :link="endorsement.link"
          :is-favorite="endorsement.is_favorite"
        ></telegram-feed-post>
      </template>
      <template v-else>
        <telegram-feed-post-skeleton 
          v-for="(_, idx) in (new Array(4))"
          :key="`endorsement_skeleton_${ idx }`"
        />
      </template>
    </div>
  </section>
</template>

<script>
import { apiRequestGet } from '@/lib/api';
import TelegramFeedPost from './TelegramFeedPost.vue';
import TelegramFeedPostSkeleton from './TelegramFeedPostSkeleton.vue';

export default {
  name: 'TelegramFeedRoot',
  components: {
    TelegramFeedPost,
    TelegramFeedPostSkeleton,
  },
  async created() {
    await Promise.all([this.fetchEndorsements(), this.fetchCappers()]);
  },
  data() {
    return {
      cappers: [],
      endorsements: [],
      areEndorsementsLoading: false,
    }
  },
  methods: {
    async fetchCappers() {
      const cappers = await apiRequestGet('matches/cappers');

      this.cappers = cappers;
    },
    async fetchEndorsements(selectedCappers) {
      this.areEndorsementsLoading = true;
      let query = {}
      if (selectedCappers) {
        query.cappers = selectedCappers;
      }
      const endorsements = await apiRequestGet('matches/endorsements', query);

      this.endorsements = endorsements;
      this.areEndorsementsLoading = false;
    },
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/Matches/Feed/telegram-feed-root.scss';

</style>