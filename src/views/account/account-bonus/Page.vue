<template>
  <div>
    <h3 class="mb-0 font-weight-light">
      {{ $t('account.tabs.bonus') }}
    </h3>
    <bonus-placeholder v-if="!customer_bonuses.length"/>
    <div v-if="customer_bonuses.length">
      <information-section
        :bonus-achieved="getCurrentBonusValue"
        :main-bonus="getMainBonus"/>
      <progress-scale :value="getMainBonusPercentageValue"/>
      <bonus-items :bonus-items="customer_bonuses"/>
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
      customer_bonuses: null
    }
  },
  computed: {
    getCurrentBonusValue () {
      return this.getMainBonus.rollover_initial_value - this.getMainBonus.rollover_balance
    },
    getMainBonusPercentageValue () {
      return (this.getCurrentBonusValue / this.getMainBonus.rollover_initial_value) * 100
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
