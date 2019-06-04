<template>
  <div>
    <mobile-navigation-bar/>
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
  }
}
</script>
