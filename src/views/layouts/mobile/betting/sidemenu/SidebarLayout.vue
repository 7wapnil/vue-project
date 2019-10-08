<template>
  <sidebar
    :is-open="isSidebarOpen"
    close-trigger="sidemenu">
    <template #header>
      <logo-section/>
      <category-switch/>
    </template>
    <template #content>
      <mobile-sidemenu>
        <mobile-header-item/>
      </mobile-sidemenu>
    </template>
  </sidebar>
</template>

<script>
import Sidebar from './Sidebar'
import LogoSection from './LogoSection'
import CategorySwitch from './CategorySwitch'
import MobileHeaderItem from './sidemenu-list/MobileHeaderItem'
import MobileSidemenu from './sidemenu-list/MobileSidemenu'
import { mapGetters } from 'vuex'

export default {
  components: {
    LogoSection,
    CategorySwitch,
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
