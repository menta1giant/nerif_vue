<template>
  <form-block header="Tell us more about yourself" cta-text="Complete registration" fluid @proceed="$router.push('/profile')">
    <template #default>
      <form-field label="First name" placeholder="Maria"/>
      <form-field label="Last name" placeholder="Santos"/>
      <form-field type="select" label="Location" fluid/>
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
  name: 'FinalStep',
  components: {
    FormField,
    FormBlock,
    ImageUpload,
  },
}
</script>

<style lang="scss" scoped>
</style>