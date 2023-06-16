<template>
  <div class="team-block" :class="{ 'team-block--left': isLeft }">
    <div class="team-block__name"><span :class="{ 'team-block__name--predicted': isPredicted }">{{ teamInfo.name }}</span></div>
    <div class="team-block__properties">
      <div class="team-block__coeff">
        <div>{{ teamInfo.coeff }}</div>
      </div>
      <div class="team-block__meta">
        <div v-if="isOddsChangeSignificant" class="team-block__meta__item team-block__meta__item--odds" :class="{ 'team-block__meta__item--odds-fall': isLeft ? oddsChange > 0 : oddsChange < 0 }">
          <v-icon name="angles-up" />
        </div>
        <div v-if="endorsementsCount" class="team-block__meta__item team-block__meta__item--endorsements">{{ endorsementsCount }}</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MatchTeamBlock',
  props: {
    teamInfo: Object,
    oddsChange: Number,
    endorsementsCount: Number,
    isOddsChangeSignificant: Boolean,
    isPredicted: Boolean,
    isLeft: Boolean,
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Matches/variables.scss';

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
    //min-width: fit-content;

    font-family: $ff-display;
    line-height: $lh-medium;
    font-weight: $fw-semi-bold;
    text-align: left;
    color: $primary-ds-700;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &--predicted {
      background: linear-gradient(90deg, rgba($accent-500, 0) 0%, rgba($accent-500, .8) 30%, rgba($accent-500, .8) 70%, rgba($accent-500, 0) 100%);
    }
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
      width: 1.5em;
      height: 1.5em;
      background: rgba(255, 0, 0, 0.01);

      display: flex;
        justify-content: center;
        align-items: center;

      font-size: .75em;

      &--odds {
        color: rgba($red-900, .5);

        &-fall {
          color: rgba($green-900, .5);
          transform: rotate(180deg);
        }
      }
      
      &--endorsements {
        border-radius: 50%;
        background: $accent-500;
        font-weight: 700;
      }
    }
  }
}

.team-block--left {
  //align-items: flex-end;
  .team-block__name {
    text-align: right;
  }

  .team-block__properties {
    flex-direction: row-reverse;
  }

  .team-block__meta {
    flex-direction: row-reverse;
  }
}

</style>