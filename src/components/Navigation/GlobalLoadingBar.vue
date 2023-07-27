<template>
  <div v-if="isActive" class="global-loading-bar" :class="{ 'global-loading-bar--finished': isFinished }"></div>
</template>

<script>
export default {
  name: 'GlobalLoadingBar',
  created() {
    document.addEventListener('pageLoading', this.showLoading);
    document.addEventListener('pageFinishedLoading', this.finishLoading);
  },
  data() {
    return {
      isActive: false,
      isFinished: false,

      timer: null,
    }
  },
  methods: {
    showLoading() {
      this.isActive = false;

      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }

      this.$nextTick(() => this.isActive = true);
    },
    finishLoading() {
      this.isFinished = true;
      this.timer = setTimeout(()=> this.isActive = this.isFinished = false, 700);
    }
  }
}
</script>

<style lang="scss" scoped>
.global-loading-bar {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 8px;
  background-image: linear-gradient(
    to right,
    rgba($primary-s-400, 1) 0%,
    rgba($primary-s-200, 1) 2%,
    rgba($primary-s-200, 1) 4%,
    rgba($primary-s-400, 1) 8%
  );
  background-size: 200% 100%;

  transform: translateY(100%);
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);

  animation: bgAnimateLoading 2s linear infinite;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    right: 0;
    background-color: $primary-ds-100;
    animation: overlayPositionAnimateLoading 25s linear forwards;
  }

  &--finished {
    &::after {
      animation-play-state: paused;
      transition-property: translate;
      transition-duration: .7s;
      translate: 100% 0%;
    }
  }
}

@keyframes bgAnimateLoading {
  0% {
    background-position: 50% 0;
  }

  100% {
    background-position: -150% 0;
  }
}

@keyframes overlayPositionAnimateLoading {
  0% {
    width: 100%;
  }

  3% {
    width: 90%;
  }

  5% {
    width: 70%;
  }

  10% {
    width: 65%;
  }

  11% {
    width: 40%;
  }

  19% {
    width: 36%;
  }

  20% {
    width: 20%;
  }

  100% {
    width: 0%;
  }
}

@keyframes overlayPositionAnimateFinish {
100% {
    width: 0%;
  }
}
</style>