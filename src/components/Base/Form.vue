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