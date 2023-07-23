<template>
  <div class="v-switcher" :class="{ checked: internalValue }" @click="toggleSwitcher">
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
import formFieldMixin from '@/components/mixins/formFieldMixin.js';

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
@import '@/assets/styles/Base/switcher.scss';
</style>