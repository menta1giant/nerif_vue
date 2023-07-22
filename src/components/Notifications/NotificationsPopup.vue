<template>
  <div class="notifications-popup">
    <div class="notifications-popup__header"><span>Notifications</span></div>
    <div class="notifications-popup__messages-container">
      <notification-message v-for="(notification, idx) in notifications" :key="idx" :notificabtion="notification"/>
    </div>
    <div class="notifications-popup__buttons">
      <v-button type="transparent" size="small"><v-icon name="eye" />View all notifications</v-button>
      <v-button type="transparent" size="small"><v-icon name="check-double" />Mark all as read</v-button>
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
.notifications-popup {
  padding: .5rem;
  color: $primary-ds-800;

  &__header {
    @include divider-bottom-bleak;

    display: flex;
    justify-content: space-between;

    font-weight: $fw-semi-bold;
    font-size: $fs-large;
    line-height: $lh-large;
    padding-bottom: 1rem;
  }

  &__buttons {
    @include flex-column;
    gap: .5rem;

    margin-top: 1rem;
  }
}
</style>