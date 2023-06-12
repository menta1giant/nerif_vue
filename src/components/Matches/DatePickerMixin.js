export default {
  computed: {
    month() {
      return this.currentDate.getMonth();
    },
    year() {
      return this.currentDate.getFullYear();
    },
    date() {
      return this.currentDate.getDate();
    },
  }
}