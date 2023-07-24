<template>
  <div class="v-select">
    <v-positioner v-model="isDropdownVisible" triggers-on-click>
      <template v-slot:body>
        <select-body ref="body" :id="id" v-model:is-dropdown-visible="isDropdownVisible" :has-error="hasError" :is-loading="isLoading" @keyup.down="handleOptionsGainFocus">
          <div class="v-select__body__value">
            <template v-if="isLoading">
              <v-loader/>&nbsp;
            </template>
            <template v-else> 
              <template v-if="options[selectedOption]">
                {{ options[selectedOption].label }}
              </template>
              <template v-else>
                <span class="text-ds-400">Select an option</span>
              </template>
            </template>
          </div>
        </select-body>
      </template>
      <template v-slot:dropdown>
        <select-dropdown ref="dropdown" @keyup.up="handleOptionsLoseFocus">
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
import errorMixin from '@/components/mixins/errorMixin.js';
import formFieldMixin from '@/components/mixins/formFieldMixin.js';
import selectMixin from './selectMixin';

export default {
  name: 'Select',
  components: {
    SelectBody,
    SelectDropdown,
    SelectOption,
  },
  mixins: [
    errorMixin,
    formFieldMixin,
    selectMixin,
  ],
  props: {
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    value: [Number, String],
    isLoadingResource: Boolean,
  },
  data() {
    return {
      isLoadingOptions: true,
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
      handler(options) {
        this.updateSelectedOption();
        if (options.length) this.isLoadingOptions = false;
      },
    },
  },
  computed: {
    isLoading() {
      return this.isLoadingOptions || this.isLoadingResource;
    },
  },
  methods: {
    updateSelectedOption() {
      if (this.selectedOption !== null) return;

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
@import '@/assets/styles/Base/Select/select.scss';
</style>