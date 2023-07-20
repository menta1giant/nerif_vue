<template>
  <div class="hamburger-menu">
    <router-link to="/help-center">Help center</router-link>
    <router-link to="/documentation">Documentation</router-link>
    <router-link to="/home#testimonials">Testimonials</router-link>
    <router-link to="/home#plans">Subscription plans</router-link>
    <router-link to="/blog">Nerif blog</router-link>
    <a href="https://github.com/menta1giant">Hire person who made this site</a>
  </div>
</template>

<script>
export default {
  name: 'HamburgerMenu',
}
</script>

<style lang="scss" scoped>
.hamburger-menu {
  transform: translateX(-100%);
  transition: transform 400ms ease-out;

  position: fixed;
  top: $navbar-height;
  right: 0px;

  width: 100vw;
  height: 100%;
  background: $primary-ds-800;

  z-index: 8900;

  padding: 2rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  &--active {
    transform: translateX(0);
  }

  a {
    display: flex;
    gap: .75rem;
    align-items: center;
    justify-content: flex-end;
    text-align: right;

    color: $black-10;
    font-size: $fs-h4;
    line-height: $lh-h4;
    font-family: $ff-display;
    font-weight: $fw-semi-bold;
    padding: .5rem 0;

    width: 100%;

    transition-duration: .4s;

    &::after {
      content: '';

      display: block;
      width: 4px;
      height: 16px;
      background: $primary-ds-200;

      transition-duration: .2s;
    }

    &:last-child {
      color: $primary-ds-300;

      &::after {
        background: $primary-ds-500;
      }
    }

    &:hover, &:active, &:focus, &.router-link-active:not([href*="#"]) {
      color: $black-10;
      background: rgba($black-10, .05);

      &::after {
        height: 24px;
        background: $accent-700;
      }
    }

    &.router-link-active:not([href*="#"]) {
      cursor: default;
    }
  }
}
</style>