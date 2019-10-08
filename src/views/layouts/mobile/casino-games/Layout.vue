<template>
  <div>
    <mobile-navigation-bar @burger-clicked="toggleSidebar"/>
    <mobile-content class="mobile-container"/>
    <navigation-sidebar v-show="isSidebarOpen"/>
    <betslip-button/>
    <betslip-container/>
    <mobile-footer/>
  </div>
</template>

<script>
import MobileNavigationBar from './NavigationBar'
import MobileFooter from '../footer/Footer'
import NavigationSidebar from './sidemenu/SidebarLayout'
import { mapGetters, mapMutations } from 'vuex'
import MobileContent from './Content'
import BetslipButton from './betslip/BetslipButton'
import BetslipContainer from './betslip/BetslipContainer'

export default {
  components: {
    MobileNavigationBar,
    MobileFooter,
    NavigationSidebar,
    MobileContent,
    BetslipButton,
    BetslipContainer
  },
  computed: {
    ...mapGetters([
      'isSidebarOpen'
    ])
  },
  watch: {
    $route (to, from) {
      if (this.isSidebarOpen) {
        return this.toggleSidebar()
      }
    }
  },
  methods: {
    ...mapMutations([
      'toggleSidebar'
    ])
  }
}
</script>
