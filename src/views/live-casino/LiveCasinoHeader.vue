<template>
  <b-row
    no-gutters>
    <b-col
      :class="containerClass">
      <b-img
        :src="require('@/assets/images/live-casino-games/arcane-live-casino-header-promo.png')"
        fluid-grow
        alt="Arcanebet-Live-Casino-Promo"/>
      <b-row
        v-if="isMobile && !isLoggedIn"
        no-gutters>
        <b-col class="casino-header-mobile-container-auth-block">
          <auth-block/>
        </b-col>
      </b-row>
      <div class="casino-header-tab-container">
        <slot/>
        <search-game-input route-name="live-casino" />
      </div>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters } from 'vuex'
import AuthBlock from '@/views/events-list/AuthBlock'
import SearchGameInput from '@/components/casino-games/SearchGameInput'

export default {
  name: 'CasinoHeader',
  components: { AuthBlock, SearchGameInput },
  computed: {
    ...mapGetters([
      'isLoggedIn'
    ]),
    containerClass () {
      if (this.isMobile && !this.isLoggedIn) {
        return 'casino-header-mobile-container-auth'
      }
      return this.isMobile ? 'casino-header-mobile-container' : 'casino-header-desktop-container'
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
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: nowrap;
    }
    &-mobile-container {
      height: 162px;
      overflow: hidden;
      .casino-header-tab-container {
        flex-wrap: wrap;
      }
      &-auth {
        height: 200px;
        overflow: hidden;
        img {
          height: 200px;
        }
        &-block {
          margin: 20px 0;
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
    }
    &-desktop-container {
      overflow: hidden;
      height: 291px;
    }
  }
</style>
