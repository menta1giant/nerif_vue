<template>
  <div class="help-icon">
    <v-tooltip>
      <template v-slot:trigger>
        <v-icon name="circle-question" />
      </template>
      <template v-slot:content>
        <slot></slot>
      </template>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: 'HelpIcon',
}
</script>

<style lang="scss" scoped>
.help-icon {
  color: $primary-s-500;
  font-size: $fs-medium;
  margin-left: .25rem;
}
</style>