<template>
  <div class="v-multiselect">
    <v-positioner v-model="isDropdownVisible" triggers-on-click>
      <template v-slot:body>
        <select-body v-model:is-dropdown-visible="isDropdownVisible" :has-error="hasError">
          <div class="v-multiselect__selected-options">
            <template v-if="selectedOptions.length">
              <select-option v-for="(option, idx) in selectedOptions" :key="idx" selected @click="(event) => handleToggleOption(option, event)">{{ option.label }}<v-icon name="xmark" /></select-option>
            </template>
            <template v-else>
              <span class="v-multiselect__placeholder text-bleak">{{ placeholder }}</span>
            </template>
          </div>
        </select-body>
      </template>
      <template v-slot:dropdown>
        <select-dropdown>
          <select-option v-for="(option, idx) in options" :key="`option_${ idx }`" :selected="selectedOptions.includes(option)" @select="handleToggleOption(option)">{{ option.label }}</select-option>
        </select-dropdown>
      </template>
    </v-positioner>
  </div>
</template>

<script>
import SelectBody from './SelectBody';
import SelectOption from './SelectOption';
import SelectDropdown from './SelectDropdown';
import errorMixin from '@/components/errorMixin';
import debounce from '@/lib/debounce';

export default {
  name: 'Multiselect',
  components: {
    SelectBody,
    SelectOption,
    SelectDropdown,
  },
  mixins: [errorMixin],
  props: {
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    placeholder: {
      type: String,
      default: 'Select options',
    },
    value: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isDropdownVisible: false,
      hasValueChanged: false,
      selectedOptions: [],
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(options) {
        this.selectedOptions = this.options.filter(option => options.includes(option.id));
      }
    },
    isDropdownVisible: {
      handler(val) {
        if (!val && this.hasValueChanged) {
          this.handleChange();
        }
      }
    }
  },
  methods: {
    handleChange: debounce(function(){
      this.$emit('change', this.selectedOptions.map(option => option.id));
      this.hasValueChanged = false;
    }, 500),
    handleToggleOption(option, event) {
      const currentOptionIdx = this.selectedOptions.indexOf(option);

      if (~currentOptionIdx) {
        this.selectedOptions.splice(currentOptionIdx, 1);
      } else {
        this.selectedOptions.push(option);
      }

      this.hasValueChanged = true;

      if (event) {
        this.handleChange();
        event.stopPropagation();
      }
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

    .v-icon {
      color: $primary-ds-300;
    }
  }

  &__placeholder {
    padding: 0.5rem;
    line-height: $lh-medium;
  }
}
</style>