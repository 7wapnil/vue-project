<template>
  <sidebar
    :is-open="isSidebarOpen"
    close-trigger="sidemenu">
    <template #header>
      <logo-section/>
    </template>
    <template #content>
      <router-view name="mobileSidemenu"/>
    </template>
  </sidebar>
</template>

<script>
import Sidebar from './Sidebar'
import LogoSection from './LogoSection'
import MobileHeaderItem from './sidemenu-list/MobileHeaderItem'
import MobileSidemenu from './sidemenu-list/MobileSidemenu'
import { mapGetters } from 'vuex'

export default {
  components: {
    LogoSection,
    MobileSidemenu,
    MobileHeaderItem,
    Sidebar
  },
  computed: {
    ...mapGetters([
      'isSidebarOpen'
    ])
  }
}
</script>
