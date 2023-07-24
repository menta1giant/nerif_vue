<template>
  <div class="v-input" :class="{ 'v-input--has-icon': inputTypeIcon, 'v-input--error': hasError, 'fluid': fluid }">
    <div v-if="inputTypeIcon" class="v-input__icon"><v-icon :name="inputTypeIcon" /></div>
    <input 
      v-model="initialValue"
      :id="id" 
      :name="name" 
      :type="inputType" 
      :inputmode="inputMode" 
      :placeholder="placeholder" 
      :autocomplete="autocompleteStatus"

      :disabled="disabled"
    />
  </div>
 
</template>

<script>
import controlMixin from '@/components/mixins/controlMixin.js';
import errorMixin from '@/components/mixins/errorMixin.js';
import formFieldMixin from '@/components/mixins/formFieldMixin.js';
import { TYPES_MAP } from './const';

export default {
  name: 'Input',
  mixins: [
    controlMixin,
    errorMixin,
    formFieldMixin,
  ],
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    inputmode: {
      type: String,
      default: 'text',
    },
    id: {
      type: String,
      default: 'input',
    },
    value: [String, Number],
  },
  data() {
    return {
      initialValue: null,
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (this.initialValue !== null || val === undefined || val === null) return;

        this.initialValue = val;
      }
    }
  },
  computed: {
    inputTypeIcon() {
      return TYPES_MAP[this.type] && TYPES_MAP[this.type].icon;
    },
    inputType() {
      return TYPES_MAP[this.type] && TYPES_MAP[this.type].type || this.type;
    },
    inputMode() {
      return TYPES_MAP[this.type] && TYPES_MAP[this.type].inputmode || this.inputmode;
    },
    autocompleteStatus() {
      return TYPES_MAP[this.type] && TYPES_MAP[this.type].autocomplete ? 'on' : 'off';
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Base/input.scss';
</style>