<template>
  <b-row no-gutters>
    <b-col
      :class="[isMobile ? 'live-casino-header-mobile-container' :
      'live-casino-header-desktop-container']">
      <b-img
        :src="require('@/assets/images/live-casino-games/arcane-live-casino-header-promo.png')"
        :height="backgroundHeight"
        fluid-grow
        alt="Arcanebet-Casino-Promo"/>
      <div class="live-casino-header-tab-container">
        <slot/>
      </div>
    </b-col>
  </b-row>
</template>

<script>
const MOBILE_BACKGROUND_HEIGHT = '172'
const DESKTOP_BACKGROUND_HEIGHT = '356'

export default {
  name: 'LiveCasinoHeader',
  computed: {
    backgroundHeight () {
      return this.isMobile ? MOBILE_BACKGROUND_HEIGHT : DESKTOP_BACKGROUND_HEIGHT
    }
  }
}
</script>
<style lang="scss"
       scoped>
  .live-casino-header {
    &-tab-container {
      position: absolute;
      bottom: 0;
      left: 0;
    }
    &-mobile-container {
      overflow: hidden;
      height: 172px;
    }
    &-desktop-container {
      overflow: hidden;
      height: 291px;
    }
  }
</style>
