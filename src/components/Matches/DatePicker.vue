<template>
  <div class="date-picker">
    <div class="date-picker__date-increase"><nrf-icon type="solid" name="arrow-left" /></div>
    <date-picker-item 
      v-for="date in selectableDates" 
      v-bind:key="date.getDay()" 
      :day="date.getDate()" 
      :weekday="date.getDay()" 
      :isActive="currentDate.getDay() === date.getDay()" 
      @click="changeDate(date)"
    />
    <div class="date-picker__date-increase"><nrf-icon type="solid" name="arrow-right" /></div>
    <nrf-positioner v-model="isDropdownVisible" position="right">
      <template v-slot:body>
        <div class="date-picker__calendar-toggle" :class="{ active: isDropdownVisible }">
          <nrf-icon type="solid" name="calendar-days" />
        </div>
      </template>
      <template v-slot:dropdown>
        <date-picker-popup v-model="isDropdownVisible" @change-date="(date) => currentDate = date"/>
      </template>
      
    </nrf-positioner>
  </div>
</template>

<script>
import DatePickerItem from './DatePickerItem.vue';
import DatePickerPopup from './DatePickerPopup.vue';
import DatePickerMixin from './DatePickerMixin.js';

export default {
  name: 'DatePicker',
  components: {
    DatePickerItem,
    DatePickerPopup,
  },
  mixins: [
    DatePickerMixin,
  ],
  props: {
    msg: String,
  },
  data() {
    return {
      isDropdownVisible: false,
      currentDate: new Date(),
    };
  },
  computed: {
    selectableDates() {
      const daysAfterSelectedCount = Math.min(Math.floor(((new Date()) - this.currentDate) / (3600000 * 24)), 3);
      console.log(daysAfterSelectedCount);
      const days = [];
      for (let i=(daysAfterSelectedCount-6); i<=daysAfterSelectedCount; i++) {
        days.push(new Date(this.year, this.month, this.date + i));
      }

      return days;
    }
  },
  methods: {
    changeDate(date) {
      this.currentDate = date;
    },
  }
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
      @include clickable-icon;
      display: flex;
      align-items: center;

      color: $primary-ds-600;
      font-size: $fs-h4;

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