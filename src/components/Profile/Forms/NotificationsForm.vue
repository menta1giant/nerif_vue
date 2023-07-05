<template>
  <form-block header="Notifications" subheader="The notifications are shown on the right side of the navbar" no-cta>
    <form-field type="switcher" label="New predictions" :value="true" />
    <form-field type="switcher" label="Predictions from selected cappers" :value="true" />
    <form-field type="switcher" label="Weekly dashboard digests" :value="true" />
    <form-field type="switcher" label="Special offers" :value="true" />
    <form-field type="switcher" label="Community mentions" :value="true" />
  </form-block>
</template>

<script>
import FormBlock from '@/components/FormBlock.vue';
import FormField from '@/components/FormField.vue';

export default {
  name: 'NotificationsForm',
  components: {
    FormBlock,
    FormField,
  },
}
</script>