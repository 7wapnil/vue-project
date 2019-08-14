<template>
  <b-row no-gutters>
    <b-col
      class="bg-arc-clr-soil-darker side-menu">
      <vue-scroll>
        <info-page-sidemenu/>
      </vue-scroll>
    </b-col>
    <b-col class="bg-arc-clr-soil-light min-vh-100">
      <vue-scroll>
        <router-view :key="$route.fullPath"/>
      </vue-scroll>
    </b-col>
    <b-col class="bg-arc-clr-soil-black betslip-block">
      <vue-scroll>
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
  }
}
</script>
