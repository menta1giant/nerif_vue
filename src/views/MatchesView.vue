<template>
  <div class="content-wrapper-left" :class="{ desktop: isMatchesTabOpened }">
    <div class="date-picker-wrapper desktop"><date-picker /></div>
    <div class="filters desktop">
      <div class="filters__toggle-button">Filters ></div>
      <div class="filters__list">
        <nrf-switcher-field v-for="(a, b) in Array(12)" v-bind:key="a" :label="prikol[b]" />
      </div>
    </div>
    <div class="feed">

        <div class="feed__title">
          <h1>Telegram Feed</h1>
          <div class="help-icon"></div>
        </div>
        <div class="feed__cappers-select__label"><nrf-label><b>Select cappers.</b> Or else..</nrf-label></div>
        <div class="feed__cappers-select__wrapper">
          <div class="multiselect"></div>
        </div>

      <div class="feed__posts-list">
        <telegram-feed-post v-for="(a) in Array(32)" v-bind:key="a"></telegram-feed-post>
      </div>
    </div>
  </div>
  <div class="content-wrapper-right" :class="{ desktop: !isMatchesTabOpened }">
    <div class="matches">
      <match-card v-for="(a, b) in Array(20)" v-bind:key="a" :msg="prikol[b].toUpperCase()" />
    </div>
  </div>
  <div class="toolbar mobile">
    <div class="toolbar__items">
      <div class="toolbar__controls">
        <date-picker />
        <div class="toolbar__icon">
          <nrf-icon type="solid" name="filter" />
        </div>
      </div>
      <div class="toolbar__navigation">
        <div class="toolbar__icon" :class="{ active: isMatchesTabOpened }" @click="toggleOpenedTab(true)">
          <nrf-icon type="solid" name="gamepad" />
        </div>
        <div class="toolbar__icon" :class="{ active: !isMatchesTabOpened }" @click="toggleOpenedTab(false)">
          <nrf-icon type="solid" name="square-rss" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MatchCard from '@/components/Matches/MatchCard.vue';
import DatePicker from '@/components/Matches/DatePicker.vue';
import TelegramFeedPost from '@/components/Matches/TelegramFeedPost.vue';

const prikol = ["Lyngby Vikings", "Caught off Guard", "SAW Youngsters", "Malvinas", "DETONA", "BIGODES", "coluant", "Tranquillum", "Team GeT_RiGhT", "Insanium", "KINGZZZ", "From The Grave", "Halal Gang", "Verum", "Fiend", "The Big Dogs", "Lese", "Alke", "Goomba Stomp", "Russian Street Party", "WORTEX", "GORILLAZ", "Izako Boars", "Levitate", "YeniCherry", "Coldest Riders", "LSC", "ex-Cear\u0413\u040e", "AURA", "DBL PONEY", "Keyd", "Volted", "Peekers", "Big City Blues", "Triumph", "Meinser", "Hazard", "Extra Salt", "voLante", "ViCi", "Dr. Pepper", "GAIJIN", "eXploit", "okura", "Doge Soldiers", "Sestri", "ex-Feenix", "ex-Coalesce", "LPSP", "Villainous"];

export default {
  name: 'MatchesView',
  components: {
    MatchCard,
    DatePicker,
    TelegramFeedPost
  },
  data() {
    return {
      prikol: prikol,
      isMatchesTabOpened: true,
    }
  },
  methods: {
    scrollContainerToYZero() {
      const container = document.getElementById("container");
      container.scrollTop = 0;
    },
    toggleOpenedTab(newValue) {
      this.scrollContainerToYZero();
      this.isMatchesTabOpened = newValue;
    }
  }
}
</script>

<style lang="scss" scoped>
.date-picker-wrapper {
  max-width: 100%;
}
.filters {
  width: 100%;

  &__toggle-button {
    display: none;
  }

  &__list {
    width: 100%;

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20ch, 1fr));
    grid-column-gap: .75rem;
  }

  @media screen and (max-width: $tablet-breakpoint) {
    .filters__toggle-button {
      display: block;
    }

    .filters {
      display: none;
    }
  }
}

.feed {
  width: 100%;
  max-height: 100%;
  overflow: auto;
  padding-top: 1rem;

  background: rgba(255, 255, 255, .4);
  border: 2px solid $primary-s-50;
  border-radius: 12px;

  display: flex;
  flex-direction: column;

  &__title {
    padding: 0 1rem;
    margin-bottom: 1.25rem;

    font-weight: $fw-bold;
    font-size: $fs-h4;

    display: flex;
    justify-content: center;
  }

  &__cappers-select__label {
    padding: 0 1rem;
  }

  &__cappers-select__wrapper {
    margin-top: .25rem;
    padding: 0 1rem 1rem 1rem;

    font-size: $fs-xs;
    line-height: $lh-small;
    font-weight: $fw-regular;

    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: .25rem;

    .multiselect {
      display: block;
      height: 2.5rem; ///////
      width: 100%;

      background: $black-10;
      border: 1px solid rgba($primary-ds-100, .5);
      border-radius: $border-radius-small;
    }
  }

  &__posts-list {
    font-size: $fs-xxs;

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(16em, 1fr));

    gap: 1rem;
    padding: 0 .8rem 1rem 1rem;
    margin-right: .2rem;
    overflow-y: scroll;
  }
}

.content-wrapper {

  &-left,
  &-right {
    min-width: 0;
    flex: 1;
  }

  &-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    position: sticky;
    top: 0;
    margin-right: 2rem;
  }
}

.matches {
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2rem;
}

.toolbar {
  position: fixed;
  bottom: $navbar-height;
  height: 52px;
  background-color: $black-40;
  box-shadow: inset 0 2px 0 0 $primary-s-50;
  width: 100%;

  div {
    display: flex;
  }

  &__navigation {
    flex: 1;
    justify-content: flex-end;
  }

  &__items {
    height: 100%;
    padding: 0 $container-horizontal-padding-mobile;
    bottom: 80;

    display: flex;
    align-items: center;
    justify-content: space-between;

    flex: 1;
  }

  &__icon {
    align-items: center;
    cursor: pointer;

    color: $primary-ds-600;
    font-size: $fs-h4;
    padding: 0 .5rem;

    &.active {
      color: $accent-900;
    }
  }
}

@media screen and (max-width: $mobile-breakpoint) {
  .content-wrapper-right {
    margin: 0;
    padding-top: 1rem;
    width: unset;
  }

  .content-wrapper-left {
    margin: 0;
    position: static;
  }

  .feed {
    background: $black-10;
    border: none;
    overflow: initial;
    max-height: unset;

    &__posts-list {
      overflow: initial;
    }

    &__cappers-select__wrapper {
      //background: $black-10;
      position: sticky;
      top: .5rem;
    }
  }

}
</style>