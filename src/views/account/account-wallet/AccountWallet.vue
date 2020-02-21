<template>
  <b-row
    v-if="activeWallet"
    no-gutters>
    <account-wallet-mobile
      v-if="isMobile"
      :active-bonuses-list="activeBonusesList"
      :currency-code="currencyCode"
      :real-money="realMoney"
      :casino-money="casinoMoney"
      :sport-money="sportMoney"
      :current-tab-index="currentTabIndex"
      :inactive-wallets-list="inactiveWalletsList"
      :select-wallet="selectWallet"
      @open-account-deposit-tab="$emit('open-account-deposit-tab')"
    />
    <account-wallet-desktop
      v-else
      :active-bonuses-list="activeBonusesList"
      :is-game-page="isGamePage"
      :active-wallet="activeWallet"
      :current-tab-index="currentTabIndex"
      :inactive-wallets-list="inactiveWalletsList"
      :select-wallet="selectWallet"
    />
  </b-row>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import BalancesList from '@/components/navbar/wallet/BalancesList'
import AccountWalletMobile from '@/views/account/account-wallet/AccountWalletMobile'
import AccountWalletDesktop from '@/views/account/account-wallet/AccountWalletDesktop'
import { getBalanceWithBonus } from '@/helpers/wallet'

export default {
  components: {
    AccountWalletMobile,
    AccountWalletDesktop
  },
  extends: BalancesList,
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
    ...mapGetters('tabs', {
      currentTabIndex: 'getCurrentTabIndex'
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
    },
    getBalanceWithBonus
  }
}
</script>
