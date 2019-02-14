<template>
  <b-row no-gutters>
    <b-col
      class="d-none d-lg-block bg-arc-clr-soil-black"
      style="max-width: 268px"/>
    <b-col class="bg-arc-clr-soil-light">

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

export default {
  components: {
    Betslip,
    PromotionalItem
  }
}
</script>
