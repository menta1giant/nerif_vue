<template>
  <article class="tf-post">
    <div class="tf-post__header">
      <span class="tf-post__capper-name">{{ author.name }}</span>
      <div class="tf-post__icons">
          <v-icon-button name="telegram" tooltip-content="View source" brands disable-focus @click="showModal"/>
          <v-icon-button name="ellipsis" tooltip-content="Details" @click="isDetailsModalShown = true" />
      </div>
    </div>
    <p class="tf-post__body">
        {{ content }}
    </p>
  </article>

  <warn-modal
    v-model="isRedirectModalShown"

    header="Confirm redirect"
    primary-button-text="Proceed"
    secondary-button-text="Go back"
    :primary-button-click-handler="handleConfirmRedirect"
    :secondary-button-click-handler="closeModal"
  >
    <p>This action will redirect you to <b>t.me</b></p>
  </warn-modal>

  <v-modal
    v-model="isDetailsModalShown"
    header="Endorsement details"
  >
    <p>{{ content }}</p>
  </v-modal>
</template>
  
<script>
import WarnModal from '@/components/modules/WarnModal';

export default {
  name: 'TelegramFeedPost',
  components: {
    WarnModal,
  },
  props: {
    author: {
      type: Object,
      default() {
        return {
          name: 'Anonymous',
        }
      },
      validator(val) {
        return 'name' in val;
      }
    },
    relatedMap: Number,
    content: String,
    isFavorite: Boolean,
    link: String,
  },
  data() {
    return {
      isRedirectModalShown: false,
      isDetailsModalShown: false,
    };
  },
  methods: {
    showModal() {
      this.isRedirectModalShown = true;
    },
    closeModal() {
      this.isRedirectModalShown = false;
    },
    handleConfirmRedirect() {
      const newWindow = window.open(this.link, '_blank');
      newWindow.focus();
      this.closeModal();
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Matches/Feed/telegram-feed-post.scss';

</style>