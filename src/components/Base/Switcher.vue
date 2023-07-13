<template>
  <div class="v-switcher" :class="{ checked: internalValue }" @click="toggleSwitcher" @input="toggleSwitcher">
    <input
      class="v-switcher__input"
      type="checkbox"
      ref="checkbox"
      :id="id"
      :name="name"
      :value="internalValue"
      :checked="internalValue"
    />
    <div class="v-switcher__track"></div>
    <div class="v-switcher__thumb"></div>
  </div>
</template>

<script>
import formFieldMixin from './formFieldMixin';

export default {
  name: 'Switcher',
  mixins: [formFieldMixin],
  emits: ['toggle'],
  props: {
    value: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      internalValue: this.value,
    };
  },
  watch: {
    value(val) {
      this.internalValue = val;
    },
  },
  methods: {
    toggleSwitcher() {
      this.internalValue = !this.internalValue;

      const event = new CustomEvent('toggle', {
        bubbles: true,
        cancelable: true,
      });

      this.$refs['checkbox'].dispatchEvent(event, this.internalValue);
    }
  }
}
</script>

<style lang="scss" scoped>
.v-switcher {
  position: relative;
  width: 40px;
  max-width: 40px;
  min-width: 40px;
  height: 20px;
  border-radius: 10px;
  background-color: $primary-ds-200;
  cursor: pointer;

  display: flex;

  &:before {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    border-radius: 8px;
    background-color: $black-10;
    box-shadow: 0 0 4px 4px rgba($primary-ds-800, .25);
    transition: all 0.2s ease;
  }

  &.checked {
    background-color: $primary-s-500;

    &:before {
      left: 22px;
    }
  }

  &__input {
    width: 0;
    height: 0;
    opacity: 0;
  }
}
</style>