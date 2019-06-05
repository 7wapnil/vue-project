<template>
  <div>
    <mobile-navigation-bar
      @burger-clicked="toggleNavigationSidebar"
      @user-profile-clicked="toggleUserProfile"/>
    <b-container
      fluid
      class="mobile-container d-flex align-items-center justify-content-center">
      I'm a mobile version
    </b-container>
    <navigation-sidebar
      v-if="isNavigationShown"
      class="bg-arc-clr-soil-dark"/>
    <mobile-footer/>
  </div>
</template>

<script>
import MobileNavigationBar from './NavigationBar'
import MobileFooter from './Footer/Footer'
import NavigationSidebar from '@/mobile/components/NavigationSidebar'

export default {
  components: {
    MobileNavigationBar,
    MobileFooter,
    NavigationSidebar
  },
  data () {
    return {
      isNavigationShown: false,
      isProfileShown: false
    }
  },
  methods: {
    toggleNavigationSidebar () {
      this.isNavigationShown = !this.isNavigationShown
    },
    toggleUserProfile () {
      console.log('user-profile-clicked')
    }
  }
}
</script>
