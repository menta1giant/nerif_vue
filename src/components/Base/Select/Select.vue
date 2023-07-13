<template>
  <div class="v-select">
    <v-positioner v-model="isDropdownVisible" triggers-on-click>
      <template v-slot:body>
        <select-body :id="id" v-model:is-dropdown-visible="isDropdownVisible" :has-error="hasError">
          <span class="v-select__body__value">{{ options[selectedOption] && options[selectedOption].label || '&nbsp;' }}</span>
        </select-body>
      </template>
      <template v-slot:dropdown>
        <select-dropdown>
          <select-option v-for="(option, idx) in options" :key="`option_${ idx }`" :selected="selectedOption === idx" @select="handleSelectOption(idx)">{{ option.label }}</select-option>
        </select-dropdown>
      </template>
    </v-positioner>
    <input ref="ghost-input" class="ghost-input" type="text" :name="name" :value="options[selectedOption] && options[selectedOption].value"/>
  </div>
</template>

<script>
import SelectBody from './SelectBody';
import SelectDropdown from './SelectDropdown';
import SelectOption from './SelectOption';
import ErrorMixin from '@/components/ErrorMixin';
import formFieldMixin from '../formFieldMixin';

export default {
  name: 'Select',
  components: {
    SelectBody,
    SelectDropdown,
    SelectOption,
  },
  mixins: [
    ErrorMixin,
    formFieldMixin,
  ],
  props: {
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    value: [Number, String]
  },
  data() {
    return {
      isDropdownVisible: false,
      selectedOption: null,
    };
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        this.updateSelectedOption();
      },
    },
    options: {
      immediate: true,
      handler() {
        this.updateSelectedOption();
      },
    },
  },
  methods: {
    updateSelectedOption() {
      if (this.selectedOption) return;

      const selectedOption = this.options.findIndex(option => option.value === this.value);

      if (~selectedOption) this.selectedOption = selectedOption;
    },
    handleSelectOption(id) {
      this.selectedOption = id;
      this.isDropdownVisible = false;

      const event = new Event('input', {
        bubbles: true,
        cancelable: true,
      });

      this.$refs['ghost-input'].dispatchEvent(event, id);
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