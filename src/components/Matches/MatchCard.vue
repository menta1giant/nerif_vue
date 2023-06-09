<template>
  <div class="match-card">
    <div class="match-card__upper-wrapper">
        <div class="team-block team-block--left">
            <div class="team-block__name">{{ msg }}</div>
            <div class="team-block__properties">
                <div class="team-block__coeff">
                    <div>1.5</div>
                </div>
                <div class="team-block__meta">
                    <div class="team-block__meta__item"></div>
                    <div class="team-block__meta__item"></div>
                </div>
            </div>
        </div>
        <div class="match-info-wrapper">
            <div class="match-info">
                <span class="match-date">2022-12-20 0:44</span>
                <span class="match-type">Map 1</span>
            </div>
            <div class="match-scores-wrapper">
                <div class="match-score">16</div>
                <div class="match-score">16</div>
            </div>
        </div>
        <div class="team-block team-block--right">
            <div class="team-block__name">{{ msg }}</div>
            <div class="team-block__properties">
                <div class="team-block__coeff">
                    <div>1.5</div>
                </div>
                <div class="team-block__meta">
                    <div class="team-block__meta__item"></div>
                    <div class="team-block__meta__item"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="match-card__scale"></div>
  </div>
</template>

<script>

export default {
  name: 'MatchCard',
  props: {
    msg: String
  }
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
    flex-direction: column;
    display: flex;
    flex: 1;
    justify-content: flex-end;

    font-size: $fs-medium;
    font-size: clamp($fs-xxs, 1.5vw, $fs-medium);
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
    background: linear-gradient(90deg,$primary-s-100 0%, $primary-s-100 60%, $accent-300 60%);
    //background: linear-gradient(to bottom, hsl(0, 0%, 100%) 0%, hsla(0, 0%, 100%, 0) 50%, hsla(0, 0%, 0%, 0) 50%, hsl(0, 0%, 0%) 100%), linear-gradient(to right, hsl(0, 0%, 50%) 0%, hsla(0, 0%, 50%, 0) 100%);

    display: flex;
    width: 60%;
    width: min(80%,calc($match-info-wrapper-width + 1.5rem + $match-card-coeff-width + $match-card-coeff-width));
  }
</style>