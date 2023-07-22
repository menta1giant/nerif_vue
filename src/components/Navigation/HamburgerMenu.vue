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
@import '@/assets/styles/Navigation/hamburger-menu.scss';
</style>