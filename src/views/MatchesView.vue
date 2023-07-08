<template>
  <matches-root />
</template>

<script>
import MatchesRoot from '@/components/Matches/MatchesRoot.vue';

export default {
  name: 'MatchesView',
  components: {
    MatchesRoot,
  },
  created() {
    if (this.initialDate) {
      this.$store.commit('setMatchesSelectedDate', new Date(this.initialDate));
    }
  },
  computed: {
    initialDate() {
      return Date.parse(this.$route.params.date);
    }
  }
}
</script>