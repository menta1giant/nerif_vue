<template>
  <div ref="notifications-container" id="global-notifications">

  </div>
</template>

<script>
import NotificationMessage from './NotificationMessage.vue';
import { createApp } from 'vue';

export default {
  name: 'GlobalNotifications',
  created() {
    document.addEventListener('notify', this.appendNotification);
  },
  methods: {
    appendNotification(event) {
      const { message, type } = event.detail;

      const wrapperDiv = document.createElement('div');
      this.$refs['notifications-container']?.append(wrapperDiv);

      const notification = createApp(NotificationMessage, { message, type } );
      notification.mount(wrapperDiv);

      setTimeout(()=>{
        notification.unmount();
        wrapperDiv.remove();
      }, 3700);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/GlobalNotifications/global-notifications.scss';
</style>