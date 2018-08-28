import WalletsService from '@/services/api/wallets'

export default {
  created(){
    this.loadWallets()
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
    // This method is here because vuex + apollo are not automatically in sync
    // and that leads to architecture issues.

    // Vuex assumption is that data updates are managed on store level, whereas
    // Apollo forces data manipulations inside components.
    refetchWallets() {
      this.$apollo.queries.wallets.refetch().then((response) => {
        const wallets = response.data.wallets
        this.$store.commit(
          'storeWallets',
          { wallets, activeWallet: this.activeWallet }
        )
      })
    },
    getWalletsService(){
      return new WalletsService(this)
    },
    loadWallets() {
      const service = this.getWalletsService()
      service.loadList(`
        id
        amount
        currency {
          code
          id
        }
        `).then((response) => {
          const wallets = response.data.wallets
          this.$store.commit('storeWallets', { wallets, activeWallet: wallets[0] })
      } )
    }
  }
}
