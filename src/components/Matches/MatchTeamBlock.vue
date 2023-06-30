<template>
  <div class="team-block" :class="{ 'team-block--left': isLeft }">
    <div class="team-block__name"><span :class="{ 'team-block__name--predicted': isPredicted }">{{ teamInfo.name }}</span></div>
    <div class="team-block__properties">
      <div class="team-block__coeff">
        <div>{{ teamInfo.coeff }}</div>
      </div>
      <div class="team-block__meta">
        <div v-if="isOddsChangeSignificant" class="team-block__meta__item team-block__meta__item--odds" :class="{ 'team-block__meta__item--odds-fall': isLeft ? oddsChange > 0 : oddsChange < 0 }">
          <v-icon name="angles-up" />
        </div>
        <div v-if="endorsementsCount" class="team-block__meta__item team-block__meta__item--endorsements">{{ endorsementsCount }}</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MatchTeamBlock',
  props: {
    teamInfo: Object,
    oddsChange: Number,
    endorsementsCount: Number,
    isOddsChangeSignificant: Boolean,
    isPredicted: Boolean,
    isLeft: Boolean,
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Matches/match-team-block.scss';

</style>