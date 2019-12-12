<template>
  <b-row
    no-gutters>
    <b-col
      :class="[isMobile ? 'casino-header-mobile-container' :
      'casino-header-desktop-container']">
      <b-img
        :src="require('@/assets/images/casino-games/arcane-casino-header-promo.png')"
        :height="backgroundHeight"
        fluid-grow
        alt="Arcanebet-Casino-Promo"/>
      <b-row no-gutters
             class="mt-4 yo">
        <b-col>
          <auth-block/>
        </b-col>
      </b-row>
      <div class="casino-header-tab-container">
        <slot/>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters } from 'vuex'
import AuthBlock from '@/views/events-list/AuthBlock'

const MOBILE_BACKGROUND_HEIGHT = '172'
const MOBILE_BACKGROUND_HEIGHT_WITH_AUTH_BLOCK = '266'
const DESKTOP_BACKGROUND_HEIGHT = '356'

export default {
  name: 'CasinoHeader',
    components: { AuthBlock },
    computed: {
      ...mapGetters([
          'isLoggedIn'
      ]),
      backgroundHeight () {
          if (this.isMobile && !this.isLoggedIn) {
              return MOBILE_BACKGROUND_HEIGHT_WITH_AUTH_BLOCK
          }
          return this.isMobile ? MOBILE_BACKGROUND_HEIGHT : DESKTOP_BACKGROUND_HEIGHT
      }
  }
}
</script>
<style lang="scss"
       scoped>
    .casino-header {
      &-tab-container {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
      }
      &-mobile-container {
        overflow: hidden;
        .yo {
          width: 100%;
          position: absolute;
          top: 0;
        }
      }
      &-desktop-container {
        overflow: hidden;
        height: 291px;
      }
    }
</style>
