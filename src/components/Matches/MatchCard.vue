<template>
  <div class="match-card">
    <div class="match-card__upper-wrapper">
        <div class="team-block team-block--left">
            <div class="team-block__name">{{ matchInfo.team1.name }}</div>
            <div class="team-block__properties">
                <div class="team-block__coeff">
                    <div>{{ matchInfo.team1.coeff }}</div>
                </div>
                <div class="team-block__meta">
                    <div class="team-block__meta__item"></div>
                    <div class="team-block__meta__item"></div>
                </div>
            </div>
        </div>
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
        <div class="team-block team-block--right">
            <div class="team-block__name">{{ matchInfo.team2.name }}</div>
            <div class="team-block__properties">
                <div class="team-block__coeff">
                    <div>{{ matchInfo.team2.coeff }}</div>
                </div>
                <div class="team-block__meta">
                    <div class="team-block__meta__item"></div>
                    <div class="team-block__meta__item"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="match-card__scale" :style="scaleStyles"></div>
  </div>
</template>

<script>

export default {
  name: 'MatchCard',
  props: {
    msg: String
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
          displayedValue: 120,
          scaledValue: Math.floor(Math.random() * 40 + 40),
          favThreshold: 10,
          oppThreshold: 20,
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
    hasScores() {
      return this.matchInfo.team1.score !== null && this.matchInfo.team2.score !== null;
    },
  },
}
</script>

<style lang="scss">
  $match-info-wrapper-width: 30%;
  $match-score-line-height: clamp($fs-h3, 2.5vw, $fs-h2);

  .match-card {
    padding-block: .75rem;
    gap: .75rem;

    background-color: $match-card-bg;
    border-radius: $border-radius-medium;
    box-shadow: 0 4px 9px 0 rgba($primary-ds-800, 0.1);

    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;

    &__upper-wrapper { 
      width: 100%;
      gap: .75rem;

      display: flex;
      justify-content: center;
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

  .team-block {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: flex-end;

    font-size: $fs-medium;
    font-size: clamp($fs-xxs, 2vw, $fs-medium);
    min-width: 0;
    gap: .25em;

    &__name {
      font-family: $ff-display;
      line-height: $lh-medium;
      font-weight: $fw-semi-bold;
      text-align: left;
      color: $primary-ds-700;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &__coeff {
      border-radius: $border-radius-medium;
      border-color: $primary-ds-100;
      border-style: solid;
      border-width: 1px;
      background: $black-10;

      font-family: $ff-primary;
      font-size: $fs-large;
      font-size: clamp($fs-medium, 1.3vw, $fs-large);
      line-height: $match-score-line-height;
      font-weight: $fw-medium;
      color: $primary-ds-800;

      display: flex;
      justify-content: center;
      width: 3.75rem;
      width: $match-card-coeff-width;
      height: $match-score-line-height;
    }

    &__properties {
      display: flex;
      flex-direction: row;
    }

    &__meta {
      font-size: $fs-medium;
      padding: .25em;
      gap: .25em;

      display: flex;

      &__item {
        width: 1em;
        height: 1em;
        background: rgba(255, 0, 0, 0.01);

        display: flex;
      }
    }
  }

  .team-block--left {
    .team-block__name {
      text-align: right;
    }

    .team-block__properties {
      flex-direction: row-reverse;
    }
  }

  .match-card__scale {
    height: .5rem;

    display: flex;
    width: 60%;
    width: min(80%,calc($match-info-wrapper-width + 1.5rem + $match-card-coeff-width + $match-card-coeff-width));
  }
</style>