<template>
  <div class="date-picker__item" :class="{ active: day==5 }">
    <span class="date-picker__item__day">{{ day }}</span>
    <span class="date-picker__item__weekday">{{ displayedWeekday }}</span>
  </div>
</template>
  
<script>
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

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
        return WEEKDAYS[this.weekday];
    }
  }
}
</script>

<style lang="scss" scoped>
  .date-picker__item {
    width: 3em;
    font-size: $font-size-medium;
    background: $black-10;
    font-weight: 400;
    border: 1px solid $primary-ds-100;
    border-radius: $border-radius-small;
    
    display: flex;
    flex-direction: column;
    align-items: center;

    &__day {
        line-height: $lh-medium; 
        color: $primary-ds-900;
    }

    &__weekday {
        margin-top: -4px;
        font-size: $font-size-xxxs;
        line-height: $lh-small; 
        color: $black-500;
    }

    @media screen and (max-width: $mobile-breakpoint) {
      &:not(.active) {
        display: none;
      }
    }
  }

</style>