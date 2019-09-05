<template>
  <b-row
    v-if="activeWallet"
    no-gutters>
    <b-col class="bg-arc-clr-soil-dark py-4 px-3">
      <b-row
        no-gutters>
        <b-col>
          <b-col class="p-0 text-uppercase text-arc-clr-iron font-size-10 letter-spacing-2">
            {{ $t('wallet.balance') }}
          </b-col>
          <div class="w-100"/>
          <b-col class="p-0 mt-1">
            <span class="font-weight-bold text-arc-clr-white letter-spacing-2">
              {{ activeWallet.amount | round }}
            </span>
            <span class="font-weight-bold text-arc-clr-iron ml-1 letter-spacing-2">
              {{ activeWallet.currency.code }}
            </span>
          </b-col>
        </b-col>
        <b-col cols="auto">
          <b-button
            variant="user-profile-button"
            @click="$emit('open-account-deposit-tab')">
            {{ $t('account.cta.deposit') }}
          </b-button>
        </b-col>
      </b-row>
      <b-row
        v-if="inactiveWalletsList.length > 0"
        no-gutters>
        <b-col class="mt-2">
          <b-col
            class="p-0 mb-2 text-uppercase text-arc-clr-iron font-size-10 letter-spacing-2">
            {{ $t('wallet.secondWallet') }}
          </b-col>
          <div class="w-100"/>

          <b-nav
            vertical
            pills
            class="w-100">
            <b-nav-item
              v-for="(wallet, index) in inactiveWalletsList"
              :key="index"
              class="mobile-wallet-switch"
              @click.prevent="selectWallet(wallet)">
              <span class="font-weight-bold text-arc-clr-white font-size-12 letter-spacing-2">
                {{ wallet.amount | round }}
              </span>
              <span class="font-weight-bold text-arc-clr-iron font-size-12 ml-1 letter-spacing-2">
                {{ wallet.currency.code }}
              </span>
            </b-nav-item>
          </b-nav>

        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      wallet: () => {}
    }
  },
  computed: {
    ...mapGetters({
      wallets: 'getUserWallets',
      activeWallet: 'getUserActiveWallet'
    }),
    inactiveWalletsList () {
      return this.wallets.filter((wallet) => {
        return (wallet.id !== null && this.activeWallet.id !== wallet.id)
      })
    }
  },
  methods: {
    ...mapMutations([
      'setActiveWallet'
    ]),
    selectWallet (wallet) {
      this.setActiveWallet(wallet.id)
    }
  }
}
</script>
