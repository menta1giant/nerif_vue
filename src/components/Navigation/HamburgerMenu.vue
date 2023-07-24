<template>
  <nav class="hamburger-menu">
    <ul>
      <li><router-link to="/help-center">Help center</router-link></li>
      <li><router-link to="/documentation">Documentation</router-link></li>
      <li><router-link to="/home#testimonials">Testimonials</router-link></li>
      <li><router-link to="/home#plans">Subscription plans</router-link></li>
      <li><router-link to="/blog">Nerif blog</router-link></li>
      <li><a href="https://github.com/menta1giant">Hire person who made this site</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'HamburgerMenu',
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/Navigation/hamburger-menu.scss';
</style>