<template>
  <div class="positioner">
    <div class="positioner__body" ref="body" @click="handleClick">
      <slot name="body"></slot>
    </div>
    <div class="positioner__dropdown" v-show="internalVisible" :class="{ 'positioner__dropdown--invisible': !areValuesCalculated }" ref="dropdown" :style="dropdownStyles">
      <slot name="dropdown"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Positioner',
  props: {
    modelValue: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  mounted() {
    window.addEventListener('click',this.handleOutsideClick);
    this.$refs.dropdown.addEventListener('click',this.stopClickPropagation);

    this.setDropdownStyles();
  },
  data() {
    return {
      dropdownStyles: {
        top: '0px',
        left: '0px',
      },
      internalVisible: true,
      areValuesCalculated: false,
    };
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(val) {
        console.log(this.modelValue);
        
        this.setDropdownStyles();
        if (this.areValuesCalculated) {
          this.internalVisible = val;
        } 
      },
    },
  },
  methods: {
    stopClickPropagation(event) {
      event.stopPropagation();
    },
    changeDropdownVisibilty(newValue) {
      this.$emit('update:modelValue', newValue);
    },
    hasRefs() {
      console.log(this.$refs);
      return ('body' in this.$refs) && ('dropdown' in this.$refs);
    },
    canDropdownFitBelow() {
      const bodyCoordinates = this.$refs.body.getBoundingClientRect();
      console.log(this.$refs.dropdown.scrollHeight);
      console.log(bodyCoordinates);
      const spaceBelowBody = (window.innerHeight || document.documentElement.clientHeight) - bodyCoordinates.bottom;
      console.log(spaceBelowBody);
      console.log((spaceBelowBody - 8) >= this.$refs.dropdown.scrollHeight);
      return (spaceBelowBody - 8) >= this.$refs.dropdown.scrollHeight;
    },
    getDropdownStyles() {
      const isDisplayedBelow = this.canDropdownFitBelow();
      const dropdownHeight = 'dropdown' in this.$refs ? this.$refs.dropdown.scrollHeight : 0;
      if (isDisplayedBelow) {
        const top = 'body' in this.$refs ? this.$refs.body.scrollHeight : 0;

        return {
          top: `${top + 8}px`,
          left: '0px',
        };
      }

      return {
        top: `-${dropdownHeight + 8}px`,
        left: '0px',
      };
    },
    setDropdownStyles() {
      if (!this.hasRefs()) {
        return;
      }

      const dropdownStyles = this.getDropdownStyles();
      this.dropdownStyles = dropdownStyles;
      this.internalVisible = this.internalVisible && this.areValuesCalculated;
      this.areValuesCalculated = true;
    },
    handleClick(event) {
      this.changeDropdownVisibilty(!this.modelValue);
      this.stopClickPropagation(event);

      console.log(this.$refs.dropdown);
    },
    handleOutsideClick() {
      this.changeDropdownVisibilty(false);
    }
  }
}
</script>

<style lang="scss" scoped>
.positioner {
  position: relative;
  min-width: fit-content;
  height: fit-content;

  &__body {
    min-width: fit-content;
  }

  &__dropdown {
    position: absolute;
    z-index: 9999;
    min-width: 100%;
    box-shadow: 0 4px 8px 0 rgba($primary-ds-900, .15);

    &--invisible {
      visibility: hidden;
    }
  }
}
</style>