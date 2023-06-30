<template>
  <div class="matches" ref="matches">
    <template v-if="isMatchCardInfoOpened">
      <match-card :msg="openedMatchCard.toUpperCase()" isSelected @click="toggleMatchCard()" />
    </template>
    <template v-else>
      <match-card v-for="(match, b) in matches" v-bind:key="b" :msg="match.toUpperCase()" :isSelected="isScrollingInProcess && b == lastOpenedMatchCardId" @click="!isScrollingInProcess && toggleMatchCard(b)" />
    </template>
  </div>
  <div class="match-stats" v-if="isMatchCardInfoOpened">
    <div class="match-stats__tabs">
      <div class="button-group">
        <div v-for="(tab, idx) in tabs" v-bind:key="idx" class="groupped-button" :class="{ 'groupped-button--active': activeTab == idx }" @click="changeActiveTab(idx)">{{ tab }}</div>
      </div>
    </div>
    <div class="match-stats__header">
      <h2><b>Statistics</b></h2>
      <p>Those are the general stats, that represent how well teams are positioned going into the match.</p>
      <p><b>Read the docs</b> to learn more about features</p>
    </div>
    <div class="match-stats__bars">
      <stats-bar v-for="(a) in Array(16).fill(0)" v-bind:key="a" />
    </div>
  </div>
</template>

<script>
import MatchCard from './MatchCard.vue';
import StatsBar from './StatsBar.vue';

const prikol = ["Lyngby Vikings", "Caught off Guard", "SAW Youngsters", "Malvinas", "DETONA", "BIGODES", "coluant", "Tranquillum", "Team GeT_RiGhT", "Insanium", "KINGZZZ", "From The Grave", "Halal Gang", "Verum", "Fiend", "The Big Dogs", "Lese", "Alke", "Goomba Stomp", "Russian Street Party", "WORTEX", "GORILLAZ", "Izako Boars", "Levitate", "YeniCherry", "Coldest Riders", "LSC", "ex-Cear\u0413\u040e", "AURA", "DBL PONEY", "Keyd", "Volted", "Peekers", "Big City Blues", "Triumph", "Meinser", "Hazard", "Extra Salt", "voLante", "ViCi", "Dr. Pepper", "GAIJIN", "eXploit", "okura", "Doge Soldiers", "Sestri", "ex-Feenix", "ex-Coalesce", "LPSP", "Villainous"];

export default {
  name: 'MatchesList',
  emits: ['change-scroll'],
  components: {
    MatchCard,
    StatsBar,
  },
  props: {
    matches: {
      type: Array,
      default() {
        return prikol;
      },
    },
  },
  data() {
    return {
      prikol: prikol,
      openedMatchCard: null,
      lastOpenedMatchCardId: null,

      tabs: ['Stats', 'Odds'],
      activeTab: 0,

      isMatchCardInfoOpened: false,
      isScrollingInProcess: false,
    };
  },
  methods: {
    propagateChangeScroll() {

    },
    changeStatsVisibility() {
      this.isMatchCardInfoOpened = !this.isMatchCardInfoOpened;
    },
    toggleMatchCard(cardId) {
      this.openedMatchCard = this.isMatchCardInfoOpened ? null : this.matches[cardId];

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