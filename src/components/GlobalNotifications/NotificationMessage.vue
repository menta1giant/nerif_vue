<template>
  <div class="global-notification-message" :class="classes">{{ message }}</div>
</template>

<script>
export default {
  name: 'NotificationMessage',
  props: {
    message: String,
    type: {
      type: String,
      default: 'success',
    }
  },
  created() {
    setTimeout(this.addHiddenClass, 3000);
  },
  data() {
    return {
      classes: [`global-notification-message--${ this.type }`],
    }
  },
  methods: {
    addHiddenClass() {
      this.classes.push('global-notification-message--hidden');
    }
  }
}
</script>

<style lang="scss" scoped>
.global-notification-message {
  padding: 1.25rem 1.5rem;
  font-weight: $fw-medium;
  color: $primary-ds-900;

  border-radius: $border-radius-large;

  animation: .3s fadeIn;
  animation-fill-mode: forwards;

  &--hidden {
    animation: .3s fadeOut;
    animation-fill-mode: forwards;
  }

  &--success {
    box-shadow: 0 0 0 1px $green-600;
    background: $green-30;
  }

  &--error {
    box-shadow: 0 0 0 1px $red-600;
    background: $red-30;
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