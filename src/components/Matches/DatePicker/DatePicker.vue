<template>
  <div class="date-picker">
    <div class="date-picker__date-increase" @click="changeToAdjacentDate(-1)"><v-icon type="solid" name="arrow-left" /></div>
    <date-picker-item 
      v-for="date in selectableDates" 
      v-bind:key="date.getDay()" 
      :day="date.getDate()" 
      :weekday="date.getDay()" 
      :isActive="day === date.getDay()" 
      @click="day !== date.getDay() && changeDate(date)"
    />
    <div class="date-picker__date-increase" :class="{ disabled: isCurrentDateToday }" @click="!isCurrentDateToday && changeToAdjacentDate(1)"><v-icon type="solid" name="arrow-right" /></div>
    <v-positioner v-model="isDropdownVisible" position="left">
      <template v-slot:body>
        <div class="date-picker__calendar-toggle" :class="{ active: isDropdownVisible }">
          <v-icon type="solid" name="calendar-days" />
        </div>
      </template>
      <template v-slot:dropdown>
        <date-picker-popup v-model="isDropdownVisible" :selected-date="currentDate" @change-date="changeDate"/>
      </template>
      
    </v-positioner>
  </div>
</template>

<script>
import DatePickerItem from './DatePickerItem.vue';
import DatePickerPopup from './DatePickerPopup.vue';
import DatePickerMixin from './DatePickerMixin.js';

import { millisecondsInADay } from '@/lib/date';

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
    daysAfterSelectedCount() {
      return Math.min(Math.floor(((new Date()) - this.currentDate) / millisecondsInADay), 3);
    },
    selectableDates() {
      const days = [];

      for (let i=(this.daysAfterSelectedCount-6); i<=this.daysAfterSelectedCount; i++) {
        const newDate = new Date(this.year, this.month, this.date + i);

        days.push(newDate);
      }

      return days;
    },
    isCurrentDateToday() {
      return this.daysAfterSelectedCount === 0;
    },
  },
  methods: {
    changeDate(date) {
      this.currentDate = date;
    },
    changeToAdjacentDate(delta) {
      const newDate = new Date(this.year, this.month, this.date + delta);

      this.changeDate(newDate);
    },
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

  .date-picker__date-increase {
    display: none;

    cursor: pointer;

    &.disabled {
      cursor: default;
      color: $primary-ds-100;
    }
  }

  @media screen and (max-width: $mobile-breakpoint) {
    .date-picker__date-increase {
      display: flex;
      align-items: center;
    }
  }
</style>