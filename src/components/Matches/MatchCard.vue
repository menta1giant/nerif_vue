<template>
  <article class="match-card" :class="{ 'match-card--selected': isSelected }">
    <div class="match-card__upper-wrapper">
      <match-team-block 
        :team-info="match.match.team_favorite" 
        :endorsements-count="match.endorsements.favorite" 
        :odds-change="match.match.odds_change" 
        :is-odds-change-significant="isOddsChangeSignificant"
        :is-predicted="match.scores.favorite.is_predicted"
        is-left
      />
      <div class="match-info-wrapper">
        <div class="match-info">
            <span class="match-date">{{ match.match.match_date }}</span>
            <span class="match-type">Map {{ match.map_order }}</span>
        </div>
        <div class="match-scores-wrapper">
          <template v-if="hasScores">
            <div class="match-score">{{ match.match.team_favorite.map_score }}</div>
            <div class="match-score">{{ match.match.team_opponent.map_score }}</div>
          </template>
        </div>
      </div>
      <match-team-block 
        :team-info="match.match.team_opponent" 
        :endorsements-count="match.endorsements.opponent" 
        :odds-change="match.match.odds_change" 
        :is-odds-change-significant="isOddsChangeSignificant"
        :is-predicted="match.scores.opponent.is_predicted"
      />
    </div>
    <div class="match-card__scale" :style="scaleStyles">
      <div class="match-card__scale-divider match-card__scale-divider--fav" :style="scaleDividerStyles[0]">
        <v-tooltip top>
          <template #trigger><div class="match-card__scale-divider__tooltip-trigger">&nbsp;</div></template>
          <template #content>{{ match.scores.favorite.score.toFixed(2) }}</template>
        </v-tooltip>
      </div>
      <div class="match-card__scale-divider match-card__scale-divider--opp" :style="scaleDividerStyles[1]">
        <v-tooltip top>
          <template #trigger><div class="match-card__scale-divider__tooltip-trigger">&nbsp;</div></template>
          <template #content>{{ match.scores.opponent.score.toFixed(2) }}</template>
        </v-tooltip>
      </div>
    </div>
  </article>
</template>

<script>
import MatchTeamBlock from './MatchTeamBlock.vue';
const ODDS_CHANGE_SIGNIFICANCE_FACTOR = 0.1;

export default {
  name: 'MatchCard',
  components: {
    MatchTeamBlock,
  },
  props: {
    match: Object,
    isSelected: Boolean,
  },
  computed: {
    favoriteRuleset() {
      return this.match.scores.favorite.ruleset;
    },
    opponentRuleset() {
      return this.match.scores.opponent.ruleset;
    },
    scaledValue() {
      const favoriteSuccess = this.favoriteRuleset ? (this.match.scores.favorite.score - this.favoriteRuleset.minimum) / (this.favoriteRuleset.maximum - this.favoriteRuleset.minimum) : 0;
      const opponentSuccess = this.opponentRuleset ? (this.match.scores.opponent.score - this.opponentRuleset.minimum) / (this.opponentRuleset.maximum - this.opponentRuleset.minimum) : 0;

      const average = (favoriteSuccess && opponentSuccess) ? (favoriteSuccess + opponentSuccess) / 2 : favoriteSuccess || opponentSuccess;

      return average * 100;
    },
    leftThreshold() {
      return (this.favoriteRuleset.threshold - this.favoriteRuleset.minimum) / (this.favoriteRuleset.maximum - this.favoriteRuleset.minimum) * 100;
    },
    rightThreshold() {
      return (this.opponentRuleset.threshold - this.opponentRuleset.minimum) / (this.opponentRuleset.maximum - this.opponentRuleset.minimum) * 100;
    },
    scaleStyles() {
      return {
        background: `linear-gradient(90deg, #B3BAE5 0%, #B3BAE5 ${ this.scaledValue }%, #FADE82 ${ this.scaledValue }%)`,
      };
    },
    scaleDividerStyles() {
      const favStyles = this.match.scores.favorite.score && this.favoriteRuleset ? {
        'left': `${ this.leftThreshold }%`,
      } : {
        'display': 'none',
      };

      const oppStyles = this.match.scores.opponent.score && this.opponentRuleset ? {
        'left': `${ this.rightThreshold }%`,
      } : {
        'display': 'none',
      };

      return [favStyles, oppStyles];
    },
    hasScores() {
      return this.match.match.team_favorite.map_score !== null && this.match.match.team_opponent.map_score !== null;
    },
    isOddsChangeSignificant() {
      return Math.abs(this.match.match.odds_change) > ODDS_CHANGE_SIGNIFICANCE_FACTOR;
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/Matches/match-card.scss';

</style>