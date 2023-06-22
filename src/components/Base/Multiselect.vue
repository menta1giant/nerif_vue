<template>
  <div class="multiselect">
    <v-positioner v-model="isDropdownVisible">
      <template v-slot:body>
        <div class="multiselect__body">
          <div v-for="(option, idx) in selectedOptions" v-bind:key="idx" class="multiselect__option multiselect__option--selected">{{ option.value }}</div>
        </div>
      </template>
      <template v-slot:dropdown>
        <div class="multiselect__dropdown">
          <div v-for="(option, idx) in options" v-bind:key="idx" class="multiselect__option" :class="{ 'multiselect__option--selected': option.selected }" @click="toggleOption(idx)">{{ option.value }}</div>
        </div>
      </template>
    </v-positioner>
  </div>
</template>

<script>
export default {
  name: 'Multiselect',
  data() {
    return {
      isDropdownVisible: false,
      options: [
        {
          selected: true, value: 'Гагарин'
        },
        {
          selected: true, value: 'STORY'
        },
        {
          selected: false, value: 'Рыжик'
        },
        {
          selected: false, value: 'Малыш'
        },
      ],
      selectedOptionsIds: [1,2],
    };
  },
  computed: {
    selectedOptions() {
      return this.options.filter(option => option.selected);
    },
  },
  methods: {
    toggleOption(id) {
      this.options[id].selected = !this.options[id].selected;
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