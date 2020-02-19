<template>
  <div class="w-100">
    <div
      class="bg-arc-clr-soil-dark py-4 px-3 w-100">
      <b-row
        no-gutters>
        <div class="text-uppercase text-arc-clr-iron letter-spacing-2 col-left">
          <div>{{ $t('wallet.totalBalance') }}</div>
          <div class="mt-1 font-size-10 text-right left-copy">{{ $t('wallet.realMoney') }}</div>
          <div class="font-size-10 text-right left-copy">{{ $t('wallet.sportsBonus') }}</div>
          <div class="font-size-10 text-right left-copy">{{ $t('wallet.casinoBonus') }}</div>
        </div>
        <div class="ml-2">
          <div class="font-weight-bold">{{ activeBonusesList }} {{ currencyCode }}</div>
          <div class="mt-1 font-size-12 right-copy">{{ realMoney.toFixed(2) }} {{ currencyCode }}</div>
          <div class="font-size-12 right-copy">{{ sportMoney.toFixed(2) }} {{ currencyCode }}</div>
          <div class="font-size-12 right-copy">{{ casinoMoney.toFixed(2) }} {{ currencyCode }}</div>
        </div>
      </b-row>

      <b-row>
        <b-button
          class="w-100 mt-4 mx-3"
          variant="user-profile-button"
          @click="$emit('open-account-deposit-tab')">
          {{ $t('account.cta.deposit') }}
        </b-button>
      </b-row>
    </div>

    <div
      v-if="inactiveWalletsList.length > 0"
      class="w-100 bg-arc-clr-soil-dark"
      no-gutters>
      <b-row
        class="px-3 py-2 text-uppercase text-arc-clr-iron font-size-10 letter-spacing-2"
        no-gutters>
        {{ $t('wallet.otherWallets') }}
      </b-row>

      <b-row no-gutters>
        <b-col>
          <b-nav
            vertical
            pills>
            <b-nav-item
              v-for="wallet in inactiveWalletsList"
              :key="wallet.id"
              class="mobile-wallet-switch-mobile"
              @click.prevent="selectWallet(wallet)">
              <b-row no-gutters>
                <b-col class="auto">
                  <span class="font-weight-bold text-arc-clr-white font-size-12 letter-spacing-2 mobile-wallet-switch-amount">
                    {{ getBalanceWithBonus(wallet, currentLobbySection) }}
                  </span>
                  <span class="font-weight-bold text-arc-clr-iron font-size-12 ml-1 letter-spacing-2">
                    {{ wallet.currency.code }}
                  </span>
                </b-col>
                <b-col class="d-flex justify-content-end align-items-center">
                  <span class="font-size-14 text-uppercase letter-spacing-2 d-inline-flex align-items-center justify-content-end ml-4 text-arc-clr-iron">
                    {{ $t('wallet.switch') }}
                    <icon
                      name="chevron-right"
                      class="ml-2"
                      color="arc-clr-iron"
                      size="10px"/>
                  </span>
                </b-col>
              </b-row>
            </b-nav-item>
          </b-nav>
        </b-col>
      </b-row>
    </div>
    <div
      v-if="bonus"
      class="w-100 bg-arc-clr-soil-dark py-4"
      no-gutters>
      <b-row no-gutters>
        <small class="px-3 pb-2 text-arc-clr-iron letter-spacing-2 text-uppercase font-size-10">
          {{ $t('account.bonus.bonusAchieved') }}
        </small>
      </b-row>
      <b-row no-gutters>
        <b-col
          align="left"
          class="pl-3 d-flex align-items-center"
          cols="3">
          <small class="text-arc-clr-white">
            {{ Number(getCurrentBonusValue).toFixed(2) }}
          </small>
        </b-col>
        <b-col
          class="align-items-center d-flex"
          cols="7">
          <b-progress
            :value="getMainBonusPercentageValue"
            class="arc-wallet-progress-bar w-100"
            height="12px"/>
        </b-col>
        <b-col
          class="d-flex align-items-center justify-content-center"
          cols="2">
          <small>
            <strong class="text-arc-clr-gold">
              {{ getMainBonusPercentageValue }}%
            </strong>
          </small>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { getBalanceWithBonus } from '@/helpers/wallet'
import BonusSection from '@/components/navbar/wallet/BonusSection.vue'
export default {
  extends: BonusSection,
  props: {
    activeBonusesList: {
      type: String,
      required: true
    },
    currencyCode: {
      type: String,
      required: true
    },
    realMoney: {
      type: Number,
      required: true
    },
    casinoMoney: {
      type: Number,
      required: true
    },
    sportMoney: {
      type: Number,
      required: true
    },
    currentTabIndex: {
      type: Number,
      required: true
    },
    inactiveWalletsList: {
      type: Array,
      required: true
    },
    selectWallet: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      bonus: null
    }
  },
  methods: {
    getBalanceWithBonus
  }
}
</script>

<style lang="scss" scoped>
  .left-copy {
    line-height: 10px;
    height: 20px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
  .right-copy {
    line-height: 14px;
    font-weight: bold;
    font-size: 14px;
    height: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
  }
</style>
