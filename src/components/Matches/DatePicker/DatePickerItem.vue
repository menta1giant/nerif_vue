<template>
  <div class="date-picker-item" :class="{ 'date-picker-item--active': isActive }">
    <span class="date-picker-item__day">{{ day }}</span>
    <span class="date-picker-item__weekday">{{ displayedWeekday }}</span>
  </div>
</template>
  
<script>
import { weekDays } from './const';

export default {
  name: 'DatePickerItem',
  props: {
    day: Number,
    weekday: Number,
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    displayedWeekday() {
        return weekDays[this.weekday];
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Matches/DatePicker/date-picker-item.scss';

</style>