<template>
  <v-popup>
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
              <th v-for="day in weekDays" :key="day">{{ day }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(week, index) in weeks" :key="index">
              <td
                v-for="date in week"
                :key="date.day"
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
  </v-popup>
</template>

<script>
import DatePickerMixin from './DatePickerMixin.js';
import { weekDays, monthNames } from './const';

export default {
  name: 'DatePickerPopup',
  mixins: [
    DatePickerMixin,
  ],
  data() {
    return {
      showCalendar: false,
      monthNames: monthNames,
      weekDays: weekDays,
      currentDate: new Date(),
      selectedDate: new Date(),
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
      return (this.month === this.selectedDate.getMonth()) && (this.year === this.selectedDate.getFullYear());
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
          selected: this.isCurrentMonthSelectedMonth && i === this.selectedDate.getDate(),
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
      return this.selectedDate
        ? this.selectedDate.toLocaleDateString()
        : "";
    }
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
    selectDate(day) {
      this.selectedDate = new Date(this.year, this.month, day);
      setTimeout(()=>{
        this.$emit('change-date', this.selectedDate);
        this.$emit('update:modelValue', false);
      },150);
    }
  },
}
</script>

<style lang="scss" scoped>
.date-picker-popup {
  height: auto;
  gap: .5rem;
  display: flex;
  flex-direction: column;

  >div {
    background: $primary-ds-50;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .5rem 1rem;
    font-size: $fs-medium;
    line-height: $lh-medium;
  }

  &__change-month {
    cursor: pointer;
    height: 2rem;
    aspect-ratio: 1;

    color: $primary-s-600;

    display: flex;
    justify-content: center;
    align-items: center;

    &--disabled {
      cursor: default;
      color: $primary-ds-100;
    }
  }

  &__days {

    font-size: $fs-medium;
    line-height: $lh-small;
    border-spacing: 30px;

    th {
      height: 2rem;
      text-align: center;
      vertical-align: middle;
      color: $primary-ds-600;
      font-size: .85em;
    }
    td {
      height: 2rem;
      margin: 0 .5rem;
      text-align: center;
      vertical-align: middle;
      cursor: pointer;

      .date-picker-popup__day {
        height: 2rem;
        aspect-ratio: 1 / 1;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        text-align: center;
        margin: 0 .25rem;

        &--other-month {
          color: $primary-s-200;
        }

        &--selected {
          background: $primary-s-400;
          color: $black-10;
        }

        &--today {
          border: 2px solid $accent-300;
        }

        &--disabled {
          color: $primary-ds-100;
          cursor: default;
        }
      }
    }
  }
}
</style>