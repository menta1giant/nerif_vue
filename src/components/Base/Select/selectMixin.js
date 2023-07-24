export default {
  data() {
    return {
      optionsFocused: false,
      isDropdownVisible: false,
    };
  },
  watch: {
    isDropdownVisible: {
      immediate: true,
      handler(val) {
        if (val || !this.optionsFocused) return;

        this.optionsFocused = false;
        this.focusBody();
      }
    }
  },
  methods: {
    handleOptionsGainFocus() {
      this.optionsFocused = this.isDropdownVisible = true;
      setTimeout(() => this.$refs.dropdown?.$el?.firstElementChild?.focus(), 200);
    },
    handleOptionsLoseFocus() {
      this.optionsFocused = this.isDropdownVisible = false;
      setTimeout(() => this.focusBody(), 200);
    },
    focusBody() {
      this.$refs.body?.$el?.focus();
    },
  }
}