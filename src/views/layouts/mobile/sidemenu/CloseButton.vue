<template>
  <div
    :class="position === 'right' ? 'right-0' : 'left-0'"
    class="mobile-navigation-sidemenu-close-button"
    @click="$emit('sidemenu-closed')">
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
import { mapGetters } from 'vuex'

export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'right'
    }
  },
  computed: {
    ...mapGetters([
      'getSidebarKind'
    ])
  }
}
</script>
