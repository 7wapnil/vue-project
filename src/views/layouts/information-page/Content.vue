<template>
  <b-row no-gutters>
    <b-col
      class="d-none d-lg-block bg-arc-clr-soil-darker"
      style="max-width: 268px">
      <info-page-sidemenu/>
    </b-col>
    <b-col class="bg-arc-clr-soil-light min-vh-100">

      <router-view :key="$route.fullPath"/>

    </b-col>
    <b-col
      class="d-none d-lg-block bg-arc-clr-soil-black"
      style="max-width: 268px">
      <div class="betslip-block">
        <promotional-item/>
        <betslip/>
      </div>
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
