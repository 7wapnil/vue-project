<template>
  <div>
    <transition name="mobile-navigation-sidemenu-open-animation">
      <div
        v-if="isOpen"
        class="mobile-navigation-sidemenu">
        <vue-scroll>
          <div class="mobile-navigation-sidemenu-sticky">
            <logo-section/>
            <category-switch @category-changed="changeCategory"/>
          </div>
          <b-row
            class="mobile-navigation-sidemenu-list-section"
            no-gutters>
            <b-col class="bg-arc-clr-soil-black sidemenu-mobile">
              <mobile-side-menu
                :title-kind="titleKind"
                :is-open="isOpen">
                <mobile-header-item @sidemenu-closed="$emit('sidebar-close-requested')"/>
              </mobile-side-menu>
            </b-col>
          </b-row>
        </vue-scroll>
      </div>
    </transition>
    <close-button
      :is-open="isOpen"
      :color="titleKind"
      position="right"
      @sidemenu-closed="$emit('sidebar-close-requested')"/>
    <overlay
      v-if="isOpen"
      @overlay-clicked="$emit('sidebar-close-requested')"/>
  </div>
</template>
<script>
import MobileSideMenu from '@/views/layouts/mobile/sidemenu/sidemenu-list/MobileSidemenu'
import MobileHeaderItem from '@/views/layouts/mobile/sidemenu/sidemenu-list/MobileHeaderItem'
import CloseButton from '@/views/layouts/mobile/sidemenu/CloseButton'
import LogoSection from '@/views/layouts/mobile/sidemenu/LogoSection'
import CategorySwitch from '@/views/layouts/mobile/sidemenu/CategorySwitch'
import Overlay from '@/components/custom/Overlay.vue'
import { mapMutations } from 'vuex'

export default {
  components: {
    MobileSideMenu,
    MobileHeaderItem,
    CloseButton,
    LogoSection,
    CategorySwitch,
    Overlay
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      titleKind: this.$route.params.titleKind
    }
  },
  created () {
    this.changeSidebarKind(this.$route.params.titleKind)
  },
  methods: {
    changeCategory (kind) {
      this.titleKind = kind
    },
    ...mapMutations([
      'changeSidebarKind'
    ])
  },
}
</script>
