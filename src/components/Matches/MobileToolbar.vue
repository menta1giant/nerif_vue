<template>
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