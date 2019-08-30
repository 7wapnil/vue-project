<template>
  <b-row no-gutters>
    <b-col class="bg-arc-clr-soil-darker side-menu">
      <info-page-sidemenu/>
    </b-col>
    <b-col class="bg-arc-clr-soil-light min-vh-100">
      <router-view :key="$route.fullPath"/>
    </b-col>
    <b-col class="bg-arc-clr-soil-black betslip-block">
      <promotional-item/>
      <betslip/>
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
