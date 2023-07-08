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
import axios from 'axios';

import MatchesList from './MatchesList.vue';
import DatePicker from './DatePicker/DatePicker.vue';
import DatePickerMixin from './DatePicker/DatePickerMixin';
import TelegramFeedPost from './Feed/TelegramFeedPost.vue';
import MatchesFilters from './Filters/MatchesFilters.vue';
import MobileToolbar from './MobileToolbar.vue';
import HelpIcon from '@/components/HelpIcon.vue';

const MATCHES_REQUEST_LIMIT = 10;

export default {
  name: 'MatchesRoot',
  components: {
    MatchesList,
    DatePicker,
    TelegramFeedPost,
    MatchesFilters,
    HelpIcon,
    MobileToolbar,
  },
  mixins: [DatePickerMixin],
  async created() {
    this.$router.replace(`/matches/${this.formattedDate}`);
    this.setUpIntersectionObserver();
    await this.loadMatches();
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

      isMatchesTabOpened: true,
      isFiltersDropdownVisible: false,
      isModalShown: false,
      isLimitOfMatchesReached: false,
      areMatchesLoading: false,
      isThrottlingMatchesLoad: false,
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
    queryParams() {
      return {
        'limit': this.matchesRequestParams.limit,
        'offset': this.matchesRequestParams.offset,
        'date': this.formattedDate,
      }
    }
  },
  watch: {
    currentDate: {
      handler() {
        this.$router.replace(`/matches/${this.formattedDate}`);

        if (this.areMatchesLoading) {
          this.isThrottlingMatchesLoad = true;
          return;
        }

        this.replaceMatches();
      }
    }
  },
  methods: {
    resetObserver() {
      const target = document.querySelector(".match-card-dummy");
      if (target instanceof HTMLElement) this.invokeObserver(target);
    },
    async loadMatches() {
      this.areMatchesLoading = true;

      const searchParams = new URLSearchParams(this.queryParams);
      const formattedDate = this.formattedDate;

      const matches = await (() => {
        return new Promise(function(res) {
          const data = axios.get(`http://5.228.130.64:8002/api/matches/predicted_maps?${ searchParams }`).then(setTimeout(()=>res(data), 1000));
        })
      })()

      this.isLimitOfMatchesReached = matches.data.is_enough;
      this.matchesRequestParams.offset = this.matchesRequestParams.limit + this.matchesRequestParams.offset;

      this.matches = formattedDate === this.$route.params.date ? this.matches.concat(matches.data.data) : matches.data.data;

      this.resetObserver();

      if (this.isThrottlingMatchesLoad) {
        this.isThrottlingMatchesLoad = false;
        this.replaceMatches();
        return;
      }

      this.areMatchesLoading = false;
    },
    async replaceMatches() {
      this.matchesRequestParams.offset = 0;
      this.matches = [];

      await this.loadMatches();
    },
    loadAnotherBatchOfMatches(entries) {
      if (this.areMatchesLoading || this.isLimitOfMatchesReached || this.hasSelectedMatch) return;

      if (!entries[0].isIntersecting) return;

      this.loadMatches();
    },
    setUpIntersectionObserver() {
      let options = {
        root: document.querySelector(".content-wrapper-right"),
        rootMargin: "0px",
        threshold: 1.0,
      };

      this.observer = new IntersectionObserver(this.loadAnotherBatchOfMatches, options);
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