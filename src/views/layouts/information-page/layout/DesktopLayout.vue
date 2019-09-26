<template>
  <div>
    <desktop-navigation-bar/>
    <b-row no-gutters>
      <b-col class="bg-arc-clr-soil-darker side-menu">
        <info-page-sidemenu/>
      </b-col>
      <b-col class="bg-arc-clr-soil-light min-vh-100">
        <slot/>
      </b-col>
      <b-col class="bg-arc-clr-soil-black betslip-block">
        <promotional-item/>
        <betslip/>
      </b-col>
    </b-row>
    <desktop-footer/>
  </div>
</template>
<script>
import Betslip from '@/components/betslip/Betslip.vue'
import PromotionalItem from '@/components/promotional/PromotionalItem'
import InfoPageSidemenu from '@/views/layouts/information-page/InfoPageSidemenu'
import DesktopNavigationBar from '@/views/layouts/desktop/NavigationBar'
import DesktopFooter from '@/views/layouts/desktop/Footer'

export default {
  components: {
    InfoPageSidemenu,
    Betslip,
    PromotionalItem,
    DesktopNavigationBar,
    DesktopFooter
  }
}
</script>
