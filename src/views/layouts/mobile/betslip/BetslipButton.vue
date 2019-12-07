<template>
  <transition name="betslip-button">
    <div
      v-if="hideBetslipButton"
      class="betslip-mobile-button-wrapper m-4 text-center"
      @click.stop="toggleBetslip">
      <arc-circle
        :size="24"
        inline
        depends
        bg-color="arc-clr-soil-cover">
        <span class="bet-amount font-weight-bold font-size-12 letter-spacing-2">
          {{ getBetsCount }}
        </span>
      </arc-circle>
      <b-button
        variant="arc-betslip-mobile"
        class="position-absolute bottom-0">
        {{ $t('betslip.mobileButton') }}
      </b-button>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      isProfileOpen: true
    }
  },
  computed: {
    ...mapGetters('betslip', [
      'getBetsCount',
      'isBetslipOpen'
    ]),
    ...mapGetters([
      'isSidebarOpen'
    ]),
    hideBetslipButton () {
      return this.isProfileOpen &&
            !this.isSidebarOpen &&
            this.getBetsCount > 0 &&
            !this.isBetslipOpen &&
            this.isBetslipSupportedPage
    },
    isBetslipSupportedPage () {
      return this.$route.params.titleKind === 'sports' ||
               this.$route.params.titleKind === 'esports'
    }
  },
  mounted () {
    this.$root.$on('bv::modal::show', () => {
      this.isProfileOpen = false
    })
    this.$root.$on('bv::modal::hide', () => {
      this.isProfileOpen = true
    })
  },
  methods: {
    ...mapMutations('betslip', [
      'toggleBetslip'
    ])
  }
}
</script>
