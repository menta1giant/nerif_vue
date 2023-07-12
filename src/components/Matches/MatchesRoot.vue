<template>
  <v-section span responsive>
    <div class="content-wrapper-left" :class="{ desktop: isMatchesTabOpened }">
      <div class="date-picker-wrapper desktop">
        <date-picker />
      </div>
      <div class="filters desktop">
        <v-popup v-model="isFiltersDropdownVisible">
          <template #trigger>
            <div class="filters__toggle-button">
              <v-icon type="solid" name="filter"/>
              <span>Filters</span>
              <v-chevron :model-value="isFiltersDropdownVisible" />
            </div>
          </template>
          <template #content>
            <matches-filters />
          </template>
        </v-popup>
        <div class="filters__wrapper">
          <matches-filters />
        </div>
      </div>
      <div class="feed">
        <div class="feed__title">
          <h3>Telegram Feed</h3>
          <v-icon-button name="circle-question" tooltip-content="This section contains Telegram post from revered CS:GO cappers"/>
        </div>
        <div class="feed__cappers-select__label"><v-label><b>Select cappers.</b> Or else..</v-label></div>
        <div class="feed__cappers-select__wrapper">
          <v-multiselect>Я мультиселект, меня можно кликать</v-multiselect>
        </div>
        <div class="feed__posts-list">
          <telegram-feed-post v-for="(a) in Array(32)" :key="a" @show-modal="isModalShown = true"></telegram-feed-post>
        </div>
      </div>
    </div>
    <div class="content-wrapper-right" :class="{ desktop: !isMatchesTabOpened }" ref="container-right">
      <matches-list :matches="matches" :is-loading="areMatchesLoading" @change-scroll="changeScroll"/>
      <div class="match-card-dummy"></div>
    </div>
  </v-section>

  <mobile-toolbar
    :is-matches-tab-opened="isMatchesTabOpened"
    @toggle-opened-tab="handleToggleOpenedTab"
  />

  <v-modal v-model="isModalShown"/>
</template>

<script>
import debounce from '@/lib/debounce';

import MatchesList from './MatchesList.vue';
import DatePicker from './DatePicker/DatePicker.vue';
import DatePickerMixin from './DatePicker/DatePickerMixin';
import TelegramFeedPost from './Feed/TelegramFeedPost.vue';
import MatchesFilters from './Filters/MatchesFilters.vue';
import MobileToolbar from './MobileToolbar.vue';
import { apiRequestGet } from '@/lib/api';

const MATCHES_REQUEST_LIMIT = 10;

export default {
  name: 'MatchesRoot',
  components: {
    MatchesList,
    DatePicker,
    TelegramFeedPost,
    MatchesFilters,
    MobileToolbar,
  },
  mixins: [DatePickerMixin],
  async created() {
    this.$router.replace(`/matches/${this.formattedDate}`);
    this.setUpIntersectionObserver();
    await this.fetchMatches();
  },
  data() {
    return {
      matches: [],
      matchesScroll: 0,
      observer: null,

      matchesRequestParams: {
        offset: 0,
        limit: MATCHES_REQUEST_LIMIT,
      },

      filters: {
        fav_pick: 1,
        opp_pick: 1,
        fav_won_first: 1,
        opp_won_first: 1,
        map1: 1,
        map2: 1,
        map3: 1,
      },

      isMatchesTabOpened: true,
      isFiltersDropdownVisible: false,
      isModalShown: false,
      isLimitOfMatchesReached: false,
      areMatchesLoading: false,
    }
  },
  computed: {
    hasSelectedMatch() {
      return this.$store.getters.getSelectedMatch !== null;
    },
    currentDate() {
      return this.$store.getters.getMatchesSelectedDate;
    },
    formattedDate() {
      return `${this.year}-${this.month+1}-${this.date}`;
    },
    matchesFilters() {
      return Object.fromEntries(this.$store.getters.getMatchesFilters.filter(filter => filter.value).map(filter => [filter.id, 1]));
    },
    queryParams() {
      return Object.assign({}, this.matchesRequestParams, this.matchesFilters, {
        'date': this.formattedDate,
      })
    }
  },
  watch: {
    currentDate: {
      handler() {
        this.$router.replace(`/matches/${this.formattedDate}`);

        this.replaceMatches();
      }
    },
    matchesFilters: {
      handler() {
        this.replaceMatches();
      }
    }
  },
  methods: {
    resetObserver() {
      const target = document.querySelector(".match-card-dummy");
      if (target instanceof HTMLElement) this.invokeObserver(target);
    },
    async fetchMatches() {
      this.areMatchesLoading = true;

      const formattedDate = this.formattedDate;

      const matches = await apiRequestGet('matches/predictions/maps', this.queryParams);

      this.isLimitOfMatchesReached = matches.is_enough;
      this.matchesRequestParams.offset = this.matchesRequestParams.limit + this.matchesRequestParams.offset;

      this.matches = formattedDate === this.$route.params.date ? this.matches.concat(matches.data) : matches.data;

      this.resetObserver();

      this.areMatchesLoading = false;
    },
    replaceMatches: debounce(async function() {
      this.matchesRequestParams.offset = 0;
      this.matches = [];

      await this.fetchMatches();
    }, 300),
    fetchAnotherBatchOfMatches(entries) {
      if (this.areMatchesLoading || this.isLimitOfMatchesReached || this.hasSelectedMatch) return;

      if (!entries[0].isIntersecting) return;

      this.fetchMatches();
    },
    setUpIntersectionObserver() {
      let options = {
        root: document.querySelector(".content-wrapper-right"),
        rootMargin: "0px",
        threshold: 1.0,
      };

      this.observer = new IntersectionObserver(this.fetchAnotherBatchOfMatches, options);
    },
    invokeObserver(target) {
      this.observer.disconnect();
      this.observer.observe(target);
    },
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
    handleToggleOpenedTab(newValue) {
      this.scrollContainerToYZero();
      this.isMatchesTabOpened = newValue;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Matches/matches.scss';

</style>