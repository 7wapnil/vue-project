<template>
  <div>
    <overlay v-scroll-lock="isSidebarOpen">
      <transition :name="sidebar.transition">
        <div v-if="isSidebarOpen"
             :class="sidebar.position"
             class="mobile-navigation-sidemenu">
          <div class="mobile-navigation-sidemenu-header">
            <slot name="header"/>
          </div>
          <b-row no-gutters>
            <b-col @click.stop
                   class="mobile-navigation-sidemenu-content">
              <slot name="content"/>
            </b-col>
          </b-row>
        </div>
      </transition>
    </overlay>
    <close-button :position="sidebar.closeButtonPosition"/>
  </div>
</template>
<script>
import CloseButton from '@/views/layouts/mobile/sidemenu/CloseButton'
import Overlay from '@/views/layouts/mobile/sidemenu/Overlay.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    CloseButton,
    Overlay
  },
  props: {
    position: {
      type: String,
      default: 'left'
    }
  },
  data () {
    return {
      sidebar: {
        transition: this.position === 'right' ? 'mobile-sidemenu-slide-left' : 'mobile-sidemenu-slide-right',
        position: this.position === 'right' ? 'right-0' : 'left-0',
        closeButtonPosition: this.position === 'right' ? 'left' : 'right'
      }
    }
  },
  computed: {
    ...mapGetters([
      'isSidebarOpen'
    ])
  }
}
</script>
