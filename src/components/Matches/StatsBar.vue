<template>
  <div class="stats-bar">
    <div class="stats-bar__upper">
      <div class="stats-bar__title">
        {{ title }}
      </div>
      <div class="stats-bar__values-wrapper">
        <template v-if="isValueSingular">
          <div class="stats-bar__value">{{ value }}</div>
        </template>
        <template v-else>
          <div class="stats-bar__value" :class="{ highlighted: value[0].isHighlighted }">{{ value[0].value }}</div><div class="stats-bar__value" :class="{ highlighted: value[1].isHighlighted }">{{ value[1].value }}</div>
        </template>
      </div>
    </div>
    <div class="stats-bar__scale" :style="scaleStyles"></div>
  </div>
</template>

<script>

const SCALE_COLORS = {
  'red': '#E5BCB3',
  'yellow': '#E5D9B3',
  'green': '#B7E5B3',
}

export default {
  name: 'StatsBar',
  props: {
    title: {
      type: String,
      default() {
        return 'Recent Performance';
      },
    },
    value: {
      type: [Number, Array],
      default() {
        return [{ value: Math.floor(Math.random()*20 -10), isHighlighted: false }, { value: Math.floor(Math.random()*20 -10), isHighlighted: true }];
      },
    },
    scaledValue: {
      type: Number,
      default() {
        return Math.floor(Math.random()*100);
      },
    },
  },
  computed: {
    scaleColor() {
      if (this.scaledValue < 30) {
        return SCALE_COLORS['red'];
      }

      if (this.scaledValue < 70) {
        return SCALE_COLORS['yellow'];
      }

      return SCALE_COLORS['green']
    },
    scaleStyles() {
      return {
        background: `linear-gradient(90deg, ${ this.scaleColor } 0%, ${ this.scaleColor } ${ this.scaledValue }%, #D8DAE5 ${ this.scaledValue }%)`,
      };
    },
    isValueSingular() {
      return typeof this.value === 'number';
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Matches/stats-bar.scss';

</style>