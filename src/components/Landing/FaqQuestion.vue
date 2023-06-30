<template>
  <div class="faq-question">
    <div class="faq-question__header"><h4 @click="toggleAnswer">{{ question }}</h4><v-chevron v-model="isOpen" /></div>
    <div v-if="isOpen" class="faq-question__body">{{ answer }}</div>
  </div>
</template>

<script>
export default {
  name: 'FaqQuestion',
  props: {
    question: String,
    answer: String,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleAnswer() {
      this.isOpen = !this.isOpen;
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Landing/faq-question.scss';
</style>