<template>
  <div>
    <mobile-navigation-bar/>
    <b-container
      fluid
      class="mobile-container d-flex align-items-center justify-content-center">
      I'm a mobile version
    </b-container>
  </div>
</template>

<script>
import MobileNavigationBar from './NavigationBar'

export default {
  components: {
    MobileNavigationBar
  }
}
</script>
