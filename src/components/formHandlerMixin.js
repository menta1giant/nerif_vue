export default {
  data() {
    return {
      errorMessages: {},
      isFormProcessing: false,
    };
  },
  methods: {
    resetErrors() {
      this.errorMessages = [];
    },
    handleFormValidationFail(errorMessages) {
      this.errorMessages = errorMessages;
    },
  }
}