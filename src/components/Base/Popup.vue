<template>
  <div class="popup">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.popup {
  background: $black-10;
  border-radius: $border-radius-small;
  padding: .5rem;
}

</style>