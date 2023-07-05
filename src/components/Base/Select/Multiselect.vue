<template>
  <div class="v-multiselect">
    <v-positioner v-model="isDropdownVisible">
      <template v-slot:body>
        <select-body :is-dropdown-visible="isDropdownVisible" :has-error="hasError">
          <div class="v-multiselect__selected-options">
            <select-option v-for="(option, idx) in selectedOptions" v-bind:key="idx" :option="option">{{ option.value }}</select-option>
          </div>
        </select-body>
      </template>
      <template v-slot:dropdown>
        <select-dropdown :options="options" @select="toggleOption" />
      </template>
    </v-positioner>
  </div>
</template>

<script>
import SelectBody from './SelectBody';
import SelectOption from './SelectOption';
import SelectDropdown from './SelectDropdown';
import ErrorMixin from '@/components/ErrorMixin';

export default {
  name: 'Multiselect',
  components: {
    SelectBody,
    SelectOption,
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
.v-multiselect {
  width: 100%;

  &__selected-options {
    display: flex;
    gap: .25rem;
  }
}
</style>