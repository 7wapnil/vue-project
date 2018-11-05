<template>
  <div>
  <b-container fluid class="p-0">
    <nav-bar/>
  </b-container>
    <b-container class="p-0"
                 style="max-width: 1440px">
      <b-row class="m-0">
        <b-col cols="12"
               md="12"
               lg="3"
               style="max-width: 268px"
               class="p-0">
          <side-menu/>
        </b-col>
        <b-col cols="12"
               md="12"
               lg="8"
               style="max-width: 904px"
               class="p-0">
          <slot/>
        </b-col>
        <b-col cols="12"
               md="12"
               lg="3"
               style="max-width: 268px"
               class="p-0">
          <promotional-item/>
          <betslip/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import NavBar from './NavBar'
import SideMenu from './SideMenu'
import Betslip from '@/components/betslip/Betslip.vue'
import PromotionalItem from '@/components/promotional/PromotionalItem'

export default {
  components: {
    SideMenu,
    NavBar,
    Betslip,
    PromotionalItem
  }
}
</script>
