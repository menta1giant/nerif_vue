<template>
  <v-section>
    <div class="content-wrapper-left" :class="{ desktop: isMatchesTabOpened }">
      <div class="date-picker-wrapper desktop">
        <date-picker />
      </div>
      <div class="filters desktop">
        <v-positioner v-model="isFiltersDropdownVisible">
          <template v-slot:body>
            <div class="filters__toggle-button">
              <v-icon type="solid" name="filter"/>
              <span>Filters</span>
              <v-chevron :isOpen="isFiltersDropdownVisible" />
            </div>
          </template>
          <template v-slot:dropdown>
            <v-popup>
              <matches-filters />
            </v-popup>
          </template>
        </v-positioner>
        <div class="filters__wrapper">
          <matches-filters />
        </div>
      </div>
      <div class="feed">
        <div class="feed__title">
          <h1>Telegram Feed</h1>
          <help-icon>Ten</help-icon>
        </div>
        <div class="feed__cappers-select__label"><v-label><b>Select cappers.</b> Or else..</v-label></div>
        <div class="feed__cappers-select__wrapper">
          <v-multiselect>Я мультиселект, меня можно кликать, но тут должно быть не это</v-multiselect>
        </div>
        <div class="feed__posts-list">
          <telegram-feed-post v-for="(a) in Array(32)" v-bind:key="a" @show-modal="isModalShown = true"></telegram-feed-post>
        </div>
      </div>
    </div>
    <div class="content-wrapper-right" :class="{ desktop: !isMatchesTabOpened }" ref="container-right">
  
      <matches-list @change-scroll="changeScroll"/>
  
    </div>
    <div class="toolbar mobile">
  
      <div class="toolbar__items">
        <div class="toolbar__controls">
          <date-picker />
          <v-positioner v-model="isFiltersDropdownVisible">
            <template v-slot:body>
              <div class="toolbar__icon" :class="{ active: isFiltersDropdownVisible }">
                <v-icon type="solid" name="filter" />
              </div>
            </template>
            <template v-slot:dropdown>
              <v-popup>
                <matches-filters />
              </v-popup>
            </template>
          </v-positioner>
        </div>
        <div class="toolbar__navigation">
          <div class="toolbar__icon" :class="{ active: isMatchesTabOpened }" @click="toggleOpenedTab(true)">
            <v-icon type="solid" name="gamepad" />
          </div>
          <div class="toolbar__icon" :class="{ active: !isMatchesTabOpened }" @click="toggleOpenedTab(false)">
            <v-icon type="solid" name="square-rss" />
          </div>
        </div>
      </div>
      
    </div>
  </v-section>

  <v-modal v-model="isModalShown"/>
</template>

<script>

import MatchesList from '@/components/Matches/MatchesList.vue';
import DatePicker from '@/components/Matches/DatePicker/DatePicker.vue';
import TelegramFeedPost from '@/components/Matches/Feed/TelegramFeedPost.vue';
import MatchesFilters from '@/components/Matches/MatchesFilters.vue';
import HelpIcon from '@/components/HelpIcon.vue';


const prikol = ["Lyngby Vikings", "Caught off Guard", "SAW Youngsters", "Malvinas", "DETONA", "BIGODES", "coluant", "Tranquillum", "Team GeT_RiGhT", "Insanium", "KINGZZZ", "From The Grave", "Halal Gang", "Verum", "Fiend", "The Big Dogs", "Lese", "Alke", "Goomba Stomp", "Russian Street Party", "WORTEX", "GORILLAZ", "Izako Boars", "Levitate", "YeniCherry", "Coldest Riders", "LSC", "ex-Cear\u0413\u040e", "AURA", "DBL PONEY", "Keyd", "Volted", "Peekers", "Big City Blues", "Triumph", "Meinser", "Hazard", "Extra Salt", "voLante", "ViCi", "Dr. Pepper", "GAIJIN", "eXploit", "okura", "Doge Soldiers", "Sestri", "ex-Feenix", "ex-Coalesce", "LPSP", "Villainous"];

export default {
  name: 'MatchesView',
  components: {
    MatchesList,
    DatePicker,
    TelegramFeedPost,
    MatchesFilters,
    HelpIcon,
  },
  data() {
    return {
      prikol: prikol,
      matchesScroll: 0,
      isMatchesTabOpened: true,
      isFiltersDropdownVisible: false,
      isModalShown: false,
    }
  },
  methods: {
    scrollContainerToYZero() {
      const container = this.$refs['container-right'].parentNode;
      container.scrollTop = 0;
    },
    scrollMatches(behavior) {
      this.$refs['container-right'].scrollTo({
        top: this.matchesScroll, 
        left: 0, 
        behavior: behavior,
      })
    },
    changeScroll(openedCardId, behavior) {
      if (openedCardId === undefined) return;
      const containerRight = this.$refs['container-right'];
      const firstMatchTop = containerRight.firstElementChild.firstElementChild.offsetTop
      const nthMatchTop = containerRight.firstElementChild.children[openedCardId].offsetTop;
      
      this.matchesScroll = nthMatchTop - firstMatchTop;
      this.scrollMatches(behavior);
    },
    toggleOpenedTab(newValue) {
      this.scrollContainerToYZero();
      this.isMatchesTabOpened = newValue;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Matches/variables.scss';
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
    align-items: center;
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
    align-items: center;
    gap: .25rem;
    padding: .25rem .75rem;

    cursor: pointer;
    color: $primary-ds-600;
    font-weight: 600;

    background: $primary-ds-50;
    border: 1px solid $primary-ds-100;
    border-radius: $border-radius-small;
  }
}

@media screen and (max-width: $tablet-breakpoint) {
  .filters {
    &__wrapper {
      display: none;
    }

    &__toggle-button {
      display: flex;
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
    scroll-behavior: smooth;
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
    @include clickable-icon;

    color: $primary-ds-600;
    font-size: $fs-h4;

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