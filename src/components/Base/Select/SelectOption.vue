<template>
  <button ref="option" class="v-select__option" :class="{ 'v-select__option--selected': selected }" type="button" @click="toggleOption()"><slot></slot></button>
</template>

<script>
export default {
  name: 'SelectOption',
  props: {
    selected: Boolean,
  },
  methods: {
    toggleOption() {
      this.$emit('select');
    }
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/Base/Select/select-option.scss';
</style>