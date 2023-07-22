<template>
  <div class="stats-bar">
    <div class="stats-bar__upper">
      <span class="stats-bar__title">
        {{ title }}
      </span>
      <div class="stats-bar__values-wrapper">
        <template v-if="isValueSingular">
          <span class="stats-bar__value">{{ value }}</span>
        </template>
        <template v-else>
          <span class="stats-bar__value" :class="{ highlighted: value[0] >= value[1] }">{{ value[0] }}</span><span class="stats-bar__value" :class="{ highlighted: value[0] <= value[1] }">{{ value[1] }}</span>
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
        return 'Default feature';
      },
    },
    value: {
      type: [Number, Array],
      default() {
        return [0.5, 0.5];
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
    scaledValue() {
      return this.isValueSingular ? this.value * 100 : this.value.reduce((previousValue, currentValue) => (previousValue - currentValue) * 50 + 50);
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Matches/stats-bar.scss';

</style>