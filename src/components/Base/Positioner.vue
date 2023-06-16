<template>
  <div class="positioner">
    <div class="positioner__body" ref="body" @click="handleClick">
      <slot name="body"></slot>
    </div>
    <div class="positioner__dropdown" :class="{ 'positioner__dropdown--visible': modelValue, 'positioner__dropdown--fadeable': hasDropdownBeenVisibleAtLeastOnce }" ref="dropdown" :style="dropdownStyles">
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
    position: {
      type: String,
      validator(value) {
        return ['left', 'right', 'center'].includes(value);
      },
      default() {
        return 'left';
      },
    },
    forceTop: {
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
        top: '-9999px',
        left: '-9999px',
      },
      hasDropdownBeenVisibleAtLeastOnce: false,
    };
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(val) {
        this.setDropdownStyles();
        this.hasDropdownBeenVisibleAtLeastOnce = this.hasDropdownBeenVisibleAtLeastOnce || val;
      },
    },
  },
  computed: {
    isPositionCenter() {
      return this.position === 'center';
    },
    dropdownXProperty() {
      return this.isPositionCenter ? 'left' : this.position;
    },
    offsetX() {
      return this.isPositionCenter && this.hasRefs() ? this.$refs.dropdown.scrollWidth / -2 + this.$refs.body.scrollWidth / 2 : 0;
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
      return ('body' in this.$refs) && ('dropdown' in this.$refs);
    },
    canDropdownFitBelow() {
      const bodyCoordinates = this.$refs.body.getBoundingClientRect();
      const spaceBelowBody = document.documentElement.clientHeight - bodyCoordinates.bottom;

      return (spaceBelowBody - 8) >= this.$refs.dropdown.scrollHeight;
    },
    calculateSideCoordinate() {
      const bodyCoordinates = this.$refs.body.getBoundingClientRect();
      const spaceBesideBody = this.dropdownXProperty === 'left' ? document.documentElement.clientWidth - bodyCoordinates[this.dropdownXProperty] : bodyCoordinates[this.dropdownXProperty];
      const sideCoordinate = Math.min((spaceBesideBody - 8) - this.$refs.dropdown.scrollWidth, this.offsetX);

      return sideCoordinate;
    },
    getDropdownStyles() {
      const isDisplayedBelow = !this.forceTop && this.canDropdownFitBelow();
      const sideCoordinate = this.calculateSideCoordinate();
  
      const dropdownHeight = 'dropdown' in this.$refs ? this.$refs.dropdown.scrollHeight : 0;
      if (isDisplayedBelow) {
        const top = 'body' in this.$refs ? this.$refs.body.scrollHeight : 0;

        return {
          top: `${top + 8}px`,
          [this.dropdownXProperty]: `${sideCoordinate}px`,
        };
      }

      return {
        top: `-${dropdownHeight + 8}px`,
        [this.dropdownXProperty]: `${sideCoordinate}px`,
      };
    },
    setDropdownStyles() {
      if (!this.hasRefs()) {
        return;
      }

      const dropdownStyles = this.getDropdownStyles();
      this.dropdownStyles = dropdownStyles;
    },
    handleClick(event) {
      this.changeDropdownVisibilty(!this.modelValue);
      this.stopClickPropagation(event);
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
    visibility: hidden;

    &--visible {
      animation: .2s fadeIn;
      animation-fill-mode: forwards;
    }

    &--fadeable:not(.positioner__dropdown--visible) {
      animation: .2s fadeOut;
      animation-fill-mode: forwards;
    }
  }
}

@keyframes fadeOut {
  0% {
    visibility: visible;
  }
  100% {
    opacity: 0;
    visibility: hidden;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    visibility: visible;
  }
}
</style>