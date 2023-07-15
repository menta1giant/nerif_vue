<template>
  <div class="v-positioner">
    <div class="v-positioner__body" ref="body" @click="handleClick">
      <slot name="body"></slot>
    </div>
    <div class="v-positioner__dropdown" :class="{ 'v-positioner__dropdown--visible': modelValue }" ref="dropdown" :style="dropdownStyles">
      <slot name="dropdown"></slot>
    </div>
  </div>
</template>
<script>
import { isElementInViewport } from '@/lib/DOM';

const VERTICAL_MARGIN = 8;

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
    triggersOnClick: Boolean,
  },
  mounted() {
    if (this.triggersOnClick) {
      window.addEventListener('click',this.handleOutsideClick);
    }
    
    this.bindScrollEvent();
    this.destroyContent();
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
      maxDropdownHeight: 10000,
    };
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(val) {
        if (val) {
          this.updateBodyCoordinates();
          this.$nextTick(() => this.mountContent());
        } else {
          this.updateBodyCoordinates();
          this.destroyContent();
        }
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
    dropdownStyles() {
      return Object.assign({}, this.dropdownCoordinates, {
        minWidth: this.hasRefs() ? `${ this.$refs.body.clientWidth }px` : 0,
        maxHeight: `${this.maxDropdownHeight}px`,
      });
    },
  },
  methods: {
    mountContent() {
      document.querySelector('body').append(this.$refs.dropdown);
      this.bindScrollEvent();
      this.setDropdownCoordinates();
    },
    destroyContent() {
      if (!this.hasRefs()) return;
      setTimeout(()=>{
        this.$refs.dropdown?.remove();
        this.resetDropdownCoordinates();
        this.removeScrollEvent();
      }, 300);
    },
    resetDropdownCoordinates() {
      this.dropdownCoordinates = {
        top: '-9999px',
        left: '-9999px',
      };
    },
    stopClickPropagation(event) {
      console.log(event);
      event.stopPropagation();
    },
    changeDropdownVisibilty(newValue) {
      this.$emit('update:modelValue', newValue);
    },
    hasRefs() {
      return (this.$refs.body) && (this.$refs.dropdown);
    },
    updateDropdownCoordinates() {
      if (!this.hasRefs()) return;

      this.contentParams = this.content.getBoundingClientRect();
    },
    updateBodyCoordinates() {
      if (!this.hasRefs()) return;
      this.bodyCoordinates = this.$refs.body.getBoundingClientRect();
    },
    getOffsetX() {
      return this.isPositionCenter && this.hasRefs() ? this.$refs.dropdown.scrollWidth / 2 - this.$refs.body.scrollWidth / 2 : 0;
    },
    getIsDropdownDisplayedBelow() {
      let spaceBelowBody = document.documentElement.clientHeight - this.bodyCoordinates.bottom - VERTICAL_MARGIN;
      let spaceAboveBody = this.bodyCoordinates.top - VERTICAL_MARGIN;

      if (this.forceTop) [spaceBelowBody, spaceAboveBody] = [spaceAboveBody, spaceBelowBody]

      console.log({spaceBelowBody, spaceAboveBody});

      if (spaceBelowBody >= this.$refs.dropdown.scrollHeight) {
        return true;
      } else if (spaceBelowBody*2 > spaceAboveBody) {
        this.maxDropdownHeight = spaceBelowBody - VERTICAL_MARGIN*2;
        return true;
      } 

      this.maxDropdownHeight = spaceAboveBody - VERTICAL_MARGIN*2;
      return false;
    },
    calculateSideCoordinate() {
      const dropdownWidth = Math.max(this.$refs.body.clientWidth, this.$refs.dropdown.scrollWidth);
      const spaceBesideBody = this.position !== 'right' ? this.bodyCoordinates.left : document.documentElement.clientWidth - this.bodyCoordinates.right;
      let sideCoordinate = Math.max(16, spaceBesideBody - dropdownWidth + this.$refs.body.scrollWidth + this.getOffsetX());
      if (this.isPositionCenter) {
        sideCoordinate = Math.min(sideCoordinate, document.documentElement.clientWidth - dropdownWidth - VERTICAL_MARGIN*2);
      }

      return sideCoordinate;
    },
    getDropdownCoordinates() {
      this.updateBodyCoordinates();
      if (!isElementInViewport(this.$refs.body)) {
        return;
      }
      const isDisplayedBelow = this.getIsDropdownDisplayedBelow();
      const sideCoordinate = this.calculateSideCoordinate();
  
      const dropdownHeight = 'dropdown' in this.$refs ? Math.min(this.maxDropdownHeight, this.$refs.dropdown.scrollHeight) : 0;
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
      console.log(event);
      if (!this.triggersOnClick) return;
      
      this.changeDropdownVisibilty(!this.modelValue);
    },
    handleOutsideClick(event) {
      const containingFormField = event.target.closest('.v-form-field');

      if (this.$refs.body?.contains(event.target) || this.$refs.dropdown?.contains(event.target) || containingFormField?.contains(this.$refs.body)) return;

      this.changeDropdownVisibilty(false);
    },
    bindScrollEvent() {
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('resize', this.handleScroll);
    },
    removeScrollEvent() {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('resize', this.handleScroll);
    },
    handleScroll() {
      if (!this.modelValue) return;

      this.setDropdownCoordinates();
    },
  }
}
</script>

<style lang="scss" scoped>
.v-positioner {
  position: relative;
  min-width: fit-content;
  height: fit-content;

  &__body {
    min-width: fit-content;
  }

  &__dropdown {
    display: flex;

    position: fixed;
    z-index: 9000;
    box-shadow: 0 4px 8px 0 rgba($primary-ds-900, .15);
    visibility: hidden;

    animation: .2s fadeOut;
    animation-fill-mode: forwards;

    &--visible {
      animation: .2s fadeIn;
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