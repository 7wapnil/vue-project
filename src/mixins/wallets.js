export default {
  created() {
    this.$store.dispatch('loadWallets', this)
  },
  computed: {
    wallets: function () {
      return this.$store.getters.getWallets
    },
    activeWallet: function () {
      return this.$store.getters.getActiveWallet
    }
  }
}
