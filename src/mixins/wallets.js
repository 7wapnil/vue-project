import WalletsService from '@/services/api/wallets'

export default {
  computed: {
    wallets: function () {
      return this.$store.getters.getWallets
    },
    activeWallet: function () {
      return this.$store.getters.getActiveWallet
    }
  },
  methods: {
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
        `).then(data => {
        this.$store.commit('storeWallets', data.data.wallets)
      } )
    }
  }
}
