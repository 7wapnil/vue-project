<template>
  <div>
    <desktop-navigation-bar/>
    <div class="desktop-container">
      <b-row no-gutters>
        <b-col
          v-if="$route.meta.components.left"
          class="bg-arc-clr-soil-black side-menu">
          <router-view name="left"/>
        </b-col>
        <b-col
          v-if="$route.meta.components.content"
          class="bg-arc-clr-soil-light">
          <router-view name="header">
            <router-view name="tabs"/>
          </router-view>
          <router-view name="content"/>
        </b-col>
        <b-col
          v-if="$route.meta.components.right"
          class="bg-arc-clr-soil-black betslip-block">
          <router-view name="right"/>
        </b-col>
      </b-row>
    </div>
    <desktop-footer/>
  </div>
</template>

<script>
import DesktopNavigationBar from './NavigationBar'
import DesktopFooter from './Footer'

export default {
  name: 'Layout',
  components: {
    DesktopNavigationBar,
    DesktopFooter
  }
}
</script>
