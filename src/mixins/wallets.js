export default {
  created () {
    this.$store.dispatch('fetchWallets')
  },
  computed: {
    wallets: function () {
      return this.$store.getters.getWallets
    },
    activeWallet: function () {
      return this.$store.getters.getActiveWallet
    }
  },
  methods: {
    refetchWallets () {
      this.$store.dispatch('fetchWallets', this.activeWallet)
    }
  }
}
