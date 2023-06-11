<template>
  <nrf-popup>
    <div class="date-picker-popup">
      <div class="date-picker-popup__header">
        <nrf-icon type="solid" name="arrow-left"/>
        <span>January 2023</span>
        <nrf-icon type="solid" name="arrow-right"/>
      </div>
      <div class="date-picker-popup__body">

      </div>
    </div>
  </nrf-popup>
</template>

<script>
export default {
  name: 'DatePickerPopup',
  props: {
    msg: String,
  }
}
</script>

<style lang="scss" scoped>
.date-picker-popup {
  height: 500px;
  width: 1000px;
}
</style>