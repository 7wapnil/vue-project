<template>
  <sidebar
    v-show="isBetslipOpen"
    :is-open="isBetslipOpen"
    position="right"
    @sidebar-opened="showContent = true"
    @sidebar-closed="showContent = false">
    <template #content>
      <betslip v-if="showContent">
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
import Sidebar from '../sidemenu/Sidebar'
import Betslip from '@/components/betslip/Betslip'
import { mapGetters, mapMutations } from 'vuex'
import CloseButton from '../sidemenu/CloseButton'

export default {
  components: {
    Sidebar,
    Betslip,
    CloseButton
  },
  data () {
    return {
      showContent: false
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
    ]),
    closeBetslip () {
      this.toggleBetslip()
    }
  }
}
</script>
