<template>
  <div class="notifications-popup">
    <div class="notifications-popup__header"><span>Notifications</span></div>
    <div class="notifications-popup__messages-container">
      <notification-message v-for="(notification, idx) in notifications" :key="idx" :notificabtion="notification"/>
    </div>
    <div class="notifications-popup__buttons">
      <v-button type="transparent" size="small"><v-icon name="eye" /><span>View all notifications</span></v-button>
      <v-button type="transparent" size="small"><v-icon name="check-double" /><span>Mark all as read</span></v-button>
    </div>
  </div>
</template>

<script>
import NotificationMessage from './NotificationMessage.vue';

export default {
  name: 'NotificationPopup',
  components: {
    NotificationMessage,
  },
  data() {
    return {
      notifications: new Array(3),
    };
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Notifications/notifications-popup.scss';
</style>