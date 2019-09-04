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
import Sidebar from '@/views/layouts/mobile/sidemenu/Sidebar'
import LogoSection from '@/views/layouts/mobile/sidemenu/LogoSection'
import CategorySwitch from '@/views/layouts/mobile/sidemenu/CategorySwitch'
import MobileHeaderItem from '@/views/layouts/mobile/sidemenu/sidemenu-list/MobileHeaderItem'
import MobileSidemenu from '@/views/layouts/mobile/sidemenu/sidemenu-list/MobileSidemenu'
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
