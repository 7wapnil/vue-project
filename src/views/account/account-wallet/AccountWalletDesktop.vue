<template>
  <b-col
    class="bg-arc-clr-soil-dark py-4 px-3">
    <b-row
      no-gutters>
      <b-col>
        <b-col class="p-0 text-uppercase text-arc-clr-iron font-size-10 letter-spacing-2">
          {{ $t('wallet.balance') }}
        </b-col>
        <div class="w-100"/>
        <b-col class="p-0 mt-1">
          <span class="font-weight-bold text-arc-clr-white letter-spacing-2">
            {{ activeBonusesList }}
          </span>
          <span
            v-if="!isGamePage"
            class="font-weight-bold text-arc-clr-iron ml-1 letter-spacing-2">
            {{ activeWallet.currency.code }}
          </span>
        </b-col>
      </b-col>
      <b-col cols="auto">
        <b-button
          v-if="currentTabIndex !== 3"
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

        <b-row no-gutters>
          <b-col>
            <b-nav
              vertical
              pills
            >
              <b-nav-item
                v-for="wallet in inactiveWalletsList"
                :key="wallet.id"
                class="mobile-wallet-switch"
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
                  <b-col class="text-right">
                    <span class="font-size-14 letter-spacing-2 d-inline-flex align-items-center justify-content-end ml-4 text-arc-clr-white">
                      {{ $t('wallet.switch') }}
                      <icon
                        name="chevron-right"
                        class="ml-2"
                        color="arc-clr-white"
                        size="10px"/>
                    </span>
                  </b-col>
                </b-row>
              </b-nav-item>
            </b-nav>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import { getBalanceWithBonus } from '@/helpers/wallet'
export default {
  props: {
    activeBonusesList: {
      type: String,
      required: true
    },
    isGamePage: {
      type: Boolean,
      required: true
    },
    activeWallet: {
      type: Object,
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
  methods: {
    getBalanceWithBonus
  }
}
</script>
