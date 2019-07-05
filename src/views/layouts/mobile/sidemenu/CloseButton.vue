<template>
  <div
    v-if="isOpen"
    class="mobile-navigation-sidemenu-close-button"
    @click="$emit('sidemenu-closed')">
    <icon
      :color="getSidebarKind === 'esports' ? 'arc-clr-esport-glow' : 'arc-clr-sport-glow'"
      name="betslip-close"
      size="20px"/>
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
