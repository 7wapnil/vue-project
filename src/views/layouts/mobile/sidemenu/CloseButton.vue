<template>
  <div
    :class="position === 'right' ? 'right-0' : 'left-0'"
    class="mobile-navigation-sidemenu-close-button"
    @click.stop="$emit('close:sidebar')">
    <transition name="sidemenu-close-button">
      <div v-if="isOpen">
        <icon
          :color="closeIconColor[currentLobbyName]"
          name="betslip-close"
          size="20px"/>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    position: {
      type: String,
      default: 'right'
    },
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters([
      'getSidebarKind',
      'isSidebarOpen'
    ]),
    closeIconColor () {
      return {
        esports: 'arc-clr-esport-glow',
        sports: 'arc-clr-sport-glow',
        casino: 'arc-clr-casino-glow',
        'live-casino': 'arc-clr-live-casino-glow',
      }
    }
  },
  methods: {
    ...mapMutations([
      'toggleSidebar'
    ])
  }
}
</script>
