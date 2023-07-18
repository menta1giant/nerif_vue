<template>
  <v-modal v-model="isShown" type="warn" :header="header"> 
    <template #default>
      <slot></slot>
    </template>
    <template #cta>
      <v-button type="primary" size="medium" @click="primaryButtonClickHandler">{{ primaryButtonText }}</v-button>
      <v-button v-if="secondaryButtonText" type="secondary" size="medium" @click="secondaryButtonClickHandler">{{ secondaryButtonText }}</v-button>
    </template>
  </v-modal>
</template>

<script>

export default {
  name: 'WarnModal',
  props: {
    header: String,
    
    primaryButtonText: String,
    secondaryButtonText: String,

    primaryButtonClickHandler: Function,
    secondaryButtonClickHandler: Function,
  },
  data() {
    return {
      isShown: false,
    };
  },
  watch: {
    modelValue(val) {
      this.isShown = val;
    },
    isShown(val) {
      this.$emit('update:modelValue', val);
    }
  }
}
</script>