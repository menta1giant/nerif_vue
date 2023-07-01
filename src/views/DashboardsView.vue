<template>
  <v-section span padded responsive>
    <div class="dashboards-wrapper">
      <div class="dashboard"></div>
      <div class="dashboard"></div>
      <div class="dashboard"></div>
      <div class="dashboard"></div>
    </div>
  </v-section>
</template>

<style lang="scss" scoped>
.dashboards-wrapper {
  width: 100%;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 2rem;
}

.dashboard {
  max-width: 100%;

  &:nth-child(1) {
    background: red;
    height: 300px;
  }
  &:nth-child(2) {
    background: yellow;
    height: 700px;
  }
  &:nth-child(3) {
    background: green;
    height: 200px;
  }
  &:nth-child(4) {
    background: blue;
    height: 800px;
  }
}
</style>