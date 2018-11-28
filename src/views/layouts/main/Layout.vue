<template>
  <div>
    <b-container
      fluid
      class="p-0">
      <nav-bar/>
    </b-container>
    <b-container
      fluid
      style="max-width: 1440px"
      class="p-0">
      <b-row no-gutters>
        <b-col
          cols="12"
          md="3"
          style="max-width: 268px">
          <side-menu/>
        </b-col>
        <b-col
          style="max-width: 904px">
          <slot/>
        </b-col>
        <b-col
          cols="12"
          md="3"
          style="max-width: 268px">
          <promotional-item/>
          <betslip/>
        </b-col>
      </b-row>
    </b-container>
    <arc-footer/>
  </div>
</template>

<script>
import NavBar from './NavBar'
import SideMenu from './SideMenu'
import Betslip from '@/components/betslip/Betslip.vue'
import PromotionalItem from '@/components/promotional/PromotionalItem'
import ArcFooter from './ArcFooter'

export default {
  components: {
    SideMenu,
    NavBar,
    Betslip,
    PromotionalItem,
    ArcFooter
  }
}
</script>
