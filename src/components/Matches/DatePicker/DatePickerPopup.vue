<template>
  <div class="date-picker-popup">
    <div class="date-picker-popup__header">
      <div class="date-picker-popup__change-month" @click="previousMonth">
        <v-icon type="solid" name="arrow-left"/>
      </div>
      <span>{{ `${ monthName } ${ year }` }}</span>
      <div 
        class="date-picker-popup__change-month" 
        :class="{ 'date-picker-popup__change-month--disabled': isThisMonthCurrentMonth }" 
        @click="!isThisMonthCurrentMonth && nextMonth()"
      >
        <v-icon type="solid" name="arrow-right"/>
      </div>
    </div>
    <div class="date-picker-popup__body">
      <table class="date-picker-popup__days">
        <thead>
          <tr>
            <th v-for="day in weekDays" :key="Math.random()">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, index) in weeks" :key="index">
            <td
              v-for="date in week"
              :key="Math.random()"
            >
              <div
                class="date-picker-popup__day"
                :class="{
                  'date-picker-popup__day--other-month': !date.inMonth,
                  'date-picker-popup__day--selected': date.selected,
                  'date-picker-popup__day--today': date.today,
                  'date-picker-popup__day--disabled': !date.day || date.disabled,
                }"
                @click="date.day && !date.disabled && selectDate(date.day)"
              >
                {{ date.day }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import DatePickerMixin from './DatePickerMixin.js';
import { weekDays, monthNames } from './const';

export default {
  name: 'DatePickerPopup',
  mixins: [
    DatePickerMixin,
  ],
  props: {
    selectedDate: {
      type: Object,
      default() {
        return new Date();
      },
    },
  },
  data() {
    return {
      showCalendar: false,
      monthNames: monthNames,
      weekDays: weekDays,
      currentDate: new Date(),
      internalSelectedDate: new Date(),
      today: new Date(),
    };
  },
  computed: {
    monthName() {
      return this.monthNames[this.month];
    },
    daysInMonth() {
      return new Date(this.year, this.month + 1, 0).getDate();
    },
    firstDayOfMonth() {
      return new Date(this.year, this.month, 1).getDay();
    },
    isThisMonthCurrentMonth() {
      return (this.month === this.today.getMonth()) && (this.year === this.today.getFullYear());
    },
    isCurrentMonthSelectedMonth() {
      return (this.month === this.internalSelectedDate.getMonth()) && (this.year === this.internalSelectedDate.getFullYear());
    },
    days() {
      const days = [];

      for (let i = 0; i < this.firstDayOfMonth; i++) {
        days.push({
          day: "",
          inMonth: false,
        });
      }

      for (let i = 1; i <= this.daysInMonth; i++) {
        days.push({
          day: i,
          inMonth: true,
          selected: this.isCurrentMonthSelectedMonth && i === this.internalSelectedDate.getDate(),
          today: this.isThisMonthCurrentMonth && i === this.today.getDate(),
          disabled: this.currentDate > this.today || (this.isThisMonthCurrentMonth && i > this.today.getDate()),
        });
      }
      
      return days;
    },
    weeks() {
      const weeks = [];
      let week = [];
      for (let i = 0; i < this.days.length; i++) {
        week.push(this.days[i]);
        if (week.length === 7) {
          weeks.push(week);
          week = [];
        }
      }
      if (week.length > 0) {
        for (let i = week.length; i < 7; i++) {
          week.push({
            day: "",
            inMonth: false
          });
        }
        weeks.push(week);
      }
      return weeks;
    },
    formattedDate() {
      return this.internalSelectedDate
        ? this.internalSelectedDate.toLocaleDateString()
        : "";
    }
  },
  watch: {
    selectedDate: {
      immediate: true,
      handler(date) {
        this.internalSelectedDate = date;
        this.changeCurrentDate(new Date(date.getTime()));
      },
    },
  },
  methods: {
    previousMonth() {
      this.currentDate = new Date(
        this.year,
        this.month - 1,
        this.currentDate.getDate()
      );
    },
    nextMonth() {
      this.currentDate = new Date(
        this.year,
        this.month + 1,
        this.currentDate.getDate()
      );
    },
    changeCurrentDate(date) {
      this.currentDate = date;
    },
    selectDate(day) {
      this.internalSelectedDate = new Date(this.year, this.month, day);
      setTimeout(()=>{
        this.$emit('change-date', this.internalSelectedDate);
        this.$emit('update:modelValue', false);
      },150);
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Matches/DatePicker/date-picker-popup.scss';

</style>