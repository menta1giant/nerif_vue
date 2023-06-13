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
@import '@/assets/styles/Matches/variables.scss';

.match-card {
  @include no-tap-highlight;
  cursor: pointer;

  padding-block: .75rem;
  gap: .75rem;

  background-color: $match-card-bg;
  border-radius: $border-radius-medium;
  box-shadow: 0 4px 9px 0 rgba($primary-ds-800, 0.1);

  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;

  outline: 2px solid transparent;

  transition: box-shadow 0.5s ease;

  &__upper-wrapper { 
    width: 100%;
    gap: .75rem;

    display: flex;
    justify-content: center;
  }

  &:hover, &--selected {
    //outline: 2px solid $primary-s-200;
    box-shadow: 0 4px 9px 0 rgba($primary-ds-800, 0.1), 0 0 4px 2px rgba($primary-s-300, 0.5);
  }

}

.match-info {
  display: flex;
  flex-direction: column;
  line-height: $lh-small;
  align-items: center;
  color: $primary-ds-800;
  
  .match-date {
    font-size: $fs-xs;
    font-size: clamp($fs-xxs, 1vw, $fs-xs);
  }

  .match-type {
    font-size: clamp(.625rem, .8vw, $fs-xxs);
  }

  span {
    white-space: nowrap;
  }

  &-wrapper {
    width: $match-info-wrapper-width;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}

.match-scores-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.match-score {
  font-size: $match-score-line-height;
  font-weight: $fw-medium;
  color: $primary-ds-300;
  line-height: $match-score-line-height;
  font-family: $ff-primary;

  display: flex;
  align-items: flex-end;
}

.match-card__scale {
  position: relative;
  height: .5rem;

  display: flex;
  width: 60%;
  width: min(80%,calc($match-info-wrapper-width + 1.5rem + $match-card-coeff-width + $match-card-coeff-width));

  &-divider {
    position: absolute;
    height: .75rem;
    top: -.125rem;
    width: 2px;

    &--fav {
      background: $primary-s-300;
    }

    &--opp {
      background: $accent-900;
    }
  }
}
</style>