<template>
  <b-row
    class="bonus-overview-section"
    no-gutters>
    <bonus-achieved-section :bonus-achieved="bonusAchieved"/>
    <bonus-details-section :main-bonus="mainBonus"/>
  </b-row>
</template>

<script>
import BonusAchievedSection from '@/views/account/account-bonus/BonusAchievedSection'
import BonusDetailsSection from '@/views/account/account-bonus/BonusDetailsSection'

export default {
  components: {
    BonusAchievedSection,
    BonusDetailsSection
  },
  props: {
    bonusAchieved: {
      type: Number,
      required: true
    },
    mainBonus: {
      type: Object,
      required: true
    }
  }
}
</script>
