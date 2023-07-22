<template>
  <v-modal v-model="isShown" header="Are you sure you want to leave?" type="warn">
    <template #default>
      <div class="leaving-sign-up-modal__body">
        <p>
          You are leaving the sign up process. Bear in mind that your account has already been created and you are logged into it. However, the payment info is not yet filled, so at the moment you are restricted from using certain features.
        </p>
        <p>
          If you choose to leave, you could always access your profile settings <b>here</b> or by following navigation at the top of the page.
        </p>
      </div>
    </template>
    <template #cta>
      <v-button type="primary" size="small" @click="handleCloseModal">Continue sign up</v-button><v-button type="secondary" size="small" @click="$emit('confirm')">Leave the page</v-button>
    </template>
  </v-modal>
</template>
<script>
export default {
  name: 'LeaveSignUpModal',
  emits: ['confirm', 'update:modelValue'],
  props: {
    modelValue: Boolean,
  },
  data() {
    return {
      isShown: false,
    }
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(val) {
        this.isShown = val;
      }
    },
    isShown: {
      handler(val) {
        this.$emit('update:modelValue', val);
      }
    },
  },
  methods: {
    handleCloseModal() {
      this.$emit('update:modelValue', false);
    },
  },
}
</script>

<style lang="scss" scoped>
p {
  max-width: 50ch;
  line-height: $lh-body;
  margin-bottom: 1.25rem;
}
</style>