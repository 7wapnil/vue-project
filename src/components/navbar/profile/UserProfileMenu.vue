<template>
  <div
    v-if="isLoggedIn && user"
    style="padding: 0 14px"
    class="d-flex align-items-center justify-content-center">
    <b-button
      variant="arc-profile-button"
      @click="showModal"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getBalanceWithBonus } from '@/helpers/wallet'

export default {
  computed: {
    ...mapGetters([
      'isLoggedIn'
    ]),
    ...mapGetters({
      user: 'getUser',
      activeWallet: 'getUserActiveWallet'
    }),
    amount () {
      if (!this.activeWallet) return null
      return this.getBalanceWithBonus(this.activeWallet, this.currentLobbySection)
    },
    currencyCode () {
      return this.activeWallet && this.activeWallet.currency.code
    },
  },
  methods: {
    showModal () {
      this.$bvModal.show('AccountModal')
    },
    getBalanceWithBonus
  }
}
</script>
