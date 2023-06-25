<template>
  <div class="notification-message">
    <div class="notification-message__photo">
      <img src="@/assets/logo.png"/>
    </div>
    <div class="notification-message__content">
      <div class="notification-message__header">{{ notification.headerText }}</div>
      <div class="notification-message__body">
        <div class="notification-message__timestamp">{{ notification.timestamp }}</div>
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
.notification-message {
  @include divider-bottom-bleak;

  display: flex;
  gap: .25rem;

  padding: .5rem .25rem;
  min-width: 16rem;

  &__photo {
    height: 2.5rem;
    aspect-ratio: 1;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: .5rem;

    font-size: $fs-medium;
    line-height: $lh-medium;
  }

  &__header {
    font-weight: $fw-semi-bold;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: .25rem;

    padding: .25rem .5rem;
    background: $primary-ds-50;

    line-height: $lh-small;
  }

  &__text {
    color: $primary-ds-900;
    font-size: .85em;
  }

  &__timestamp {
    white-space: nowrap;
    font-size: .75em;
    color: $primary-ds-700;
  }
}
</style>