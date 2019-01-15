<template>
  <b-row no-gutters>
    <b-col
      cols="12"
      class="d-none d-lg-block"
      style="max-width: 268px">
      <side-menu/>
    </b-col>
    <b-col class="bg-arc-clr-soil-light">

      <router-view/>

    </b-col>
    <b-col
      cols="12"
      class="d-none d-lg-block"
      style="max-width: 268px">
      <promotional-item/>
      <betslip/>
    </b-col>
  </b-row>
</template>

<script>
import SideMenu from '@/components/side-menu/SideMenu'
import Betslip from '@/components/betslip/Betslip.vue'
import PromotionalItem from '@/components/promotional/PromotionalItem'

export default {
  components: {
    SideMenu,
    Betslip,
    PromotionalItem,
  },
}
</script>
