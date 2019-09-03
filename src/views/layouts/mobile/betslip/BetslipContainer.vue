<template>
  <div v-show="isBetslipOpen">
    <transition name="mobile-betslip-open-animation">
      <div
        v-if="isBetslipOpen"
        class="mobile-navigation-sidemenu bg-arc-clr-soil-black right-0 overflowed-y">
        <betslip/>
      </div>
    </transition>
    <close-button
      :is-open="isBetslipOpen"
      :color="titleKind"
      position="left"
      @sidemenu-closed="toggleBetslip"/>
    <overlay
      v-if="isBetslipOpen"
      @overlay-clicked="toggleBetslip"/>
  </div>
</template>

<script>
import Overlay from '@/views/layouts/mobile/sidemenu/Overlay'
import CloseButton from '@/views/layouts/mobile/sidemenu/CloseButton'
import Betslip from '@/components/betslip/Betslip'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    CloseButton,
    Overlay,
    Betslip
  },
  data () {
    return {
      titleKind: this.$route.params.titleKind
    }
  },
  computed: {
    ...mapGetters('betslip', [
      'isBetslipOpen'
    ])
  },
  methods: {
    ...mapMutations('betslip', [
      'toggleBetslip'
    ])
  }
}
</script>
