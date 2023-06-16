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
import { isElementInViewport } from '@/lib/DOM';

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
    horizontalMargin: {
      type: Number,
      default() {
        return 8;
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
    this.bindScrollEvent();
    document.querySelector('body').appendChild(this.$refs.dropdown);
    this.setDropdownCoordinates();
  },
  beforeUnmount() {
    this.$refs.dropdown.remove();
  },
  data() {
    return {
      bodyCoordinates: {},
      dropdownCoordinates: {
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
        this.setDropdownCoordinates();
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
      return this.isPositionCenter && this.hasRefs() ? this.$refs.dropdown.scrollWidth / 2 - this.$refs.body.scrollWidth / 2 : 0;
    },
    dropdownStyles() {
      return Object.assign({}, this.dropdownCoordinates, {
        minWidth: this.hasRefs() ? `${ this.$refs.body.clientWidth }px` : 0,
      });
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
      return (this.$refs.body) && (this.$refs.dropdown);
    },
    updateBodyCoordinates() {
      if (!this.hasRefs()) return;
      this.bodyCoordinates = this.$refs.body.getBoundingClientRect();
    },
    canDropdownFitBelow() {
      const spaceBelowBody = document.documentElement.clientHeight - this.bodyCoordinates.bottom;

      return (spaceBelowBody - 8) >= this.$refs.dropdown.scrollHeight;
    },
    calculateSideCoordinate() {
      const dropdownWidth = Math.max(this.$refs.body.clientWidth, this.$refs.dropdown.scrollWidth);
      const spaceBesideBody = this.position !== 'right' ? this.bodyCoordinates.left : document.documentElement.clientWidth - this.bodyCoordinates.right;
      let sideCoordinate = Math.max(16, spaceBesideBody - dropdownWidth + this.$refs.body.scrollWidth + this.offsetX);
      if (this.isPositionCenter) {
        sideCoordinate = Math.min(sideCoordinate, document.documentElement.clientWidth - dropdownWidth - 16);
      }

      return sideCoordinate;
    },
    getDropdownCoordinates() {
      this.updateBodyCoordinates();
      if (!isElementInViewport(this.$refs.body)) {
        return;
      }
      const isDisplayedBelow = !this.forceTop && this.canDropdownFitBelow();
      const sideCoordinate = this.calculateSideCoordinate();
  
      const dropdownHeight = 'dropdown' in this.$refs ? this.$refs.dropdown.scrollHeight : 0;
      if (isDisplayedBelow) {
        const top = this.hasRefs() ? this.$refs.body.scrollHeight : 0;

        return {
          top: `${top + this.horizontalMargin + this.bodyCoordinates.top}px`,
          [this.dropdownXProperty]: `${sideCoordinate}px`,
        };
      }

      return {
        top: `${-dropdownHeight - this.horizontalMargin + this.bodyCoordinates.top}px`,
        [this.dropdownXProperty]: `${sideCoordinate}px`,
      };
    },
    setDropdownCoordinates() {
      if (!this.hasRefs()) {
        return;
      }

      const dropdownCoordinates = this.getDropdownCoordinates();
      this.dropdownCoordinates = dropdownCoordinates;
    },
    handleClick(event) {
      this.changeDropdownVisibilty(!this.modelValue);
      this.stopClickPropagation(event);
    },
    handleOutsideClick() {
      this.changeDropdownVisibilty(false);
    },
    bindScrollEvent() {
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('resize', this.handleScroll);
    },
    removeScrollEvent() {
      document.removeEventListener('scroll', this.handleScroll);
    },

    handleScroll() {
      this.setDropdownCoordinates();
    },
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
    position: fixed;
    z-index: 10000;
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