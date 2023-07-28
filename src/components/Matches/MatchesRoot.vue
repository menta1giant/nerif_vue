<template>
  <v-section span responsive>
    <section class="content-wrapper-left" :class="{ desktop: isMatchesTabOpened }">
      <section class="date-picker-wrapper desktop">
        <date-picker />
      </section>
      <section class="filters desktop">
        <v-popup v-model="isFiltersDropdownVisible">
          <template #trigger>
            <v-button type="transparent" size="small" class="filters__toggle-button">
              <v-icon type="solid" name="filter"/>
              <span>Filters</span>
              <v-chevron :model-value="isFiltersDropdownVisible" />
            </v-button>
          </template>
          <template #content>
            <matches-filters />
          </template>
        </v-popup>
        <div class="filters__wrapper">
          <matches-filters />
        </div>
      </section>
      <telegram-feed-root />
    </section>
    <section class="content-wrapper-right" :class="{ desktop: !isMatchesTabOpened }" ref="container-right">
      <h2 class="visually-hidden">Matches list</h2>
      <matches-list ref="matches" :matches="matches" :is-loading="areMatchesLoading" @change-scroll="changeScroll"/>
      <div class="match-card-dummy"></div>
    </section>
  </v-section>

  <mobile-toolbar
    :is-matches-tab-opened="isMatchesTabOpened"
    @toggle-opened-tab="handleToggleOpenedTab"
  />
</template>

<script>
import debounce from '@/lib/debounce';

import MatchesList from './MatchesList.vue';
import TelegramFeedRoot from './Feed/TelegramFeedRoot.vue';
import DatePicker from './DatePicker/DatePicker.vue';
import datePickerMixin from './DatePicker/datePickerMixin.js';
import MatchesFilters from './Filters/MatchesFilters.vue';
import MobileToolbar from './MobileToolbar.vue';
import { apiRequestGet } from '@/lib/api';

const MATCHES_REQUEST_LIMIT = 10;

export default {
  name: 'MatchesRoot',
  components: {
    MatchesList,
    DatePicker,
    MatchesFilters,
    MobileToolbar,
    TelegramFeedRoot,
  },
  mixins: [datePickerMixin],
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
      this.$store.commit('setSelectedMatch', null);
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
      
      const matchesRef = this.$refs.matches;
      const firstMatchTop = matchesRef?.$el?.nextElementSibling?.firstElementChild?.offsetTop || 0;
      const nthMatchTop = matchesRef?.$el?.nextElementSibling?.children[openedCardId]?.offsetTop || 0;
      
      this.matchesScroll = nthMatchTop - firstMatchTop;
      this.scrollMatches(behavior);
    },
    handleToggleOpenedTab(newValue) {
      this.scrollContainerToYZero();
      this.isMatchesTabOpened = newValue;
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Matches/matches.scss';

</style>