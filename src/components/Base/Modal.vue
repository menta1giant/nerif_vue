<template>
  <div class="nrf-modal-overlay">
    <div class="nrf-modal">
      <div class="nrf-modal__header"></div>
      <div class="nrf-modal__body"></div>
      <div class="nrf-modal__footer"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal'
}
</script>

<style lang="scss" scoped>
.nrf-modal-overlay {
  position: fixed;
  background: rgba($primary-ds-900, .6);
  width: 100%;
  height: calc(100% - $navbar-height);
  left: 0;
  top: $navbar-height;
  z-index: 10000;

  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: $mobile-breakpoint) {
  .nrf-modal-overlay {
    height: calc(100% - (2 * $navbar-height));
  }
}

.nrf-modal {
  background: $black-10;
  box-shadow: 0 4px 8px 0 rgba($primary-ds-900, .15);
  width: 200px;
  height: 300px;
  border-radius: 0px 6px 6px 0px;
  border-left: 6px solid $accent-500;
}
</style>