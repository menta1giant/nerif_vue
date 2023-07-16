<template>
  <div class="v-loader"></div>
</template>

<style lang="scss" scoped>
  @-moz-keyframes PreloaderAnimation {
    0% {
      -moz-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -moz-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes PreloaderAnimation {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes PreloaderAnimation {
    0% {
      -moz-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -moz-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  .v-loader {
    display: inline-block;

    -moz-animation: PreloaderAnimation 1250ms infinite linear;
    -webkit-animation: PreloaderAnimation 1250ms infinite linear;
    animation: PreloaderAnimation 1250ms infinite linear;

    width: 1em;
    height: 1em;

    border-style: solid;
    border-radius: 50%;
    border-width: 2px;
    border-color: currentColor;//var(--border-color);
    border-right-color: transparent;

    position: relative;
  }

</style>