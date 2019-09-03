<template>
  <div
    :class="position === 'right' ? 'right-0' : 'left-0'"
    class="mobile-navigation-sidemenu-close-button"
    @click.stop="$emit('close:sidebar')">
    <transition name="sidemenu-close-button">
      <div v-if="isOpen">
        <icon
          :color="getSidebarKind === 'esports' ? 'arc-clr-esport-glow' : 'arc-clr-sport-glow'"
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
    ])
  },
  methods: {
    ...mapMutations([
      'toggleSidebar'
    ])
  }
}
</script>
