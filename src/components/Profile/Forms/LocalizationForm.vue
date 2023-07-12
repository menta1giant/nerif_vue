<template>
  <form-block 
  header="Localization" 
  subheader="Aloha!"

  :is-form-processing="isFormProcessing"

  @submit="handleFormSubmit" 
  >
    <form-field type="select" label="Language" name="language" :options="languages"/>
    <form-field type="select" label="Timezone" name="timezone" :options="timezones"/>
  </form-block>
</template>

<script>
import FormBlock from '@/components/FormBlock.vue';
import FormField from '@/components/FormField.vue';

import { apiRequestPost, fetchResource } from '@/lib/api';
import formHandlerMixin from '@/components/formHandlerMixin';

export default {
  name: 'LocalizationForm',
  components: {
    FormBlock,
    FormField
  },
  mixins:[formHandlerMixin],
  async created() {
    const [languages, timezones] = await Promise.all([fetchResource('languages'), fetchResource('timezones')]);

    this.languages = languages;
    this.timezones = timezones;
  },
  data() {
    return {
      languages: [],
      timezones: [],
    }
  },
  methods: {
    async handleFormSubmit(formData) {
      this.resetErrors();
      this.isFormProcessing = true;
      await apiRequestPost('users/profile/update-localization-info', formData);
      this.isFormProcessing = false;
    },
  }
}
</script>