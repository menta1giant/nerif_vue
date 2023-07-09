<template>
  <div class="v-select">
    <v-positioner v-model="isDropdownVisible" triggers-on-click>
      <template v-slot:body>
        <select-body :is-dropdown-visible="isDropdownVisible" :has-error="hasError">
          <span class="v-select__body__value">{{ options[selectedOption].value }}</span>
        </select-body>
      </template>
      <template v-slot:dropdown>
        <select-dropdown :options="options" @select="handleSelectOption" />
      </template>
    </v-positioner>
  </div>
</template>

<script>
import SelectBody from './SelectBody';
import SelectDropdown from './SelectDropdown';
import ErrorMixin from '@/components/ErrorMixin';

export default {
  name: 'Select',
  components: {
    SelectBody,
    SelectDropdown,
  },
  mixins: [ErrorMixin],
  data() {
    return {
      isDropdownVisible: false,
      options: [
        {
          selected: true, value: 'Гагарин'
        },
        {
          selected: false, value: 'STORY'
        },
        {
          selected: false, value: 'Рыжик'
        },
        {
          selected: false, value: 'Малыш'
        },
      ],
      selectedOption: 0,
    };
  },
  methods: {
    handleSelectOption(id) {
      this.options[this.selectedOption].selected = false;
      this.options[id].selected = !this.options[id].selected;
      this.selectedOption = id;
      this.isDropdownVisible = false;
    },
  },
}
</script>

<style lang="scss" scoped>
.v-select {
  width: 100%;

  &__body {
    &__value {
      padding: .25rem;
    }
  }
}
</style>