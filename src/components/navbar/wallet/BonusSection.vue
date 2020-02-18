<template>
  <div v-if="bonus">
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
          {{ Number(getCurrentBonusValue).toFixed(2) }}
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
import { BONUSES_LIST_QUERY, CUSTOMER_BONUSES_UPDATED_SUBSCRIPTION } from '@/graphql'
import { ACTIVE } from '@/constants/bonus-statuses'

export default {
  data () {
    return {
      bonus: null
    }
  },
  computed: {
    getCurrentBonusValue () {
      return this.bonus.rolloverInitialValue - this.bonus.rolloverBalance
    },
    getMainBonusPercentageValue () {
      let calculatedPercentage = (this.getCurrentBonusValue / this.bonus.rolloverInitialValue) * 100
      return parseFloat(calculatedPercentage.toFixed(2))
    }
  },
  apollo: {
    $subscribe: {
      customerBonusUpdated: {
        query () {
          return CUSTOMER_BONUSES_UPDATED_SUBSCRIPTION;
        },
        result (subscriptionData) {
          let receivedBonus = subscriptionData.data.customerBonusUpdated
          this.bonus = receivedBonus.status === ACTIVE ? receivedBonus : null
        }
      }
    },
    bonuses () {
      return {
        query: BONUSES_LIST_QUERY,
        variables: { status: ACTIVE },
        result ({ data: { bonuses } }) {
          this.bonus = bonuses[0]
        }
      }
    }
  }
}
</script>
