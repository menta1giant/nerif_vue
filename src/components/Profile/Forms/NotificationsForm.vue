<template>
  <form-block 
    header="Notifications" 
    subheader="The notifications are shown on the right side of the navbar" 

    :form-fields="formFields"
    :form-name="formName"
    :form-api-route="formApiRoute"
    :custom-handler="handleChange"

    prefetch-required
    no-cta
  />
</template>

<script>
import FormBlock from '@/components/FormBlock.vue';

import { NOTIFICATIONS_FIELDS } from '../const';

import debounce from '@/lib/debounce';
import { apiRequestPost } from '@/lib/api';

export default {
  name: 'NotificationsForm',
  components: {
    FormBlock,
  },
  data() {
    return {
      formFields: NOTIFICATIONS_FIELDS,
      formApiRoute: 'users/profile/notification-settings',
      formName: 'notifications_form',
    }
  },
  methods: {
    handleChange: debounce(async function() {
      const form = document.forms[this.formName];

      const formData = new FormData(form);

      await apiRequestPost(this.formApiRoute, formData);

      this.formData = formData;
    }, 500),
  }
}
</script>