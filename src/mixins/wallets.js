import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('wallets', ['wallets', 'activeWallet'])
  },
  methods: {
    ...mapActions('wallets', ['refetchWallets'])
  }
}
