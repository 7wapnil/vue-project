<template>
  <div>
    <desktop-navigation-bar/>
    <b-container
      fluid
      class="desktop-container">
      <router-view :key="$route.fullPath"/>
    </b-container>
    <desktop-footer/>
  </div>
</template>

<script>
import DesktopNavigationBar from '@/views/layouts/desktop/NavigationBar'
import DesktopFooter from '@/views/layouts/desktop/Footer'

export default {
  components: {
    DesktopNavigationBar,
    DesktopFooter
  }
}
</script>
