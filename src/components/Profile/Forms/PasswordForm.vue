<template>
  <form-block header="Password" subheader="Enter and confirm new password">
    <form-field type="password" label="Current password" name="old_password" placeholder=""/>
    <form-field type="password" label="New password" name="password" placeholder="Minimum 6 characters"/>
    <form-field type="password" label="Confirm password" name="repeat_password" placeholder="Minimum 6 characters"/>
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