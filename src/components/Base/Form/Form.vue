<template>
  <form class="v-form" :name="formName" @submit.prevent="">
    <div class="v-form__body">
      <slot></slot>
    </div>
    <div v-if="$slots['cta']" class="v-form__footer">
      <slot name="cta"></slot>
      <span 
        v-if="hasError" 
        class="error-message"
      >
        {{ errorMessage }}
      </span>
    </div>
  </form>
</template>

<script>
export default {
  name: 'Form',
  props: {
    errorMessage: String,
    formName: String,
  },
  computed: {
    hasError() {
      return !!this.errorMessage;
    }
  }
}
</script>

<style lang="scss" scoped>
.v-form {
  &__body {
    display: flex;
    gap: 1.5rem;

    padding-top: 1rem;
    max-width: 36rem;

    @media screen and (max-width: $mobile-breakpoint) {
      flex-direction: column;
    }
  }

  &__footer {
    @include divider-top;

    padding-top: 1.5rem;
    margin-top: 1rem;
  }
}
</style>