<template>
  <div>
    <mobile-navigation-bar @burger-clicked="toggleSidebar"/>
    <div class="mobile-container">
      <router-view name="header">
        <router-view name="tabs"/>
      </router-view>
      <router-view
        name="content"/>
    </div>
    <navigation-sidebar v-show="isSidebarOpen"/>
    <betslip-button/>
    <betslip-container/>
    <mobile-footer/>
  </div>
</template>

<script>
import MobileNavigationBar from './NavigationBar'
import MobileFooter from '@/views/layouts/mobile/footer/Footer'
import NavigationSidebar from './sidemenu/SidebarLayout'
import { mapGetters, mapMutations } from 'vuex'
import BetslipButton from './betslip/BetslipButton'
import BetslipContainer from './betslip/BetslipContainer'

export default {
  components: {
    MobileNavigationBar,
    MobileFooter,
    NavigationSidebar,
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
