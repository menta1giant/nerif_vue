<template>
  <div class="match-card" :class="{ 'match-card--selected': isSelected }">
    <div class="match-card__upper-wrapper">
        <match-team-block 
          :team-info="match.match.team_favorite" 
          :endorsements-count="match.endorsements.favorite" 
          :odds-change="match.match.odds_change" 
          :is-odds-change-significant="isOddsChangeSignificant"
          :is-predicted="Math.floor(Math.random()*50) == 0"
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
          :is-predicted="Math.floor(Math.random()*50) == 0"
        />
    </div>
    <div class="match-card__scale" :style="scaleStyles">
      <div class="match-card__scale-divider match-card__scale-divider--fav" :style="scaleDividerStyles[0]"></div>
      <div class="match-card__scale-divider match-card__scale-divider--opp" :style="scaleDividerStyles[1]"></div>
    </div>
  </div>
</template>

<script>
import MatchTeamBlock from './MatchTeamBlock.vue';
const ODDS_CHANGE_SIGNIFICANCE_FACTOR = 0.1;

export default {
  name: 'MatchCard',
  components: {
    MatchTeamBlock
  },
  props: {
    match: Object,
    isSelected: Boolean,
  },
  computed: {
    scaledValue() {
      const favoriteRuleset = this.match.scores.favorite.ruleset;
      const opponentRuleset = this.match.scores.opponent.ruleset;

      return ((this.match.scores.favorite.score - favoriteRuleset.minimum) / (favoriteRuleset.maximum - favoriteRuleset.minimum) + 
        (this.match.scores.opponent.score - opponentRuleset.minimum) / (opponentRuleset.maximum - opponentRuleset.minimum)) / 2 * 100;
    },
    leftThreshold() {
      const favoriteRuleset = this.match.scores.favorite.ruleset;

      return (favoriteRuleset.threshold - favoriteRuleset.minimum) / (favoriteRuleset.maximum - favoriteRuleset.minimum) * 100;
    },
    rightThreshold() {
      const opponentRuleset = this.match.scores.opponent.ruleset;

      return (opponentRuleset.threshold - opponentRuleset.minimum) / (opponentRuleset.maximum - opponentRuleset.minimum) * 100;
    },
    scaleStyles() {
      return {
        background: `linear-gradient(90deg, #B3BAE5 0%, #B3BAE5 ${ this.scaledValue }%, #FADE82 ${ this.scaledValue }%)`,
      };
    },
    scaleDividerStyles() {
      const favStyles = this.match.match.team_favorite.score !== null ? {
        'left': `${ this.leftThreshold }%`,
      } : {
        'display': 'none',
      };

      const oppStyles = this.match.match.team_opponent.score !== null ? {
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