<template>
  <div>
    <div
      v-if="isOpen"
      class="mobile-navigation-sidemenu-overlay"/>
    <transition name="mobile-navigation-sidemenu-open-animation">
      <div
        v-if="isOpen"
        class="mobile-navigation-sidemenu">

        <div class="mobile-navigation-sidemenu-sticky">
          <logo-section/>
          <category-switch @category-changed="changeCategory"/>
        </div>

        <b-row
          class="mobile-navigation-sidemenu-list-section"
          no-gutters>
          <b-col class="bg-arc-clr-soil-black sidemenu-mobile">

            <mobile-side-menu :title-kind="titleKind">
              <template v-slot:header>
                <mobile-header/>
              </template>
            </mobile-side-menu>

          </b-col>
        </b-row>
      </div>
    </transition>
    <close-button
      :is-open="isOpen"
      :color="titleKind"
      @sidemenu-closed="$emit('sidebar-close-button-clicked')"/>
  </div>
</template>
<script>
import MobileSideMenu from '@/views/layouts/mobile/sidemenu/sidemenu-list/MobileSidemenu'
import MobileHeader from '@/views/layouts/mobile/sidemenu/sidemenu-list/MobileHeader'
import CloseButton from '@/views/layouts/mobile/sidemenu/CloseButton'
import LogoSection from '@/views/layouts/mobile/sidemenu/LogoSection'
import CategorySwitch from '@/views/layouts/mobile/sidemenu/CategorySwitch'
import { mapMutations } from 'vuex'

export default {
  components: {
    MobileSideMenu,
    MobileHeader,
    CloseButton,
    LogoSection,
    CategorySwitch
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
