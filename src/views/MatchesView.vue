<template>
  <v-section span responsive>
    <div class="content-wrapper-left" :class="{ desktop: isMatchesTabOpened }">
      <div class="date-picker-wrapper desktop">
        <date-picker />
      </div>
      <div class="filters desktop">
        <v-positioner v-model="isFiltersDropdownVisible">
          <template v-slot:body>
            <div class="filters__toggle-button">
              <v-icon type="solid" name="filter"/>
              <span>Filters</span>
              <v-chevron :model-value="isFiltersDropdownVisible" />
            </div>
          </template>
          <template v-slot:dropdown>
            <v-popup>
              <matches-filters />
            </v-popup>
          </template>
        </v-positioner>
        <div class="filters__wrapper">
          <matches-filters />
        </div>
      </div>
      <div class="feed">
        <div class="feed__title">
          <h3>Telegram Feed</h3>
          <help-icon>Ten</help-icon>
        </div>
        <div class="feed__cappers-select__label"><v-label><b>Select cappers.</b> Or else..</v-label></div>
        <div class="feed__cappers-select__wrapper">
          <v-multiselect>Я мультиселект, меня можно кликать</v-multiselect>
        </div>
        <div class="feed__posts-list">
          <telegram-feed-post v-for="(a) in Array(32)" v-bind:key="a" @show-modal="isModalShown = true"></telegram-feed-post>
        </div>
      </div>
    </div>
    <div class="content-wrapper-right" :class="{ desktop: !isMatchesTabOpened }" ref="container-right">
  
      <matches-list :matches="matches" @change-scroll="changeScroll"/>
  
    </div>
  </v-section>

  <div class="toolbar mobile">
    <div class="toolbar__items">
      <div class="toolbar__controls">
        <date-picker />
        <v-positioner v-model="isFiltersDropdownVisible">
          <template v-slot:body>
            <div class="toolbar__icon" :class="{ active: isFiltersDropdownVisible }">
              <v-icon type="solid" name="filter" />
            </div>
          </template>
          <template v-slot:dropdown>
            <v-popup>
              <matches-filters />
            </v-popup>
          </template>
        </v-positioner>
      </div>
      <div class="toolbar__navigation">
        <div class="toolbar__icon" :class="{ active: isMatchesTabOpened }" @click="toggleOpenedTab(true)">
          <v-icon type="solid" name="gamepad" />
        </div>
        <div class="toolbar__icon" :class="{ active: !isMatchesTabOpened }" @click="toggleOpenedTab(false)">
          <v-icon type="solid" name="square-rss" />
        </div>
      </div>
    </div>
  </div>

  <v-modal v-model="isModalShown"/>
</template>

<script>
import axios from 'axios';

import MatchesList from '@/components/Matches/MatchesList.vue';
import DatePicker from '@/components/Matches/DatePicker/DatePicker.vue';
import TelegramFeedPost from '@/components/Matches/Feed/TelegramFeedPost.vue';
import MatchesFilters from '@/components/Matches/Filters/MatchesFilters.vue';
import HelpIcon from '@/components/HelpIcon.vue';

export default {
  name: 'MatchesView',
  components: {
    MatchesList,
    DatePicker,
    TelegramFeedPost,
    MatchesFilters,
    HelpIcon,
  },
  async created() {
    const matches = await axios.get('http://localhost:8002/api/matches/predicted_maps/');
    this.matches = matches.data;
  },
  data() {
    return {
      matches: [],
      matchesScroll: 0,
      isMatchesTabOpened: true,
      isFiltersDropdownVisible: false,
      isModalShown: false,
    }
  },
  methods: {
    scrollContainerToYZero() {
      const container = this.$refs['container-right'].parentNode;
      container.scrollTop = 0;
    },
    scrollMatches(behavior) {
      this.$refs['container-right'].scrollTo({
        top: this.matchesScroll, 
        left: 0, 
        behavior: behavior,
      })
    },
    changeScroll(openedCardId, behavior) {
      if (openedCardId === undefined) return;
      const containerRight = this.$refs['container-right'];
      const firstMatchTop = containerRight.firstElementChild.firstElementChild.offsetTop
      const nthMatchTop = containerRight.firstElementChild.children[openedCardId].offsetTop;
      
      this.matchesScroll = nthMatchTop - firstMatchTop;
      this.scrollMatches(behavior);
    },
    toggleOpenedTab(newValue) {
      this.scrollContainerToYZero();
      this.isMatchesTabOpened = newValue;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Matches/matches.scss';

</style>