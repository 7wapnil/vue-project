<template>
  <div v-if="customer_bonuses && customer_bonuses.length">
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
      customer_bonuses: null
    }
  },
  computed: {
    getCurrentBonusValue () {
      return this.getMainBonus.rollover_initial_value - this.getMainBonus.rollover_balance
    },
    getMainBonusPercentageValue () {
      let calculatedPercentage = (this.getCurrentBonusValue / this.getMainBonus.rollover_initial_value) * 100
      return parseFloat(calculatedPercentage).toFixed(2)
    },
    getMainBonus () {
      return this.customer_bonuses.find((bonus) => bonus.status === 'active') || this.customer_bonuses[0]
    }
  },
  apollo: {
    customer_bonuses () {
      return {
        query: BONUSES_LIST_QUERY
      }
    }
  }
}
</script>
