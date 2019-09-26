<template>
  <div>
    <mobile-navigation-bar/>
    <mobile-content/>
    <mobile-footer/>
  </div>
</template>

<script>
import MobileNavigationBar from '@/views/layouts/mobile/NavigationBar'
import MobileFooter from '@/views/layouts/mobile/footer/Footer'
import NavigationSidebar from '@/views/layouts/mobile/sidemenu/SidebarLayout'
import { mapGetters, mapMutations } from 'vuex'
import MobileContent from '@/views/layouts/mobile/Content'

export default {
  components: {
    MobileNavigationBar,
    MobileFooter,
    NavigationSidebar,
    MobileContent
  },
  computed: {
    ...mapGetters([
      'isSidebarOpen'
    ])
  },
  watch: {
    $route (to, from) {
      if (this.isSidebarOpen) {
        return this.toggleSidebar()
      }
    }
  },
  created () {
    console.log('layout loaded')
  },
  methods: {
    ...mapMutations([
      'toggleSidebar'
    ])
  }
}
</script>
