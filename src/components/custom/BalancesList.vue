<template>
    <b-nav-item-dropdown id="wallet-button"
                         v-if="activeWallet"
                         no-caret>
      <template slot="button-content" class="p-0">
        <small>
          <b>
            {{ displayAmount(activeWallet) }}
          </b>
        </small>
        <p class="m-0">
          <small>
            View my wallet
          </small>
        </p>
      </template>
        <b-dropdown-item extra-toggle-classes="yoyo"
                          v-for="wallet in inactiveWalletsList"
                         :key="wallet.currency.code"
                         @click.prevent="selectWallet(wallet)">
          {{ displayAmount(wallet) }}
        </b-dropdown-item>
    </b-nav-item-dropdown>
</template>

<script>
export default {
  computed: {
    inactiveWalletsList () {
      const wallets = this.$store.getters.getWallets
      return wallets.filter((wallet) => {
        return (wallet.id !== null && this.activeWallet.id !== wallet.id)
      })
    },
    wallets: function () {
      return this.$store.getters.getWallets
    },
    activeWallet: function () {
      return this.$store.getters.getActiveWallet
    }
  },
  created () {
    this.$store.dispatch('fetchWallets')
  },
  methods: {
    displayAmount (wallet) {
      return `${wallet.amount.toFixed(2)} ${wallet.currency.code}`
    },
    selectWallet (wallet) {
      this.$store.dispatch('changeActiveWallet', wallet.id)
    },
    refetchWallets () {
      this.$store.dispatch('fetchWallets', this.activeWallet)
    }
  }
}
</script>
<style>
  .yoyo {
    background-color: red;
  }
</style>
