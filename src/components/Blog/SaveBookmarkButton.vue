<template>
  <div class="save-bookmark-button" :class="{ 'save-bookmark-button--active': isActive }">
    <v-icon-button name="bookmark" tooltip-content="Save post" @click="handleToggleBookmark"/>
  </div>
</template>

<script>
import { getIsPostSaved, toggleBookmark } from './bookmarks';

export default {
  name: 'SaveBookmarkButton',
  props: {
    id: Number,
  },
  data() {
    return {
      isActive: getIsPostSaved(this.id),
    };
  },
  methods: {
    handleToggleBookmark() {
      toggleBookmark(this.id);
      this.isActive = !this.isActive;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Blog/save-bookmark-button.scss';
</style>