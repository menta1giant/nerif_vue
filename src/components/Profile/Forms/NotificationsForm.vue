<template>
  <form-block header="Notifications" subheader="The notifications are shown on the right side of the navbar" :form-name="formName" no-cta>
    <form-field type="switcher" name="new_predictions" label="New predictions" :value="true" @input="handleChange(formName)" />
    <form-field type="switcher" name="cappers_predictions" label="Predictions from selected cappers" :value="true" @input="handleChange" />
    <form-field type="switcher" name="dashboard_digests" label="Weekly dashboard digests" :value="true" @input="handleChange" />
    <form-field type="switcher" name="special_offers" label="Special offers" :value="true" @input="handleChange" />
    <form-field type="switcher" name="community_mentions" label="Community mentions" :value="true" @input="handleChange" />
  </form-block>
</template>

<script>
import FormBlock from '@/components/FormBlock.vue';
import FormField from '@/components/FormField.vue';

import debounce from '@/lib/debounce';
import { apiRequestPost } from '@/lib/api';

export default {
  name: 'NotificationsForm',
  components: {
    FormBlock,
    FormField,
  },
  data() {
    return {
      formName: 'notifications_form',
      notificationSettings: {},
    }
  },
  methods: {
    handleChange: debounce(function() {
      console.log(this.formName);
      const form = document.forms[this.formName];
      console.dir(form);

      const formData = new FormData(form);

      apiRequestPost('users/profile/update-notification-settings', formData);
    }, 500),
  }
}
</script>