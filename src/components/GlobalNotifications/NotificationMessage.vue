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
@import '@/assets/styles/GlobalNotifications/global-notifications-message.scss';
</style>