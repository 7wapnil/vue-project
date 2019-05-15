<template>
  <div v-if="customer_bonuses.length">
    <h3 class="mb-0 font-weight-light">
      {{ $t('account.tabs.bonus') }}
    </h3>
    <information-section
      :bonus-achieved="currentBonusValue"
      :main-bonus="firstBonus"/>
    <progress-scale :value="percentageValue"/>
    <bonus-items :bonus-items="customer_bonuses"/>
  </div>
</template>

<script>
import ProgressScale from './ProgressScale'
import InformationSection from './InformationSection'
import BonusItems from './BonusItems'
import { BONUSES_LIST_QUERY } from '@/graphql'

export default {
  components: {
    ProgressScale,
    InformationSection,
    BonusItems
  },
  data () {
    return {
      customer_bonuses: []
    }
  },
  apollo: {
    customer_bonuses () {
      return {
        query: BONUSES_LIST_QUERY
      }
    }
  },
  computed: {
    percentageValue () {
      return (this.currentBonusValue / this.firstBonus.rollover_initial_value) * 100
    },
    firstBonus () {
      return this.customer_bonuses.find((bonus) => bonus.status === 'active') || this.customer_bonuses[0]
    },
    currentBonusValue () {
      return this.firstBonus.rollover_initial_value - this.firstBonus.rollover_balance
    }
  }
}
</script>
