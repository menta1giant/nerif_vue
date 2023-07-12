<template>
  <form-block header="Notifications" subheader="The notifications are shown on the right side of the navbar" :form-name="formName" no-cta>
    <form-field type="switcher" name="new_predictions" label="New predictions" :value="formData.new_predictions || (formData.new_predictions === undefined)" @input="handleChange(formName)" />
    <form-field type="switcher" name="cappers_predictions" label="Predictions from selected cappers" :value="formData.cappers_predictions || (formData.cappers_predictions === undefined)" @input="handleChange" />
    <form-field type="switcher" name="dashboard_digests" label="Weekly dashboard digests" :value="formData.dashboard_digests || (formData.dashboard_digests === undefined)" @input="handleChange" />
    <form-field type="switcher" name="special_offers" label="Special offers" :value="formData.special_offers || (formData.special_offers === undefined)" @input="handleChange" />
    <form-field type="switcher" name="community_mentions" label="Community mentions" :value="formData.community_mentions || (formData.community_mentions === undefined)" @input="handleChange" />
  </form-block>
</template>

<script>
import FormBlock from '@/components/FormBlock.vue';
import FormField from '@/components/FormField.vue';

import debounce from '@/lib/debounce';
import { apiRequestPost, apiRequestGet } from '@/lib/api';

export default {
  name: 'NotificationsForm',
  components: {
    FormBlock,
    FormField,
  },
  async created() {
    const data = await apiRequestGet('users/profile/notification-settings');

    this.formData = data;
  },
  data() {
    return {
      formData: {},
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

      apiRequestPost('users/profile/notification-settings', formData);
    }, 500),
  }
}
</script>