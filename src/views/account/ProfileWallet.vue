<template>
  <b-row
    v-if="wallets"
    no-gutters>
    <b-col class="bg-arc-clr-soil-dark py-4 px-3">
      <b-row no-gutters>
        <b-col>
          <b-col class="p-0 text-uppercase text-arc-clr-iron font-size-xs letter-spacing-2">
            Balance
          </b-col>
          <div class="w-100"/>
          <b-col class="p-0">
            <span class="font-weight-bold text-arc-clr-white letter-spacing-2">
              {{ activeWallet.amount | round }}
            </span>
            <span class="font-weight-bold text-arc-clr-iron ml-1 letter-spacing-2">
              {{ activeWallet.currency.code }}
            </span>
          </b-col>
        </b-col>
        <b-col cols="auto">
          <b-button @click="$emit('open-deposit-tab')">
            Deposit
          </b-button>
        </b-col>
      </b-row>
      <b-row no-gutters>
        <b-col class="mt-4">
          <b-col class="p-0 text-uppercase text-arc-clr-iron font-size-xs letter-spacing-2">
            Crypto
          </b-col>
          <div class="w-100"/>
          <span
            v-for="(wallet, index) in inactiveWalletsList"
            :key="index">
            <span class="font-weight-bold text-arc-clr-white font-size-sm letter-spacing-0">
              {{ wallet.amount | round }}
            </span>
            <span class="font-weight-bold text-arc-clr-iron font-size-sm ml-1 letter-spacing-0">
              {{ wallet.currency.code }}
            </span>
          </span>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      wallet: () => {}
    }
  },
  computed: {
    ...mapGetters('wallets', [
      'wallets',
      'activeWallet'
    ]),
    inactiveWalletsList () {
      return this.wallets.filter((wallet) => {
        return (wallet.id !== null && wallet.currency.code === 'mBTC')
      })
    }
  }
}
</script>
