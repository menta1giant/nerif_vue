<template>
  <form-block 
  header="Localization" 
  subheader="Aloha!"

  :is-form-processing="isFormProcessing"

  @submit="handleFormSubmit" 
  >
    <form-field type="select" label="Language" name="language" :value="formData.language" :options="languages"/>
    <form-field type="select" label="Timezone" name="timezone" :value="formData.timezone" :options="timezones"/>
  </form-block>
</template>

<script>
import FormBlock from '@/components/FormBlock.vue';
import FormField from '@/components/FormField.vue';

import { apiRequestPost, apiRequestGet, fetchResource } from '@/lib/api';
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

    const data = await apiRequestGet('users/profile/localization-info');

    this.formData = data;
  },
  data() {
    return {
      formData: {},

      languages: [],
      timezones: [],
    }
  },
  methods: {
    async handleFormSubmit(formData) {
      this.resetErrors();
      this.isFormProcessing = true;
      await apiRequestPost('users/profile/localization-info', formData);
      this.isFormProcessing = false;
    },
  }
}
</script>