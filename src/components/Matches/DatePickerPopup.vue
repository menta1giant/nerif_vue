<template>
  <nrf-popup>
    <div class="date-picker-popup">
      <div class="date-picker-popup__header">
        <div class="date-picker-popup__change-month" @click="previousMonth">
          <nrf-icon type="solid" name="arrow-left"/>
        </div>
        <span>{{ `${ monthName } ${ year }` }}</span>
        <div class="date-picker-popup__change-month" @click="nextMonth">
          <nrf-icon type="solid" name="arrow-right"/>
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
                :class="{
                  'date-picker-popup__day--other-month': !date.inMonth,
                  'date-picker-popup__day--selected': date.selected,
                  'date-picker-popup__day--today': date.today
                }"
                @click="selectDate(date.day)"
              >
                {{ date.day }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </nrf-popup>
</template>

<script>
export default {
  name: 'DatePickerPopup',
  props: {
    msg: String,
  },
  data() {
    return {
      showCalendar: false,
      monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      currentDate: new Date()
    };
  },
  computed: {
    month() {
      return this.currentDate.getMonth();
    },
    year() {
      return this.currentDate.getFullYear();
    },
    monthName() {
      return this.monthNames[this.month];
    },
    daysInMonth() {
      return new Date(this.year, this.month + 1, 0).getDate();
    },
    firstDayOfMonth() {
      return new Date(this.year, this.month, 1).getDay();
    },
    days() {
      const days = [];
      for (let i = 1; i <= this.daysInMonth; i++) {
        days.push({
          day: i,
          inMonth: true
        });
      }
      for (let i = 0; i < this.firstDayOfMonth; i++) {
        days.unshift({
          day: "",
          inMonth: false
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
      this.formattedDate = this.selectedDate.toLocaleDateString();
      this.showCalendar = false;
    }
  },
  watch: {
    currentDate() {
      this.selectedDate = null;
      this.formattedDate = "";
    }
  }
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
    padding: .75rem 1rem;
    font-size: $fs-medium;
    line-height: $lh-medium;
  }

  &__change-month {
    cursor: pointer;
  }

  &__days {

    table-layout: fixed;
    font-size: $fs-xs;
    line-height: $lh-small;

    th {
      height: 1.75rem;
      text-align: center;
      vertical-align: middle;
      color: $primary-ds-600;
    }
    td {
      height: 1.75rem;
      padding: 0 .5rem;
      text-align: center;
      vertical-align: middle;
      cursor: pointer;

      &.date-picker__day--other-month {
        color: #ddd;
      }
      &.date-picker__day--selected {
        background: #00bcd4;
        color: #fff;
      }
      &.date-picker__day--today {
        color: #f00;
      }
    }
  }
}
</style>