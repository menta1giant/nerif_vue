<template>
  <button>
    <svg class="hamburger" viewBox="0 0 100 100" width="40">
      <rect class="hamburger-menu-button__top-line" width="60" height="6" x="20" y="25" rx="5">
      </rect>
      <rect class="hamburger-menu-button__middle-line" width="60" height="6" x="20" y="45" rx="5">
      </rect>
      <rect class="hamburger-menu-button__bottom-line" width="60" height="6" x="20" y="65" rx="5">
      </rect>
    </svg>
  </button>
</template>

<style lang="scss" scoped>
.hamburger-menu-button {
  color: $primary-ds-100;

  svg {
    fill: currentColor;
  }

  rect {
    transition: y 200ms ease-in 200ms, rotate 200ms ease-in, opacity 0ms 200ms;
    transform-origin: center;
  }

  &--active {
    svg {
      fill: $accent-700;
    }

    rect {
      transition: y 200ms ease-in, rotate 200ms ease-in 200ms, opacity 0ms 200ms;
      transform-origin: center;
    }

    :is(.hamburger-menu-button__top-line, .hamburger-menu-button__bottom-line) {
      y: 45;
    }

    .hamburger-menu-button__top-line {
      rotate: 45deg;
    }

    .hamburger-menu-button__middle-line {
      opacity: 0;
    }

    .hamburger-menu-button__bottom-line {
      rotate: -45deg;
    }
  }
}
</style>