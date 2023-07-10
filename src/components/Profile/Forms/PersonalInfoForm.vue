<template>
  <form-block header="Personal info" subheader="Tell us more about yourself">
    <template #default>
      <form-field label="First name" placeholder="Maria" name="first_name"/>
      <form-field label="Last name" placeholder="Santos" name="last_name"/>
      <form-field label="Phone number" placeholder="+79009009090" name="phone"/>
      <form-field label="E-mail" placeholder="goracio.nelson@gmail.com" name="email" autocomplete/>
    </template>
    <template #right>
      <image-upload />
    </template>
  </form-block>
</template>

<script>
import FormBlock from '@/components/FormBlock.vue';
import FormField from '@/components/FormField.vue';
import ImageUpload from '@/components/ImageUpload.vue';

export default {
  name: 'PersonalInfoForm',
  components: {
    FormBlock,
    FormField,
    ImageUpload
  },
}
</script>

<style lang="scss" scoped>

</style>