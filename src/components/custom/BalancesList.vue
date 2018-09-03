<template>
  <ul class="navbar-nav ml-auto">
    <li
      v-if="activeWallet"
      class="nav-item dropdown">
      <a
        id="wallets-dropdown"
        class="nav-link dropdown-toggle"
        href="#"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false">
        {{ displayAmount(activeWallet) }}
      </a>
      <div
        v-if="inactiveWalletsList.length"
        class="dropdown-menu">
        <a
          v-for="wallet in inactiveWalletsList"
          :key="wallet.currency.code"
          class="dropdown-item"
          href="#"
          @click.prevent="selectWallet(wallet)">
          {{ displayAmount(wallet) }}
        </a>
      </div>
    </li>
  </ul>
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
