<template>
  <div class="date-picker">
    <div class="date-picker__date-increase"><nrf-icon type="solid" name="arrow-left" /></div>
    <date-picker-item v-for="(a, _$) in Array(7)" v-bind:key="a" :day="_$+1" :weekday="_$"></date-picker-item>
    <div class="date-picker__date-increase"><nrf-icon type="solid" name="arrow-right" /></div>
    <div class="date-picker__calendar-toggle">
        <nrf-icon type="solid" name="calendar-days" />
    </div>
  </div>
</template>

<script>
import DatePickerItem from './DatePickerItem.vue'

export default {
  name: 'DatePicker',
  components: {
    DatePickerItem
  },
  props: {
    msg: String,
  }
}
</script>

<style lang="scss" scoped>
  .date-picker {
    max-width: 100%;
    gap: .5rem;

    display: flex;
    flex-direction: row;
    justify-content: center;

    &__calendar-toggle {
      display: flex;
      align-items: center;

      color: $primary-ds-600;
      font-size: $fs-h4;
      padding: 0 .5rem;
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