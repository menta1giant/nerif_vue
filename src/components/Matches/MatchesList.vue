<template>
  <div class="matches">
    <match-card v-for="(match, b) in matches" v-bind:key="b" :msg="prikol[b].toUpperCase()" />
  </div>
  <div class="match-stats">
    <div class="match-stats__tabs">
      <div class="button-group">
        <div class="groupped-button">Stats</div>
        <div class="groupped-button">Odds</div>
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
import MatchCard from '@/components/Matches/MatchCard.vue';
import StatsBar from '@/components/Matches/StatsBar.vue';

const prikol = ["Lyngby Vikings", "Caught off Guard", "SAW Youngsters", "Malvinas", "DETONA", "BIGODES", "coluant", "Tranquillum", "Team GeT_RiGhT", "Insanium", "KINGZZZ", "From The Grave", "Halal Gang", "Verum", "Fiend", "The Big Dogs", "Lese", "Alke", "Goomba Stomp", "Russian Street Party", "WORTEX", "GORILLAZ", "Izako Boars", "Levitate", "YeniCherry", "Coldest Riders", "LSC", "ex-Cear\u0413\u040e", "AURA", "DBL PONEY", "Keyd", "Volted", "Peekers", "Big City Blues", "Triumph", "Meinser", "Hazard", "Extra Salt", "voLante", "ViCi", "Dr. Pepper", "GAIJIN", "eXploit", "okura", "Doge Soldiers", "Sestri", "ex-Feenix", "ex-Coalesce", "LPSP", "Villainous"];

export default {
  name: 'MatchesList',
  components: {
    MatchCard,
    StatsBar,
  },
  props: {
    matches: {
      type: Array,
      default() {
        return [1,];
      },
    },
  },
  data() {
    return {
      prikol: prikol,
    };
  },
}

</script>

<style lang="scss" scoped>
@import '@/assets/styles/Matches/mixins.scss';
.match-stats {
  @include thick-rounded-block;

  margin-top: 2rem;
  padding: 1.5em 2em;
  font-size: $fs-medium;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &__tabs {
    display: flex;
    justify-content: center;
  }

  &__header {
    display: flex;
    flex-direction: column;
    gap: .5rem;

    h2 {
      font-size: $fs-large;
      line-height: $lh-large;
      margin-bottom: .25rem;
    }

    p {
      font-size: $fs-xs;
    }

    p:last-child {
      color: $primary-s-700;
    }
  }

  &__bars {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: .75rem;
    column-gap: 2rem;
  }
}

.button-group {
  color: $primary-s-500;
  font-family: $ff-display;
  font-weight: 500;

  display: flex;
  gap: .5rem;
}

.groupped-button {
  background: $primary-s-50;
  padding: .5rem 1.5rem;
  border-radius: $border-radius-medium;
}

</style>