<template>
  <div>
    <mobile-navigation-bar
      @burger-clicked="toggleSidebar"
      @user-profile-clicked="toggleUserProfile"/>
    <mobile-content>
      <slot/>
    </mobile-content>
    <navigation-sidebar
      v-body-scroll-lock="isSidebarOpen"
      v-show="isSidebarOpen"
      :is-open="isSidebarOpen"
      @sidebar-close-requested="toggleSidebar"/>
    <mobile-footer/>
  </div>
</template>

<script>
import MobileNavigationBar from './NavigationBar'
import MobileFooter from './footer/Footer'
import NavigationSidebar from '@/views/layouts/mobile/sidemenu/NavigationSidebar'
import { mapGetters, mapMutations } from 'vuex'
import MobileContent from '@/views/layouts/mobile/Content'

export default {
  components: {
    MobileNavigationBar,
    MobileFooter,
    NavigationSidebar,
    MobileContent
  },
  data () {
    return {
      isNavigationShown: false,
      isProfileShown: false
    }
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
  methods: {
    ...mapMutations([
      'toggleSidebar'
    ]),
    toggleUserProfile () {
      console.log('user-profile-clicked')
    }
  }
}
</script>
