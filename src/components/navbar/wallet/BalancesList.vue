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
                  {{ activeWallet.amount | fix }}

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
              class="d-flex ">
                <icon name="triangle-down"
                      class="mt-1 mr-2"
                      size="6px"/>
              <small>
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
            <i class="arc arc-nav-wallet"/>
          </b-button>
        </b-col>
      </b-row>
    </template>

    <b-dropdown-divider class="mx-3 my-0"/>

    <b-dropdown-item
      v-for="wallet in inactiveWalletsList"
      :key="wallet.currency.code"
      class="wallet-dropdown text-right px-3 py-2"
      @click.prevent="selectWallet(wallet)">

      <balance-amount :wallet="wallet"/>

    </b-dropdown-item>

    <b-dropdown-divider class="my-0"/>

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
  filters: {
    fix: (value) => {
      return value.toFixed(2)
    }
  },
  data () {
    return {
      menuOpened: false
    }
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
