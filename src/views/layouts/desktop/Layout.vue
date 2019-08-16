<template>
  <div>
    <desktop-navigation-bar/>
    <vue-scroll>
      <b-container
        fluid
        class="desktop-container">
        <slot/>
      </b-container>
      <desktop-footer/>
    </vue-scroll>
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
