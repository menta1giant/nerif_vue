<template>
  <nrf-popup>
    <div class="profile-popup">
      <div class="profile-popup__header">
        <span class="profile-popup__header__name">Maria de la Alexandra si Antonia viva la vida Santos</span>
        <span class="profile-popup__header__email">maria.santos@nerif.bet</span>
      </div>
      <div class="profile-popup__common-buttons">
        <nrf-button type="transparent" size="small"><nrf-icon name="gear" />Profile settings</nrf-button>
        <nrf-button type="transparent" size="small"><nrf-icon name="book" />Documentation</nrf-button>
        <nrf-button type="transparent" size="small"><nrf-icon name="handshake-angle" />Help center</nrf-button>
      </div>
      <div class="profile-popup__common-buttons">
        <nrf-button type="transparent" size="small"><div class="icon-bleak"><nrf-icon name="right-from-bracket" /></div><span class="button-content-bleak">Log out</span></nrf-button>
      </div>
    </div>
  </nrf-popup>
</template>

<script>
export default {
  name: 'NotificationPopup',
  data() {
    return {
      profile: new Array(3),
    };
  },
}
</script>

<style lang="scss" scoped>
.profile-popup {
  padding: .5rem;
  color: $primary-ds-800;
  min-width: 16rem;
  max-width: 24rem;

  &__header {
    @include dividerBottom;

    display: flex;
    flex-direction: column;
    gap: .25rem;

    font-weight: $fw-semi-bold;
    font-size: $fs-large;
    line-height: $lh-large;
    padding-bottom: 1rem;

    &__email {
      font-size: $fs-xs;
      line-height: $lh-small;
      font-weight: $fw-regular;
      color: $primary-ds-500;
    }
  }

  &__common-buttons {
    display: flex;
    flex-direction: column;
    gap: .75rem;

    padding-top: 1rem;
  }

  &__common-buttons:not(:last-child) {
    @include dividerBottom;

    padding-bottom: 1rem;
  }
}

.icon-bleak {
  color: $primary-ds-200;
}

.button-content-bleak {
  color: $primary-ds-300 !important;
}
</style>