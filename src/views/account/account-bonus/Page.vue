<template>
  <div>
    <h3
      v-if="!isMobile"
      class="mb-0 font-weight-light">
      {{ $t('account.tabs.bonus') }}
    </h3>
    <bonus-placeholder v-if="!customerBonuses.length"/>
    <div v-if="customerBonuses.length">
      <information-section
        :bonus-achieved="getCurrentBonusValue"
        :main-bonus="getMainBonus"/>
      <progress-scale :value="getMainBonusPercentageValue"/>
      <bonus-items :bonus-items="customerBonuses"/>
    </div>
  </div>

</template>

<script>
import ProgressScale from './ProgressScale'
import InformationSection from './InformationSection'
import BonusItems from './BonusItems'
import BonusPlaceholder from './BonusPlaceholder'
import { BONUSES_LIST_QUERY } from '@/graphql'

export default {
  components: {
    ProgressScale,
    InformationSection,
    BonusItems,
    BonusPlaceholder
  },
  data () {
    return {
      customerBonuses: []
    }
  },
  computed: {
    getCurrentBonusValue () {
      return this.getMainBonus.rolloverInitialValue - this.getMainBonus.rolloverBalance
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
        query: BONUSES_LIST_QUERY
      }
    }
  }
}
</script>
