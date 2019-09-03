<template>
  <sidebar
    v-show="isBetslipOpen"
    :is-open="isBetslipOpen"
    position="right">
    <template #content>
      <betslip>
        <template #close>
          <close-button
            :is-open="isBetslipOpen"
            position="left"
            @close:sidebar="closeBetslip"/>
        </template>
      </betslip>
    </template>
  </sidebar>
</template>

<script>
import Sidebar from '@/views/layouts/mobile/sidemenu/Sidebar'
import Betslip from '@/components/betslip/Betslip'
import { mapGetters, mapMutations } from 'vuex'
import CloseButton from '@/views/layouts/mobile/sidemenu/CloseButton'

export default {
  components: {
    Sidebar,
    Betslip,
    CloseButton
  },
  computed: {
    ...mapGetters('betslip', [
      'isBetslipOpen'
    ])
  },
  methods: {
    ...mapMutations('betslip', [
      'toggleBetslip'
    ]),
    closeBetslip () {
      this.toggleBetslip()
    }
  }
}
</script>
