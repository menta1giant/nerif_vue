<template>
  <div class="date-picker">
    <div class="date-picker__date-increase" @click="changeToAdjacentDate(-1)"><v-icon type="solid" name="arrow-left" /></div>
    <date-picker-item 
      v-for="date in selectableDates" 
      :key="date.getDay()" 
      :day="date.getDate()" 
      :weekday="date.getDay()" 
      :isActive="day === date.getDay()" 
      @click="day !== date.getDay() && changeDate(date)"
    />
    <div class="date-picker__date-increase" :class="{ disabled: isCurrentDateToday }" @click="!isCurrentDateToday && changeToAdjacentDate(1)"><v-icon type="solid" name="arrow-right" /></div>
    <v-popup v-model="isDropdownVisible" :horizontal-margin="8" left>
      <template #trigger>
        <div class="date-picker__calendar-toggle" :class="{ active: isDropdownVisible }">
          <v-icon-button name="calendar-days" tooltip-content="Calendar" :disable-focus="isDropdownVisible" />
        </div>
      </template>
      <template #content>
        <date-picker-popup v-model="isDropdownVisible" :selected-date="currentDate" @change-date="changeDate"/>
      </template>
      
    </v-popup>
  </div>
</template>

<script>
import DatePickerItem from './DatePickerItem.vue';
import DatePickerPopup from './DatePickerPopup.vue';
import datePickerMixin from './datePickerMixin.js';

import { millisecondsInADay } from '@/lib/date';

export default {
  name: 'DatePicker',
  components: {
    DatePickerItem,
    DatePickerPopup,
  },
  mixins: [
    datePickerMixin,
  ],
  data() {
    return {
      isDropdownVisible: false,
    };
  },
  computed: {
    currentDate() {
      return this.$store.getters.getMatchesSelectedDate;
    },
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
      this.$store.commit('setMatchesSelectedDate', date);
    },
    changeToAdjacentDate(delta) {
      const newDate = new Date(this.year, this.month, this.date + delta);

      this.changeDate(newDate);
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Matches/DatePicker/date-picker.scss';

</style>