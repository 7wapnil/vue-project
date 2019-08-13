<template>
  <div>
    <overlay>
      <transition name="mobile-navigation-sidemenu-open-animation">
        <div
          v-if="isSidebarOpen"
          class="mobile-navigation-sidemenu">
          <div class="mobile-navigation-sidemenu-sticky">
            <logo-section/>
            <category-switch @category-changed="changeCategory"/>
          </div>
          <b-row no-gutters>
            <b-col v-body-scroll-lock="isSidebarOpen"
                   class="mobile-navigation-sidemenu-list">
              <mobile-side-menu v-if="isSidebarOpen"
                                :title-kind="titleKind">
                <mobile-header-item @sidemenu-closed="$emit('sidebar-close-requested')"/>
              </mobile-side-menu>
            </b-col>
          </b-row>
        </div>
      </transition>
    </overlay>
    <close-button
      :is-open="isSidebarOpen"
      :color="titleKind"
      position="right"
      @sidemenu-closed="closeSidemenu"/>
  </div>
</template>
<script>
import MobileSideMenu from '@/views/layouts/mobile/sidemenu/sidemenu-list/MobileSidemenu'
import MobileHeaderItem from '@/views/layouts/mobile/sidemenu/sidemenu-list/MobileHeaderItem'
import CloseButton from '@/views/layouts/mobile/sidemenu/CloseButton'
import LogoSection from '@/views/layouts/mobile/sidemenu/LogoSection'
import CategorySwitch from '@/views/layouts/mobile/sidemenu/CategorySwitch'
import Overlay from '@/components/custom/Overlay.vue'
import { mapMutations, mapGetters } from 'vuex'

export default {
  components: {
    MobileSideMenu,
    MobileHeaderItem,
    CloseButton,
    LogoSection,
    CategorySwitch,
    Overlay
  },
  data () {
    return {
      titleKind: this.$route.params.titleKind,
    }
  },
  created () {
    this.changeSidebarKind(this.$route.params.titleKind)
  },
  computed: {
    ...mapGetters([
      'isSidebarOpen'
    ]),
  },
  methods: {
    closeSidemenu() {
      this.$emit('sidebar-close-requested')
    },
    changeCategory (kind) {
      this.titleKind = kind
    },
    ...mapMutations([
      'changeSidebarKind'
    ])
  },
}
</script>
