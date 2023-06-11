<template>
  <div class="multiselect">
    <nrf-positioner v-model="isDropdownVisible">
      <template v-slot:body>
        <div class="multiselect__body">
          <slot></slot>
        </div>
      </template>
      <template v-slot:dropdown>
        <div class="multiselect__dropdown">
          <ul>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
          </ul>
        </div>
      </template>
    </nrf-positioner>
  </div>
</template>

<script>
export default {
  name: 'Multiselect',
  data() {
    return {
      isDropdownVisible: false,
    };
  },
  watch: {
    isDropdownVisible(val) {
      console.log(val);
    },
  },
}
</script>

<style lang="scss" scoped>
.multiselect {
  width: 100%;

  &__body {
    border: 1px solid $black-100;
    border-radius: $border-radius-small;
    background: $black-10;
    height: 2.5rem;
    width: 100%;
    padding: .25rem;

    font-size: $fs-xs;

    display: flex;
    align-items: center;
  }

  &__dropdown {
    border: 1px solid $primary-ds-100;
    border-radius: $border-radius-small;
    background: $black-10;
    padding: .5rem;
  }
}
</style>