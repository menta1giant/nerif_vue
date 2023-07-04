<template>
  <div class="v-input" :class="{ 'v-input--has-icon': inputTypeIcon }">
    <div v-if="inputTypeIcon" class="v-input__icon"><v-icon :name="inputTypeIcon" /></div>
    <input :type="inputType" :placeholder="placeholder" :class="{ 'fluid': fluid }" />
  </div>
 
</template>

<script>
import ControlMixin from '@/components/ControlMixin';

const typesMap = {
  password: {
    type: 'password',
    icon: 'key',
  },
  date: {
    type: 'text',
    icon: 'password',
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
  },
  computed: {
    inputTypeIcon() {
      return typesMap[this.type] && typesMap[this.type].icon;
    },
    inputType() {
      return typesMap[this.type] && typesMap[this.type].type || this.type;
    },
  }
}
</script>

<style lang="scss" scoped>
.v-input {
  display: flex;
  position: relative;
  flex: 1;

  &__icon {
    position: absolute;
    left: 0;

    height: 100%;
    padding: 0 .5rem;

    display: flex;
    align-items: center;

    &:deep(i) {
      color: $primary-s-200;
    }
  }

  &--has-icon {
    input {
      padding-left: 2em;
    }
  }
}

input {
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