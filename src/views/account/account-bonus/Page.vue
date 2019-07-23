<template>
  <div>
    <bonus-header v-if="!isMobile"/>
    <bonus-placeholder v-if="!customerBonuses.length"/>
    <div v-if="customerBonuses.length">
      <bonus-information-section
        :bonus-achieved="getCurrentBonusValue"
        :main-bonus="getMainBonus"/>
      <progress-scale :value="getMainBonusPercentageValue"/>
      <bonus-items :bonus-items="customerBonuses"/>
    </div>
  </div>
</template>

<script>
import ProgressScale from '@/views/account/account-bonus/ProgressScale'
import BonusInformationSection from '@/views/account/account-bonus/BonusInformationSection'
import BonusItems from '@/views/account/account-bonus/BonusItems'
import BonusPlaceholder from '@/views/account/account-bonus/BonusPlaceholder'
import BonusHeader from '@/views/account/account-bonus/BonusHeader'
import { BONUSES_LIST_QUERY } from '@/graphql'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'

export default {
  components: {
    ProgressScale,
    BonusInformationSection,
    BonusItems,
    BonusPlaceholder,
    BonusHeader
  },
  data () {
    return {
      customerBonuses: []
    }
  },
  computed: {
    getCurrentBonusValue () {
      return (this.getMainBonus.rolloverInitialValue - this.getMainBonus.rolloverBalance).toFixed(2)
    },
    getMainBonusPercentageValue () {
      let calculatedPercentage = (this.getCurrentBonusValue / this.getMainBonus.rolloverInitialValue) * 100
      return parseFloat(calculatedPercentage.toFixed(2))
    },
    getMainBonus () {
      return this.customerBonuses.find((bonus) => bonus.status === 'active') || this.customerBonuses[0]
    }
  },
  apollo: {
    customerBonuses () {
      return {
        query: BONUSES_LIST_QUERY,
        fetchPolicy: NETWORK_ONLY
      }
    }
  }
}
</script>
