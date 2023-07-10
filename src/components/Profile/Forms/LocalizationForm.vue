<template>
  <form-block header="Localization" subheader="Aloha!">
    <form-field type="select" label="Language" name="language"/>
    <form-field type="select" label="Timezone" name="timezone"/>
  </form-block>
</template>

<script>
import FormBlock from '@/components/FormBlock.vue';
import FormField from '@/components/FormField.vue';

export default {
  name: 'LocalizationForm',
  components: {
    FormBlock,
    FormField
  },
}
</script>