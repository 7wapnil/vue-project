<template>
  <b-nav-item-dropdown
    v-if="activeWallet"
    id="nav-wallet-wrapper"
    no-caret>
    <template
      slot="button-content"
      class="p-0">
      <b-row no-gutters>
        <b-col>
          <b-row no-gutters>
            <b-col class="d-inline-flex pb-2">
              <small>
                <b>
                  {{ activeWallet.amount | round }}

                  <span class="currency-code">
                    {{ activeWallet.currency.code }}
                  </span>
                </b>
              </small>
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col
              cols="12"
              class="d-flex">
              <icon
                name="wallet-triangle-down"
                class="mr-2 d-flex justify-content-center align-items-center"
                size="6px"/>
              <small class="text-arc-clr-iron-light">
                View my wallet
              </small>
            </b-col>
          </b-row>
        </b-col>
        <b-col
          cols="auto"
          class="text-right ml-auto">
          <b-button
            variant="arc-secondary"
            class="wallet-button">
            <icon
              name="nav-wallet"
              size="24px"/>
          </b-button>
        </b-col>
      </b-row>
    </template>

    <div
      v-for="wallet in inactiveWalletsList"
      :key="wallet.currency.code">

      <b-dropdown-divider class="border-arc-dropdown-divider mx-3 my-0"/>

      <b-dropdown-item
        class="wallet-dropdown text-right px-3 py-2"
        @click.prevent="selectWallet(wallet)">
        <balance-amount :wallet="wallet"/>
      </b-dropdown-item>
    </div>

    <b-dropdown-divider class="border-arc-dropdown-divider my-0"/>

    <bonus-section/>

  </b-nav-item-dropdown>
</template>

<script>
import BalanceAmount from './BalanceAmount'
import BonusSection from './BonusSection'

export default {
  components: {
    BalanceAmount,
    BonusSection
  },
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
    selectWallet (wallet) {
      this.$store.dispatch('changeActiveWallet', wallet.id)
    },
    refetchWallets () {
      this.$store.dispatch('fetchWallets', this.activeWallet)
    }
  },
}
</script>
