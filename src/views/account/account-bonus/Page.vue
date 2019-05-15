<template>
  <div v-if="customer_bonuses.length">
    <h3 class="mb-0 font-weight-light">
      Bonus
    </h3>
    <information-section
      :bonus-achieved="currentBonusValue"
      :main-bonus="customer_bonuses[firstBonusIndex]"/>
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
      customer_bonuses: [],
      firstBonusIndex: 0
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
      return (this.currentBonusValue / this.customer_bonuses[this.firstBonusIndex].rollover_initial_value) * 100
    },
    currentBonusValue () {
      return this.customer_bonuses[this.firstBonusIndex].rollover_initial_value - this.customer_bonuses[this.firstBonusIndex].rollover_balance
    }
  }
}
</script>
