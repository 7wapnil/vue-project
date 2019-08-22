<template>
  <vue-scroll>
    <desktop-navigation-bar/>
    <b-container
      fluid
      class="desktop-container">
      <slot/>
    </b-container>
    <desktop-footer/>
  </vue-scroll>
</template>

<script>
import DesktopNavigationBar from '@/views/layouts/desktop/NavigationBar'
import DesktopFooter from './Footer'

export default {
  components: {
    DesktopNavigationBar,
    DesktopFooter
  }
}
</script>
