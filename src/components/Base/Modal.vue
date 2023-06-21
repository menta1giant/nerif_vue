<template>
  <div v-if="modelValue" class="v-modal-overlay" @click="$emit('update:modelValue', false)">
    <div class="v-modal" :class="{ [`v-modal--${ type }`]: true }" @click="(event)=>event.stopPropagation()">
      <div class="v-modal__close"><v-icon name="xmark" /></div>
      <div class="v-modal__header"><span class="v-modal__status-icon"><v-icon name="circle-exclamation" /></span><span>New Modal</span></div>
      <div class="v-modal__body">This is a modal which has text</div>
      <div class="v-modal__footer"><v-button>Hello</v-button></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    modelValue: {
      type: Boolean,
      default() {
        return false;
      },
    },
    type: {
      type: String,
      validator(val) {
        return ['warn', 'success', 'danger', 'default'].includes(val);
      },
      default() {
        return 'warn';
      },
    },
  }
}
</script>

<style lang="scss" scoped>
.v-modal-overlay {
  position: fixed;
  background: rgba($primary-ds-900, .6);
  width: 100%;
  height: calc(100% - $navbar-height);
  left: 0;
  top: $navbar-height;
  z-index: 10000;

  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: $mobile-breakpoint) {
  .v-modal-overlay {
    height: calc(100% - (2 * $navbar-height));
  }
}

.v-modal {
  position: relative;

  background: $black-10;
  box-shadow: 0 4px 8px 0 rgba($primary-ds-900, .15);
  min-width: 200px;
  height: 300px;
  padding: 1.5rem;
  padding-right: 3rem;
  border-radius: 0px 6px 6px 0px;
  border-left: 6px solid transparent;

  display: flex;
  flex-direction: column;

  &--warn {
    border-color: $accent-500;

    .v-modal__status-icon {
      color: $accent-500;
    }
  }

  &__close {
    position: absolute;
    right: 12px;
    top: 12px;
    
    font-size: $fs-h4;
    color: $primary-ds-300;
  }

  &__header {
    display: flex;
    gap: .5rem;

    font-size: $fs-h4;
    line-height: $lh-h4;
    font-weight: $fw-semi-bold;
    font-family: $ff-display;

    span {
      white-space: nowrap;
    }
  }

  &__body {
    flex: 1;
    margin: 1rem 0;
  }
}
</style>