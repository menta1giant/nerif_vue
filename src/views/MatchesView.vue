<template>
  <div class="content-wrapper-left" :class="{ desktop: isMatchesTabOpened }">

    <div class="date-picker-wrapper desktop">
      <date-picker />
    </div>
    <div class="filters desktop">
      <nrf-positioner v-model="isFiltersDropdownVisible">
        <template v-slot:body>
          <div class="filters__toggle-button">Filters ></div>
        </template>
        <template v-slot:dropdown>
          <nrf-popup>
            <matches-filters />
          </nrf-popup>
        </template>
      </nrf-positioner>
      <div class="filters__wrapper">
        <matches-filters />
      </div>
    </div>
    <!-- FEED COMPONENT -->
    <div class="feed">
      <div class="feed__title">
        <h1>Telegram Feed</h1>
        <div class="help-icon"></div>
      </div>
      <div class="feed__cappers-select__label"><nrf-label><b>Select cappers.</b> Or else..</nrf-label></div>
      <div class="feed__cappers-select__wrapper">
        <nrf-multiselect>Я мультиселект, меня можно кликать, но тут должно быть не это</nrf-multiselect>
      </div>
      <div class="feed__posts-list">
        <telegram-feed-post v-for="(a) in Array(32)" v-bind:key="a"></telegram-feed-post>
      </div>
    </div>

  </div>
  <div class="content-wrapper-right" :class="{ desktop: !isMatchesTabOpened }">

    <matches-list />

  </div>
  <!-- TOOLBAR MOBILE COMPONENT -->
  <div class="toolbar mobile">

    <div class="toolbar__items">
      <div class="toolbar__controls">
        <date-picker />
        <nrf-positioner v-model="isFiltersDropdownVisible">
          <template v-slot:body>
            <div class="toolbar__icon" :class="{ active: isFiltersDropdownVisible }">
              <nrf-icon type="solid" name="filter" />
            </div>
          </template>
          <template v-slot:dropdown>
            <nrf-popup>
              <matches-filters />
            </nrf-popup>
          </template>
        </nrf-positioner>
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

import MatchesList from '@/components/Matches/MatchesList.vue';
import DatePicker from '@/components/Matches/DatePicker.vue';
import TelegramFeedPost from '@/components/Matches/TelegramFeedPost.vue';
import MatchesFilters from '@/components/Matches/MatchesFilters.vue';

const prikol = ["Lyngby Vikings", "Caught off Guard", "SAW Youngsters", "Malvinas", "DETONA", "BIGODES", "coluant", "Tranquillum", "Team GeT_RiGhT", "Insanium", "KINGZZZ", "From The Grave", "Halal Gang", "Verum", "Fiend", "The Big Dogs", "Lese", "Alke", "Goomba Stomp", "Russian Street Party", "WORTEX", "GORILLAZ", "Izako Boars", "Levitate", "YeniCherry", "Coldest Riders", "LSC", "ex-Cear\u0413\u040e", "AURA", "DBL PONEY", "Keyd", "Volted", "Peekers", "Big City Blues", "Triumph", "Meinser", "Hazard", "Extra Salt", "voLante", "ViCi", "Dr. Pepper", "GAIJIN", "eXploit", "okura", "Doge Soldiers", "Sestri", "ex-Feenix", "ex-Coalesce", "LPSP", "Villainous"];

export default {
  name: 'MatchesView',
  components: {
    MatchesList,
    DatePicker,
    TelegramFeedPost,
    MatchesFilters
  },
  data() {
    return {
      prikol: prikol,
      isMatchesTabOpened: true,
      isFiltersDropdownVisible: false,
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
@import '@/assets/styles/Matches/mixins.scss';
.date-picker-wrapper {
  max-width: 100%;
}

.feed {
  @include thick-rounded-block;

  width: 100%;
  max-height: 100%;
  overflow: auto;
  padding-top: 1rem;

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

.filters {
  display: flex;

  &__wrapper {
    width: 100%;
  }

  &__toggle-button {
    display: none;
  }
}

@media screen and (max-width: $tablet-breakpoint) {
  .filters {
    &__wrapper {
      display: none;
    }

    &__toggle-button {
      display: inline-block;
    }
  }
}

.content-wrapper {

  &-left,
  &-right {
    min-width: 0;
    flex: 1;
    padding-block: var(--container-padding-block);
    padding-left: .5rem;
    padding-right: .5rem;

    display: flex;
    flex-direction: column;
  }

  &-left {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    //overflow: hidden auto;

    position: sticky;
    top: 0;
    margin-right: 2rem;
  }

  &-right {
    overflow: hidden scroll;
  }
}

.toolbar {
  position: fixed;
  bottom: $navbar-height;
  height: 52px;
  background-color: $black-40;
  box-shadow: inset 0 2px 0 0 $primary-s-50;
  width: 100%;

  align-items: center;

  &__controls {
    display: flex;
    align-items: inherit;
  }

  &__navigation {
    flex: 1;

    display: flex;
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
    cursor: pointer;

    color: $primary-ds-600;
    font-size: $fs-h4;
    padding: 0 .5rem;

    display: flex;
    align-items: center;

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
    padding-bottom: 0;
  }

  .feed {
    background: $black-10;
    border: none;
    //overflow: initial;
    max-height: unset;
    padding-top: 0;
    padding-bottom: var(--container-padding-block);

    &__posts-list {
      overflow: initial;
    }

    &__cappers-select__wrapper {
      position: sticky;
      top: .0;
      background: $black-10;
    }
  }

}
</style>