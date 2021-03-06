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
              <span
                :class="balancePlaceholderColor"
                class="font-weight-bold font-size-12 letter-spacing-2">
                {{ activeBonusesList }}
                <span
                  v-if="!isGamePage"
                  class="currency-code">
                  {{ activeWallet.currency.code }}
                </span>
              </span>
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col
              cols="12"
              class="d-flex">
              <icon
                v-if="!isGamePage"
                name="wallet-triangle-down"
                class="mr-2 d-flex justify-content-center align-items-center"
                size="6px"/>
              <span class="text-arc-clr-iron-light font-size-12 letter-spacing-2">
                {{ walletDescription }}
              </span>
            </b-col>
          </b-row>
        </b-col>
        <b-col
          cols="auto"
          class="text-right ml-auto">
          <b-button
            variant="arc-secondary"
            class="wallet-button"
            @click.stop="goToDepositPage">
            <icon
              name="nav-wallet"
              size="24px"/>
          </b-button>
        </b-col>
      </b-row>
    </template>

    <b-dropdown-divider class="border-arc-dropdown-divider my-0"/>

    <balance-amounts
      :currency-code="currencyCode"
      :real-money="realMoney"
      :sport-money="sportMoney"
      :casino-money="casinoMoney"
    />

    <b-dropdown-divider class="border-arc-dropdown-divider my-0"/>

    <template v-if="inactiveWalletsList.length">
      <div
        v-for="wallet in inactiveWalletsList"
        :key="wallet.id">

        <b-dropdown-divider class="border-arc-dropdown-divider mx-3 my-0"/>

        <b-dropdown-item
          class="text-right wallet-button-menu-item"
          @click.prevent="selectWallet(wallet)">
          <b-row no-gutters>
            <b-col class="pr-2">
              <span class="font-weight-bold font-size-12 letter-spacing-2">
                {{ getBalanceWithBonus(wallet, currentLobbySection) }}
              </span>
              <span class="currency-code font-weight-bold font-size-12 letter-spacing-2">
                {{ wallet.currency.code }}
              </span>
            </b-col>
            <b-col class="text-right">
              <span class="font-size-12 letter-spacing-2 d-inline-flex align-items-center justify-content-end ml-2 text-arc-clr-white">
                {{ $t('wallet.switch') }}
                <icon
                  name="chevron-right"
                  class="ml-1"
                  color="arc-clr-white"
                  size="10px"/>
              </span>
            </b-col>
          </b-row>
        </b-dropdown-item>
      </div>
    </template>

    <b-dropdown-divider class="border-arc-dropdown-divider my-0"/>

    <bonus-section/>

  </b-nav-item-dropdown>
</template>

<script>
import BonusSection from './BonusSection'
import BalanceAmounts from '@/components/navbar/wallet/BalanceAmounts'
import { mapGetters, mapMutations } from 'vuex'
import { getBalanceWithBonus } from '@/helpers/wallet'

export default {
  components: {
    BonusSection,
    BalanceAmounts
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
    },
    walletDescription () {
      return this.isGamePage ? this.$i18n.t('casino.seeInGame') : this.$i18n.t('casino.viewMyWallet')
    },
    isGamePage () {
      return this.$route.name === 'casino-game' || this.$route.name === 'live-casino-game'
    },
    balancePlaceholderColor () {
      if (this.isGamePage) {
        return this.currentLobbyName === 'casino' ? 'text-arc-clr-casino-glow' : 'text-arc-clr-live-casino-glow'
      }
    },
    activeBonusesList () {
      if (this.isGamePage) return this.$i18n.t('casino.seeInGame')
      return this.getBalanceWithBonus(this.activeWallet, this.currentLobbySection)
    },
    currencyCode () {
      return this.activeWallet.currency.code
    },
    realMoney () {
      return this.activeWallet.realMoneyBalance || 0
    },
    sportMoney () {
      if (!this.activeWallet.userBonus || !this.activeWallet.userBonus.sportsbook) return 0
      return this.activeWallet.bonusBalance || 0
    },
    casinoMoney () {
      if (!this.activeWallet.userBonus || !this.activeWallet.userBonus.casino) return 0
      return this.activeWallet.bonusBalance || 0
    }
  },
  methods: {
    ...mapMutations({ setActiveWallet: 'setActiveWallet' }),
    ...mapMutations('tabs', {
      changeTabIndex: 'changeTabIndex'
    }),
    selectWallet (wallet) {
      this.setActiveWallet(wallet.id)
    },
    goToDepositPage () {
      this.changeTabIndex(3)
      this.$bvModal.show('AccountModal')
    },
    getBalanceWithBonus
  },
}
</script>
