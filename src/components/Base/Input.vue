<template>
  <div class="v-input" :class="{ 'v-input--has-icon': inputTypeIcon, 'v-input--error': hasError, 'fluid': fluid }">
    <div v-if="inputTypeIcon" class="v-input__icon"><v-icon :name="inputTypeIcon" /></div>
    <input :id="id" :name="name" :type="inputType" :placeholder="placeholder" :autocomplete="autocompleteStatus"/>
  </div>
 
</template>

<script>
import ControlMixin from '@/components/ControlMixin';
import ErrorMixin from '@/components/ErrorMixin';
import formFieldMixin from './formFieldMixin';

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
    ControlMixin,
    ErrorMixin,
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
    autocomplete: Boolean
  },
  computed: {
    inputTypeIcon() {
      return typesMap[this.type] && typesMap[this.type].icon;
    },
    inputType() {
      return typesMap[this.type] && typesMap[this.type].type || this.type;
    },
    autocompleteStatus() {
      return this.autocomplete ? 'on' : 'off';
    },
  },
}
</script>

<style lang="scss" scoped>
.v-input {
  display: flex;
  position: relative;

  &__icon {
    position: absolute;
    left: 0;

    height: 100%;
    padding: 0 .5rem;

    display: flex;
    align-items: center;

    color: $primary-s-200;
  }
  
  &.fluid {
    flex: 1;
  }

  &--has-icon {
    input {
      padding-left: 2em;
    }
  }

  &--error {
    input {
      border-color: $red-600;
    }
  }
}

input {
  width: 100%;

  padding: .5rem;
  color: $primary-ds-800;

  background: $black-10;
  border: 1px solid $primary-ds-100;
  border-radius: $border-radius-small;

  &:focus {
    box-shadow: 0 0 0 1px $primary-s-100;
  }

  &::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: $primary-s-100;
    opacity: 1; /* Firefox */
  }

  &:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: $primary-s-100;
  }

  &::-ms-input-placeholder { /* Microsoft Edge */
    color: $primary-s-100;
  }
}
</style>