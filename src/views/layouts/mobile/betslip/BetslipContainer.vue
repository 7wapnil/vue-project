<template>
  <sidebar
    v-show="isBetslipOpen"
    :is-open="isBetslipOpen"
    position="right"
    @sidebar-opened="showContent = true"
    @sidebar-closed="showContent = false">
    <template #content>
      <router-view
        v-if="showContent"
        name="right">
        <template #close>
          <close-button
            :is-open="isBetslipOpen"
            position="left"
            @close:sidebar="closeBetslip"/>
        </template>
      </router-view>
    </template>
  </sidebar>
</template>

<script>
import Sidebar from '../sidemenu/Sidebar'
import { mapGetters, mapMutations } from 'vuex'
import CloseButton from '../sidemenu/CloseButton'

export default {
  components: {
    Sidebar,
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
