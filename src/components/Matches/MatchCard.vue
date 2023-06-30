<template>
  <div class="match-card" :class="{ 'match-card--selected': isSelected }">
    <div class="match-card__upper-wrapper">
        <match-team-block 
          :team-info="matchInfo.team1" 
          :endorsements-count="endorsements[0]" 
          :oddsChange="oddsChange" 
          :isOddsChangeSignificant="isOddsChangeSignificant"
          :isPredicted="Math.floor(Math.random()*50) == 0"
          isLeft
        />
        <div class="match-info-wrapper">
            <div class="match-info">
                <span class="match-date">{{ matchInfo.date }}</span>
                <span class="match-type">{{ matchInfo.type }}</span>
            </div>
            <div class="match-scores-wrapper">
              <template v-if="hasScores">
                <div class="match-score">{{ matchInfo.team1.score }}</div>
                <div class="match-score">{{ matchInfo.team2.score }}</div>
              </template>
            </div>
        </div>
        <match-team-block 
          :team-info="matchInfo.team2" 
          :endorsements-count="endorsements[1]" 
          :odds-change="oddsChange" 
          :is-odds-change-significant="isOddsChangeSignificant"
          :isPredicted="Math.floor(Math.random()*50) == 0"
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
    msg: String,
    oddsChange: {
      type: Number,
      default() {
        return 0.2;
      },
    },
    endorsements: {
      type: Array,
      default() {
        return [1, 0];
      },
    },
    isSelected: Boolean,
  },
  data() {
    return {
      matchInfo: {
        team1: {
          name: this.msg,
          coeff: 1.25,
          score: 16,
        },
        team2: {
          name: this.msg,
          coeff: 4,
          score: 16,
        },
        date: '10 Jun 2023 10:05',
        type: 'Map 1',
        score: {
          fav: {
            displayedValue: 120,
            threshold: 40,
          },
          opp: {
            displayedValue: 120,
            threshold: 80,
          },
          scaledValue: Math.floor(Math.random() * 40 + 40),
        }
      }
    }
  },
  computed: {
    scaleStyles() {
      return {
        background: `linear-gradient(90deg, #B3BAE5 0%, #B3BAE5 ${ this.matchInfo.score.scaledValue }%, #FADE82 ${ this.matchInfo.score.scaledValue }%)`,
      };
    },
    scaleDividerStyles() {
      const scores = this.matchInfo.score

      const favStyles = scores.fav.displayedValue !== null ? {
        'left': `${ scores.fav.threshold }%`,
      } : {
        'display': 'none',
      };

      const oppStyles = scores.opp.displayedValue !== null ? {
        'left': `${ scores.opp.threshold }%`,
      } : {
        'display': 'none',
      };

      return [favStyles, oppStyles];
    },
    hasScores() {
      return this.matchInfo.team1.score !== null && this.matchInfo.team2.score !== null;
    },
    isOddsChangeSignificant() {
      return Math.abs(this.oddsChange) > ODDS_CHANGE_SIGNIFICANCE_FACTOR;
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/Matches/match-card.scss';

</style>