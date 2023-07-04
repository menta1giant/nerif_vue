<template>
  <form-block header="Notifications" subheader="The notifications are shown on the right side of the navbar" no-cta>
    <v-switcher-field label="New predictions" :value="true" />
    <v-switcher-field label="Predictions from selected cappers" :value="true" />
    <v-switcher-field label="Weekly dashboard digests" :value="true" />
    <v-switcher-field label="Special offers" :value="true" />
    <v-switcher-field label="Community mentions" :value="true" />
  </form-block>
</template>

<script>
import FormBlock from '@/components/FormBlock.vue';

export default {
  name: 'NotificationsForm',
  components: {
    FormBlock,
  },
}
</script>