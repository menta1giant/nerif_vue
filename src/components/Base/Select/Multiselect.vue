<template>
  <div class="v-multiselect">
    <v-positioner v-model="isDropdownVisible" triggers-on-click>
      <template v-slot:body>
        <select-body v-model:is-dropdown-visible="isDropdownVisible" :has-error="hasError">
          <div class="v-multiselect__selected-options">
            <select-option v-for="(option, idx) in selectedOptions" :key="idx" selected>{{ option.label }}</select-option>
          </div>
        </select-body>
      </template>
      <template v-slot:dropdown>
        <select-dropdown>
          <select-option v-for="(option, idx) in options" :key="`option_${ idx }`" :selected="optionsStatuses[idx]" @select="handleToggleOption(idx)">{{ option.label }}</select-option>
        </select-dropdown>
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
  props: {
    options: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isDropdownVisible: false,
      optionsStatuses: new Array(this.options.length).fill(false),
    };
  },
  computed: {
    selectedOptions() {
      return this.options.filter((option, idx) => this.optionsStatuses[idx]);
    },
  },
  methods: {
    handleToggleOption(idx) {
      this.optionsStatuses[idx] = !this.optionsStatuses[idx];
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

    min-height: 2.5rem;
  }
}
</style>