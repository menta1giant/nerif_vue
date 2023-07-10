<template>
  <form-block header="Payment info" subheader="All data is secure">
    <form-field type="select" label="Location" name="location"/>
    <form-field type="select" label="Currency" name="currency"/>
    <form-field type="payment" label="Credit or debit card info" name="card-info" placeholder="Add credit or debit card info"/>
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

export default {
  name: 'PersonalInfoForm',
  components: {
    FormBlock,
    FormField
  },
  mixins: [UserInfoMixin],
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