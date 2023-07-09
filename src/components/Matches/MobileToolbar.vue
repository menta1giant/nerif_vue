<template>
  <div class="toolbar mobile">
    <div class="toolbar__items">
      <div class="toolbar__controls">
        <date-picker />
        <v-popup v-model="isFiltersDropdownVisible" :horizontal-margin="8">
          <template #trigger>
            <div class="toolbar__icon" :class="{ active: isFiltersDropdownVisible }">
              <v-icon-button name="filter" tooltip-content="Filters" :disable-focus="isFiltersDropdownVisible" />
            </div>
          </template>
          <template #content>
            <matches-filters />
          </template>
        </v-popup>
      </div>
      <div class="toolbar__navigation">
        <div class="toolbar__icon" :class="{ active: isMatchesTabOpened }" @click="toggleOpenedTab(true)">
          <v-icon-button name="gamepad" tooltip-content="Matches" />
        </div>
        <div class="toolbar__icon" :class="{ active: !isMatchesTabOpened }" @click="toggleOpenedTab(false)">
          <v-icon-button name="square-rss" tooltip-content="Telegram feed" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from '@/components/Matches/DatePicker/DatePicker.vue';
import MatchesFilters from '@/components/Matches/Filters/MatchesFilters.vue';

export default {
  name: 'MobileToolbar',
  components: {
    DatePicker,
    MatchesFilters,
  },
  emits: ['toggle-opened-tab'],
  props: {
    isMatchesTabOpened: Boolean,
  },
  data() {
    return {
      isFiltersDropdownVisible: false,
    };
  },
  methods: {
    toggleOpenedTab(val) {
      this.$emit('toggle-opened-tab', val);
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Matches/matches-toolbar.scss';

</style>