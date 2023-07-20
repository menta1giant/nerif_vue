<template>
  <div class="matches" ref="matches">
    <template v-if="isMatchCardInfoOpened">
      <match-card :key="`match_${ openedMatchCard.match.match_id }`" :match="openedMatchCard" is-selected @click="toggleMatchCard()" />
    </template>
    <template v-else>
      <match-card v-for="(match, idx) in matches" :key="`match_${ idx }`" :match="match" :is-selected="isScrollingInProcess && idx == lastOpenedMatchCardId" @click="!isScrollingInProcess && toggleMatchCard(idx)" />
      <template v-if="isLoading">
        <match-card-skeleton v-for="(match, idx) in (new Array(hasMatches ? 1 : 8))" :key="`match-skeleton_${ idx }`" />
      </template>
    </template>
  </div>
  <div class="match-stats" v-if="isMatchCardInfoOpened">
    <div class="match-stats__tabs">
      <div class="button-group">
        <div v-for="(tab, idx) in tabs" :key="idx" class="groupped-button" :class="{ 'groupped-button--active': activeTab == idx }" @click="changeActiveTab(idx)">{{ tab }}</div>
      </div>
    </div>
    <template v-if="activeTab===0">
      <div class="match-stats__header">
        <h2><b>Statistics</b></h2>
        <p>Those are the general stats, that represent how well teams are positioned going into the match.</p>
        <a><p><b>Read the docs</b> to learn more about features</p></a>
      </div>
      <div class="match-stats__bars">
        <stats-bar v-for="(statsBarTitle, statsBar) in statsTitlesMap" :key="statsBar" :title="statsBarTitle" :value="statsValues[statsBar]" />
      </div>
    </template>
    <template v-else>
      <div class="match-stats__header">
        <h2><b>Odds</b></h2>
        <p>This chart shows how the odds have changed during an hour before the match began.</p>
      </div>
      <div class="match-stats__chart">
        <line-chart :colors="chartColors" :data="oddsData" />
      </div>
    </template>
  </div>
</template>

<script>
import { apiRequestGet } from '@/lib/api';
import MatchCard from './MatchCard.vue';
import MatchCardSkeleton from './MatchCardSkeleton.vue';
import StatsBar from './StatsBar.vue';
import { matchStatsTitlesMap } from './const';
import LineChart from '@/components/LineChart.vue';
import { BRIGHT_COLORS } from '@/components/chartConfig';

export default {
  name: 'MatchesList',
  emits: ['change-scroll'],
  components: {
    MatchCard,
    StatsBar,
    MatchCardSkeleton,
    LineChart,
  },
  props: {
    matches: {
      type: Array,
      default() {
        return [];
      },
    },
    isLoading: Boolean,
  },
  data() {
    return {
      lastOpenedMatchCardId: null,
      oddsData: {},

      tabs: ['Stats', 'Odds'],
      activeTab: 0,
      statsValues: {},
      statsTitlesMap: matchStatsTitlesMap,
      chartColors: BRIGHT_COLORS,

      isMatchCardInfoOpened: false,
      isScrollingInProcess: false,
    };
  },
  computed: {
    hasMatches() {
      return this.matches.length > 0;
    },
    openedMatchCard() {
      return this.$store.getters.getSelectedMatch;
    },
  },
  watch: {
    isMatchCardInfoOpened: {
      immediate: true,
      handler(val) {
        if (!val) return;

        this.fetchStatsValues();
        this.fetchUpcomingOdds();
      }
    }
  },
  methods: {
    async fetchUpcomingOdds() {
      this.oddsData = await apiRequestGet('matches/predictions/odds');
    },
    async fetchStatsValues() {
      this.statsValues = await apiRequestGet(`matches/predictions/stats/${ this.openedMatchCard.id }`);
    },
    changeStatsVisibility() {
      this.isMatchCardInfoOpened = !this.isMatchCardInfoOpened;
    },
    toggleMatchCard(cardId) {
      const openedMatchCard = this.isMatchCardInfoOpened ? null : this.matches[cardId];
      this.$store.commit('setSelectedMatch', openedMatchCard);

      if (cardId !== undefined) {
        this.lastOpenedMatchCardId = cardId;
        this.$emit('change-scroll', cardId, 'smooth');
        this.isScrollingInProcess = true;
        let previousScrolling = this.$refs.matches.children[cardId].getBoundingClientRect().top;

        let checkInterval = setInterval(()=> {
          const newScrolling = this.$refs.matches.children[cardId].getBoundingClientRect().top;

          if (previousScrolling === newScrolling) {
            this.changeStatsVisibility(cardId);
            this.isScrollingInProcess = false;
            clearInterval(checkInterval);
          }
          previousScrolling = newScrolling;
        }, 100);

        return;
      }

      this.changeStatsVisibility();
      setTimeout(()=> this.$emit('change-scroll', this.lastOpenedMatchCardId, 'auto'), 0);
    },
    changeActiveTab(value) {
      this.activeTab = value;
    }
  }
}

</script>

<style lang="scss" scoped>
@import '@/assets/styles/Matches/matches-list.scss';

</style>