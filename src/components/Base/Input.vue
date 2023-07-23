<template>
  <div class="v-input" :class="{ 'v-input--has-icon': inputTypeIcon, 'v-input--error': hasError, 'fluid': fluid }">
    <div v-if="inputTypeIcon" class="v-input__icon"><v-icon :name="inputTypeIcon" /></div>
    <input 
      v-model="initialValue"
      :id="id" 
      :name="name" 
      :type="inputType" 
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

const typesMap = {
  password: {
    type: 'password',
    icon: 'key',
  },
  date: {
    type: 'text',
    icon: 'password',
  },
  search: {
    type: 'text',
    icon: 'search',
  },
  payment: {
    type: 'text',
    icon: 'credit-card',
  },
}

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
      return typesMap[this.type] && typesMap[this.type].icon;
    },
    inputType() {
      return typesMap[this.type] && typesMap[this.type].type || this.type;
    },
    autocompleteStatus() {
      return this.inputType === 'email';
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Base/input.scss';
</style>