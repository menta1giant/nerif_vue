<template>
  <div ref="modal" class="v-modal-overlay" :class="{ 'v-modal-overlay--shown': modelValue }" @click="closeModal">
    <div class="v-modal" :class="{ [`v-modal--${ type }`]: true }" @click="(event)=>event.stopPropagation()">
      <div class="v-modal__close" @click="closeModal"><v-icon name="xmark" /></div>
      <div class="v-modal__header">
        <v-icon v-if="statusIconName" :name="statusIconName" />
        <h2>{{ header }}</h2>
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
    this.removeModal();
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
        this.removeModal();
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
    removeModal() {
      this.$refs.modal?.remove();
      document.body.classList.remove("scroll-lock");
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Base/modal.scss';
</style>