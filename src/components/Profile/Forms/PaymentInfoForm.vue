<template>
  <form-block 
    header="Payment info" 
    subheader="All data is secure"

    :is-form-processing="isFormProcessing"

    @submit="handleFormSubmit" 
  >
    <form-field type="select" label="Location" name="location" :value="formData.location" :options="locations"/>
    <form-field type="select" label="Currency" name="currency" :value="formData.currency" :options="currencies"/>
    <form-field type="payment" label="Credit or debit card info" name="card_info" :value="formData.card_info" placeholder="Add credit or debit card info"/>
    <div class="subscription-plan-field">
      <v-label>Subscription plan</v-label>
      <v-button size="small" type="transparent"><v-icon name="cog" />{{ userInfo.subscription.plan }} <span>(Until 2023-04-26)</span></v-button>
    </div>
  </form-block>
</template>

<script>
import FormBlock from '@/components/FormBlock.vue';
import FormField from '@/components/FormField.vue';
import UserInfoMixin from '@/components/UserInfoMixin';

import { apiRequestPost, apiRequestGet, fetchResource } from '@/lib/api';
import formHandlerMixin from '@/components/formHandlerMixin';

export default {
  name: 'PersonalInfoForm',
  components: {
    FormBlock,
    FormField
  },
  mixins: [UserInfoMixin, formHandlerMixin],
  async created() {
    const [locations, currencies] = await Promise.all([fetchResource('locations'), fetchResource('currencies')]);

    this.locations = locations;
    this.currencies = currencies;

    const data = await apiRequestGet('users/profile/payment-info');

    this.formData = data;
  },
  data() {
    return {
      formData: {},

      locations: [],
      currencies: [],
    };
  },
  methods: {
    async handleFormSubmit(formData) {
      this.resetErrors();
      this.isFormProcessing = true;
      await apiRequestPost('users/profile/payment-info', formData);
      this.isFormProcessing = false;

      this.formData = formData;
    },
  }
}
</script>

<style lang="scss" scoped>
  .subscription-plan-field {
    display: grid;
    gap: .5rem;

    span {
      font-size: .8em;
      color: $primary-ds-400;
    }
  }
</style>