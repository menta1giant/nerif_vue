<template>
  <div class="date-picker">
    <div class="date-picker__date-increase"><nrf-icon type="solid" name="arrow-left" /></div>
    <date-picker-item v-for="(a, _$) in Array(7)" v-bind:key="a" :day="_$+1" :weekday="_$"></date-picker-item>
    <div class="date-picker__date-increase"><nrf-icon type="solid" name="arrow-right" /></div>
    <nrf-positioner v-model="isDropdownVisible" position="right">
      <template v-slot:body>
        <div class="date-picker__calendar-toggle" :class="{ active: isDropdownVisible }">
          <nrf-icon type="solid" name="calendar-days" />
        </div>
      </template>
      <template v-slot:dropdown>
        <date-picker-popup />
      </template>
      
    </nrf-positioner>
  </div>
</template>

<script>
import DatePickerItem from './DatePickerItem.vue';
import DatePickerPopup from './DatePickerPopup.vue';

export default {
  name: 'DatePicker',
  components: {
    DatePickerItem,
    DatePickerPopup,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      isDropdownVisible: false,
    };
  },
}
</script>

<style lang="scss" scoped>
  .date-picker {
    max-width: inherit;
    gap: .5rem;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    &__calendar-toggle {
      display: flex;
      align-items: center;

      color: $primary-ds-600;
      font-size: $fs-h4;
      padding: 0 .5rem;

      &.active {
        color: $accent-900;
      }
    }
  }

  .date-picker__date-increase {
      display: none;
    }

  @media screen and (max-width: $mobile-breakpoint) {
    .date-picker__date-increase {
      display: flex;
      align-items: center;
    }
  }
</style>