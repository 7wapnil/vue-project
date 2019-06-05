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
    <mobile-footer/>
  </div>
</template>

<script>
import MobileNavigationBar from './NavigationBar'
import MobileFooter from './Footer/Footer'

export default {
  components: {
    MobileNavigationBar,
    MobileFooter
  },
  methods: {
    toggleNavigationSidebar () {
      console.log('burger-clicked')
    },
    toggleUserProfile () {
      console.log('user-profile-clicked')
    }
  }
}
</script>
