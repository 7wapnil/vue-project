<template>
  <div>
    <desktop-navigation-bar/>
    <b-container
      fluid
      class="desktop-container">
      <slot/>
    </b-container>
    <desktop-footer/>
  </div>
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
