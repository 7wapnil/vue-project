<template>
  <div>
    <overlay>
      <transition :name="sidebar.transition">
        <div
          v-if="isOpen"
          :class="sidebar.position"
          class="mobile-navigation-sidemenu">
          <div class="mobile-navigation-sidemenu-header">
            <slot name="header"/>
          </div>
          <b-row no-gutters>
            <b-col
              class="mobile-navigation-sidemenu-content"
              @click.stop>
              <slot name="content"/>
            </b-col>
          </b-row>
        </div>
      </transition>
    </overlay>
    <close-button
      v-if="closeTrigger.length"
      :position="sidebar.closeButtonPosition"
      :is-open="isOpen"
      @close:sidebar="closeSidebar"/>
  </div>
</template>
<script>
import CloseButton from '@/views/layouts/mobile/sidemenu/CloseButton'
import Overlay from '@/views/layouts/mobile/sidemenu/Overlay.vue'
import { mapMutations } from 'vuex'

export default {
  components: {
    CloseButton,
    Overlay
  },
  props: {
    position: {
      type: String,
      default: 'left'
    },
    isOpen: {
      type: Boolean,
      default: false
    },
    closeTrigger: {
      type: String,
      default: ''
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
  methods: {
    closeSidebar () {
      if (this.closeTrigger === 'betslip') {
        return this.toggleBetslip()
      }
      if (this.closeTrigger === 'sidemenu') {
        return this.toggleSidebar()
      }
    },
    ...mapMutations([
      'toggleSidebar'
    ]),
    ...mapMutations('betslip', [
      'toggleBetslip'
    ]),
  }
}
</script>
