<template>
  <article class="faq-question">
    <div class="faq-question__header"><h3 class="h4 text-display text-bold text-ds-700" @click="toggleAnswer">{{ question }}</h3><v-chevron v-model="isOpen" /></div>
    <p v-if="isOpen" class="faq-question__body">{{ answer }}</p>
  </article>
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