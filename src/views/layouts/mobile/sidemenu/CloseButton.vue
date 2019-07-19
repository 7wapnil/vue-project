<template>
  <div
    class="mobile-navigation-sidemenu-close-button"
    @click="$emit('sidemenu-closed')">
    <transition name="bounce">
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

<style scoped>
  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
