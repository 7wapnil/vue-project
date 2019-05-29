<template>
  <div v-if="customerBonuses && customerBonuses.length">
    <b-row
      no-gutters
      class="px-3 pt-3 pb-0">
      <b-col align="center">
        <small class="text-arc-clr-iron letter-spacing-2 text-uppercase">
          {{ $t('account.bonus.bonusAchieved') }}
        </small>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col align="center">
        <small class="text-arc-clr-white">
          {{ getCurrentBonusValue }}
        </small>
      </b-col>
    </b-row>
    <b-row
      no-gutters
      class="px-3">
      <b-col>
        <b-progress
          :value="getMainBonusPercentageValue"
          class="arc-wallet-progress-bar"
          height="12px"/>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col class="pt-1 pb-3 d-flex justify-content-center align-items-center">
        <small>
          <strong class="arc-wallet-progress-bar-percent">
            {{ getMainBonusPercentageValue }}%
          </strong>
        </small>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BONUSES_LIST_QUERY } from '@/graphql'

export default {
  data () {
    return {
      customerBonuses: null
    }
  },
  computed: {
    getCurrentBonusValue () {
      return this.getMainBonus.rolloverInitialValue - this.getMainBonus.rolloverBalance
    },
    getMainBonusPercentageValue () {
      let calculatedPercentage = (this.getCurrentBonusValue / this.getMainBonus.rolloverInitialValue) * 100
      return parseFloat(calculatedPercentage).toFixed(2)
    },
    getMainBonus () {
      return this.customerBonuses.find((bonus) => bonus.status === 'active') || this.customerBonuses[0]
    }
  },
  apollo: {
    customerBonuses () {
      return {
        query: BONUSES_LIST_QUERY
      }
    }
  }
}
</script>
