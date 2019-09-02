<template>
  <div>
    <desktop-navigation-bar/>

    <div class="desktop-container">
      <slot/>
    </div>

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
