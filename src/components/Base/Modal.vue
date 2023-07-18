<template>
  <div ref="modal" class="v-modal-overlay" :class="{ 'v-modal-overlay--shown': modelValue }" @click="closeModal">
    <div class="v-modal" :class="{ [`v-modal--${ type }`]: true }" @click="(event)=>event.stopPropagation()">
      <div class="v-modal__close" @click="closeModal"><v-icon name="xmark" /></div>
      <div class="v-modal__header">
        <v-icon v-if="statusIconName" :name="statusIconName" />
        <span>{{ header }}</span>
      </div>
      <div class="v-modal__body">
        <slot></slot>
      </div>
      <div class="v-modal__footer">
        <slot name="cta"></slot>
      </div>
    </div>
  </div>
</template>

<script>
const STATUS_ICONS = {
  warn: 'circle-exclamation',
}

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
        return 'default';
      },
    },
    header: {
      type: String,
      default: 'New modal',
    },
    statusIcon: String,
  },
  beforeUnmount() {
    this.$refs.modal?.remove();
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(val) {
        if (val) {
          document.body.append(this.$refs.modal);
          document.body.classList.add("scroll-lock");
          return;
        }
        this.$refs.modal?.remove();
        document.body.classList.remove("scroll-lock");
      }
    },
    '$route.path': {
      handler() {
        if (this.modelValue) this.closeModal();
      }
    }
  },
  computed: {
    statusIconName() {
      return this.statusIcon || STATUS_ICONS[this.type];
    }
  },
  methods: {
    closeModal() {
      this.$emit('update:modelValue', false);
    },
  },
}
</script>

<style lang="scss" scoped>
.v-modal-overlay {
  position: fixed;
  background: rgba($primary-ds-900, .6);
  height: 100%;
  width: 100%;
  left: 0;
  top: $navbar-height;
  z-index: 9000;

  display: flex;
  align-items: center;
  justify-content: center;

  visibility: hidden;

  &--shown {
    visibility: visible;
  }
}
.v-modal {
  position: relative;

  background: $black-10;
  box-shadow: 0 4px 8px 0 rgba($primary-ds-900, .15);
  min-width: 200px;
  max-width: calc(100% - 2rem);
  padding: 1.5rem;
  border-radius: 0px 6px 6px 0px;
  border-left: 6px solid transparent;

  max-height: calc(100% - $navbar-height * 3);

  transform: translateY(-15%);

  display: flex;
  flex-direction: column;

  .v-icon {
      color: $primary-s-400;
    }

  &--warn {
    border-color: $accent-500;
    .v-modal__header .v-icon {
      color: $accent-500;
    }
  }

  &__close {
    position: absolute;
    right: 12px;
    top: 12px;
    
    font-size: $fs-large;
    color: $primary-ds-300;

    cursor: pointer;
  }

  &__header { 
    @include divider-bottom-bleak;

    display: flex;
    gap: .75rem;
    padding-bottom: 1rem;
    padding-right: 2rem;

    font-size: $fs-h4;
    line-height: $lh-h4;
    font-weight: $fw-semi-bold;
    font-family: $ff-display;
  }

  &__body {
    flex: 1;
    min-height: 8rem;
    overflow: auto;
    padding: 1rem .125rem;
  }

  &__footer {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    @media screen and (max-width: $mobile-breakpoint) {
      flex-direction: column;
    }
  }
}
</style>