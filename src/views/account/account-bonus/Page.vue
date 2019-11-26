<template>
  <div>
    <bonus-header v-if="!isMobile"/>
    <bonus-placeholder
      v-if="!getMainBonus"/>
    <bonus-information-section
      v-if="getMainBonus"
      :bonus-achieved="getCurrentBonusValue"
      :main-bonus="getMainBonus"/>
    <progress-scale
      v-if="getMainBonus"
      :value="getMainBonusPercentageValue"/>
    <bonus-items :bonus-items="bonuses"/>
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
import { ACTIVE } from '@/constants/bonus-statuses'

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
      bonuses: []
    }
  },
  computed: {
    getCurrentBonusValue () {
      if (!this.getMainBonus) return null

      return (this.getMainBonus.rolloverInitialValue - this.getMainBonus.rolloverBalance).toFixed(2)
    },
    getMainBonusPercentageValue () {
      if (!this.getMainBonus) return null

      let calculatedPercentage = (this.getCurrentBonusValue / this.getMainBonus.rolloverInitialValue) * 100
      return parseFloat(calculatedPercentage.toFixed(2))
    },
    getMainBonus () {
      return this.bonuses.find((bonus) => bonus.status === ACTIVE)
    }
  },
  apollo: {
    bonuses () {
      return {
        query: BONUSES_LIST_QUERY,
        fetchPolicy: NETWORK_ONLY
      }
    }
  }
}
</script>
