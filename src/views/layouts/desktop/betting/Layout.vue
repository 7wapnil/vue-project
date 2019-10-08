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
import DesktopNavigationBar from '../NavigationBar'
import DesktopFooter from '../Footer'

export default {
  components: {
    DesktopNavigationBar,
    DesktopFooter
  }
}
</script>
