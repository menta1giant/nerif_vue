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
#global-notifications {
  position: fixed;
  top: calc($navbar-height + 1rem);
  right: 0px;

  display: grid;
  gap: 1.25rem;

  width: 20rem;
  padding: 0 1rem;

  @media screen and (max-width: $mobile-breakpoint) {
    width: 100vw;
  }

  z-index: 9000;
}
</style>