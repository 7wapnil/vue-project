<template>
  <b-row no-gutters>
    <b-col
      class="bg-arc-clr-soil-darker side-menu">
      <vue-scroll :ops="scrollSettings">
        <info-page-sidemenu/>
      </vue-scroll>
    </b-col>
    <b-col class="bg-arc-clr-soil-light min-vh-100">
      <router-view :key="$route.fullPath"/>
    </b-col>
    <b-col class="bg-arc-clr-soil-black betslip-block">
      <vue-scroll :ops="scrollSettings">
        <promotional-item/>
        <betslip/>
      </vue-scroll>
    </b-col>
  </b-row>
</template>
<script>
import Betslip from '@/components/betslip/Betslip.vue'
import PromotionalItem from '@/components/promotional/PromotionalItem'
import InfoPageSidemenu from './InfoPageSidemenu'

export default {
  components: {
    InfoPageSidemenu,
    Betslip,
    PromotionalItem
  },
  data () {
    return {
      scrollSettings: {
        bar: {
          size: '6px',
          opacity: 0.6,
          background: '#5e5e5e',
        },
        rail: {
          gutterOfSide: '4px'
        },
        scrollPanel: {
          easing: 'easeInCubic'
        }
      }
    }
  }
}
</script>
