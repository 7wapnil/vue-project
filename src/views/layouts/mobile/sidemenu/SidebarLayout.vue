<template>
  <sidebar
    :is-open="isSidebarOpen"
    close-trigger="sidemenu">
    <template #header>
      <logo-section/>
      <category-switch :link="isLink"/>
    </template>
    <template #content>
      <component :is="sidemenuContent"/>
    </template>
  </sidebar>
</template>

<script>
import Sidebar from '@/views/layouts/mobile/sidemenu/Sidebar'
import LogoSection from '@/views/layouts/mobile/sidemenu/LogoSection'
import CategorySwitch from '@/views/layouts/mobile/sidemenu/CategorySwitch'
import { mapGetters } from 'vuex'

export default {
  components: {
    LogoSection,
    CategorySwitch,
    Sidebar
  },
  data () {
    return {
      sidemenuMeta: ''
    }
  },
  computed: {
    ...mapGetters([
      'isSidebarOpen'
    ]),
    isLink () {
      return this.sidemenuMeta === 'info'
    },
    sidemenuContent () {
      if (this.sidemenuMeta === 'info') {
        return () => import('@/views/layouts/information-page/InfoPageSidemenu')
      } else {
        return () => import('@/views/layouts/mobile/sidemenu/sidemenu-list/MobileSidemenu')
      }
    }
  },
  watch: {
    '$route': {
      handler: function (to) {
        if (to.meta.sidemenu) {
          this.sidemenuMeta = to.meta.sidemenu
        } else {
          this.sidemenuMeta = ''
        }
      },
      immediate: true
    }
  },
}
</script>
