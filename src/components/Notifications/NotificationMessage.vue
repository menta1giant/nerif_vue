<template>
  <div class="notification-message">
    <div class="notification-message__photo">
      <img src="@/assets/images/logo.png"/>
    </div>
    <div class="notification-message__content">
      <div class="notification-message__header">{{ notification.headerText }}</div>
      <div class="notification-message__body">
        <time class="notification-message__timestamp">{{ notification.timestamp }}</time>
        <div class="notification-message__text">{{ notification.messageText }}</div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'NotificationMessage',
  props: {
    notification: {
      type: Object,
      default() {
        return {
          logoSrc: '@/assets/logo.png',
          headerText: 'New prediction:',
          timestamp: '01-06-2023 22:00',
          messageText: 'Astralis vs Faze, map 2. Bet on Astralis!',
        };
      },
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Notifications/notification-message.scss';
</style>