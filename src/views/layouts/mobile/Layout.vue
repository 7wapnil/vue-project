<template>
  <div>
    <mobile-navigation-bar
      :has-login-block="hasLoginBlock"
      @burger-clicked="toggleSidebar"/>
    <div class="mobile-container">
      <router-view
        name="header"
        @auth-block:changed:visibility="changeLoginVisibility">
        <router-view name="tabs"/>
      </router-view>
      <router-view
        name="content"
        @auth-block:changed:visibility="changeLoginVisibility"/>
    </div>
    <navigation-sidebar v-show="isSidebarOpen"/>
    <betslip-button/>
    <betslip-container/>
    <mobile-footer/>
    <footer-nav-bar/>
  </div>
</template>

<script>
import MobileNavigationBar from './NavigationBar'
import MobileFooter from '@/views/layouts/mobile/footer/Footer'
import NavigationSidebar from './sidemenu/SidebarLayout'
import { mapGetters, mapMutations } from 'vuex'
import BetslipButton from './betslip/BetslipButton'
import BetslipContainer from './betslip/BetslipContainer'
import FooterNavBar from '@/views/layouts/mobile/FooterNavBar'

export default {
  components: {
    MobileNavigationBar,
    MobileFooter,
    NavigationSidebar,
    BetslipButton,
    BetslipContainer,
    FooterNavBar
  },
  data () {
    return {
      hasLoginBlock: false
    }
  },
  computed: {
    ...mapGetters([
      'isSidebarOpen'
    ])
  },
  watch: {
    $route () {
      if (this.isSidebarOpen) {
        return this.toggleSidebar()
      }
    }
  },
  methods: {
    ...mapMutations([
      'toggleSidebar'
    ]),
    changeLoginVisibility (isVisible) {
      this.hasLoginBlock = isVisible
    }
  }
}
</script>
