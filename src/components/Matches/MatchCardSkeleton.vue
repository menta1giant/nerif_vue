<template>
  <div class="match-card match-card-skeleton">
    <div class="match-card__upper-wrapper">
        <div class="match-card-skeleton__team-block">
          <animated-placeholder width="100px" height="auto" border-radius="6px"/>
          <animated-placeholder width="50px" height="auto" border-radius="6px"/>
        </div>
        <div class="match-info-wrapper"> 
          <animated-placeholder width="auto" height="70px" border-radius="6px"/>
        </div>
        <div class="match-card-skeleton__team-block">
          <animated-placeholder width="100px" height="auto" border-radius="6px"/>
          <animated-placeholder width="50px" height="auto" border-radius="6px"/>
        </div>
    </div>
  </div>
</template>

<script>
import AnimatedPlaceholder from '@/components/AnimatedPlaceholder';

export default {
  name: 'MatchCardSkeleton',
  components: {
    AnimatedPlaceholder,
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Matches/match-card.scss';

.match-card {
  padding-bottom: 2rem;
  cursor: default;
}

.match-card-skeleton__team-block {
  display: grid;
  gap: .5rem;

  &:first-child {
    justify-items: flex-end;
  }
}

</style>