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
            <b-col   class="mobile-navigation-sidemenu-list">
              <mobile-side-menu
                v-if="isSidebarOpen"
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
      menu: null,
      sticky: null,
      list: null,
      overlay: null,
      menuScrollY: null,
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
  updated: function () {
    this.$nextTick(() => {
      if (this.isSidebarOpen) {
        this.menu = document.querySelector('.mobile-navigation-sidemenu')
        this.sticky = document.querySelector('.mobile-navigation-sidemenu-sticky')
        this.list = document.querySelector('.mobile-navigation-sidemenu-list')
        this.overlay = document.querySelector('.mobile-navigation-sidemenu-overlay')
        this.addListeners()
      }
    })
  },
  methods: {
    closeSidemenu () {
      this.$emit('sidebar-close-requested')
      this.removeListeners()
    },
    addListeners () {
      document.addEventListener('touchstart', this.handleBodyTouchStart)
      document.addEventListener('touchmove', this.handleBodyTouchMove)
    },
    removeListeners () {
      document.removeEventListener('touchstart', this.handleBodyTouchStart)
      document.removeEventListener('touchmove', this.handleBodyTouchMove)
    },
    handleBodyTouchStart (event) {
      if (!this.menu.contains(event.target)) {
        this.closeSidemenu()
      }
      this.menuScrollY = event.touches[0].clientY
    },
    handleBodyTouchMove (event) {
      event.preventDefault()
      const menuScrollYChanged = event.touches[0].clientY;
      if (!this.menu.contains(event.target) ||
        (this.menu.scrollTop <= 0 && this.menuScrollY < menuScrollYChanged) ||
        ((this.menu.scrollTop >= this.sticky.offsetHeight + this.list.offsetHeight - this.overlay.offsetHeight) &&
          this.menuScrollY > menuScrollYChanged)) {
        event.preventDefault()
      }

      console.log('this.menu.scrollTop', this.menu.scrollTop)
      console.log('this.sticky.offsetHeight', this.sticky.offsetHeight)
      console.log('this.list.offsetHeight', this.list.offsetHeight)
      console.log('this.overlay.offsetHeight', this.overlay.offsetHeight)

     if (this.sticky.offsetHeight + this.list.offsetHeight <= this.overlay.offsetHeight) {
        console.log(event)
        console.log('hello duh')
        event.preventDefault()
     }

    },
    changeCategory (kind) {
      this.titleKind = kind
    },
    ...mapMutations([
      'changeSidebarKind'
    ])
  }
}
</script>
