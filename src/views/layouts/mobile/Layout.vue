<template>
  <div>
    <mobile-navigation-bar
      @burger-clicked="toggleSidebar"/>
    <mobile-content class="mobile-container"/>
    <navigation-sidebar
      v-body-scroll-lock="isSidebarOpen"
      v-show="isSidebarOpen"
      :is-open="isSidebarOpen"
      @sidebar-close-requested="toggleSidebar"/>
    <betslip-button v-if="toggleBetslipButton"/>
    <mobile-footer/>
  </div>
</template>

<script>
import MobileNavigationBar from '@/views/layouts/mobile/NavigationBar'
import MobileFooter from '@/views/layouts/mobile/footer/Footer'
import NavigationSidebar from '@/views/layouts/mobile/sidemenu/NavigationSidebar'
import { mapGetters, mapMutations } from 'vuex'
import MobileContent from '@/views/layouts/mobile/Content'
import BetslipButton from '@/views/layouts/mobile/betslip/BetslipButton'

export default {
  components: {
    MobileNavigationBar,
    MobileFooter,
    NavigationSidebar,
    MobileContent,
    BetslipButton
  },
  data () {
    return {
      isBetslipButtonVisible: true
    }
  },
  computed: {
    ...mapGetters([
      'isSidebarOpen'
    ]),
    toggleBetslipButton() {
      return this.isBetslipButtonVisible && !this.isSidebarOpen
    }
  },
  mounted() {
    this.$root.$on('bv::modal::show', () => {
      return this.isBetslipButtonVisible = false
    })
    this.$root.$on('bv::modal::hide', () => {
      return this.isBetslipButtonVisible = true
    })
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
