<template>
  <div class="multiselect">
    <nrf-positioner v-model="isDropdownVisible">
      <template v-slot:body>
        <div class="multiselect__body">
          <div class="multiselect__option multiselect__option--selected">Гагарин</div><div class="multiselect__option multiselect__option--selected">STORY</div>
        </div>
      </template>
      <template v-slot:dropdown>
        <div class="multiselect__dropdown">
          <div class="multiselect__option multiselect__option--selected">Гагарин</div>
          <div class="multiselect__option multiselect__option--selected">STORY</div>
          <div class="multiselect__option">Рыжик</div>
          <div class="multiselect__option">Малыш</div>
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
    gap: .25rem;

    cursor: pointer;
  }

  &__dropdown {
    border: 1px solid $primary-ds-100;
    border-radius: $border-radius-small;
    background: $black-10;
    padding: .5rem;

    display: flex;
    flex-direction: column;
    gap: .25rem;
  }

  &__option {
    font-weight: $fw-medium;

    padding: .5rem;
    cursor: pointer;

    &:hover {
      background: $primary-ds-50;
    }

    &--selected {
      background: $primary-ds-100 !important;
    }
  }
}
</style>