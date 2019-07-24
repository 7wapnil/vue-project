<template>
  <div
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
    }
  },
  computed: {
    ...mapGetters([
      'getSidebarKind'
    ])
  }
}
</script>
