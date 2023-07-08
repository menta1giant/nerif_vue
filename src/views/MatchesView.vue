<template>
  <matches-root :initial-date="Date.parse($route.params.date)" />
</template>

<script>
import MatchesRoot from '@/components/Matches/MatchesRoot.vue';

export default {
  name: 'MatchesView',
  components: {
    MatchesRoot,
  },
}
</script>