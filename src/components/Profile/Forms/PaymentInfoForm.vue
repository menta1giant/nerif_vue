<template>
  <form-block header="Payment info" subheader="All data is secure">
    <form-field type="select" label="Location"/>
    <form-field type="select" label="Currency"/>
    <form-field type="payment" label="Credit or debit card info" placeholder="Add credit or debit card info"/>
    <form-field label="Subscription plan" placeholder="Premium"/>
  </form-block>
</template>

<script>
import FormBlock from '@/components/FormBlock.vue';
import FormField from '@/components/FormField.vue';

export default {
  name: 'PersonalInfoForm',
  components: {
    FormBlock,
    FormField
  },
}
</script>