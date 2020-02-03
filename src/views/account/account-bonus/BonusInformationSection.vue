<template>
  <b-row
    class="bonus-overview-section"
    no-gutters>
    <bonus-achieved-section
      :bonus-achieved="bonusAchieved"
      @cancel-active-bonus="cancelActiveBonus"/>
    <bonus-details-section :main-bonus="mainBonus"/>
  </b-row>
</template>

<script>
import BonusAchievedSection from '@/views/account/account-bonus/BonusAchievedSection'
import BonusDetailsSection from '@/views/account/account-bonus/BonusDetailsSection'
import { BONUS_CANCELLATION_MUTATION } from '@/graphql'

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
  },
  methods: {
    cancelActiveBonus () {
      const answer = confirm(this.$i18n.t('cancelActiveBonusModal.confirmMessage'))

      if (answer) {
        this
          .$apollo
          .mutate({
            mutation: BONUS_CANCELLATION_MUTATION
          }).then(({ data }) => {
            const message = this.$i18n.t('cancelActiveBonusModal.successfulCancellation')
            this.emitData('success', message)
          }).catch(({ graphQLErrors }) => {
            this.emitData('error', graphQLErrors[0].message)
          })
      }
    },
    emitData (status, message) {
      this.$emit('bonus-cancellation', status, message)
    }
  }
}
</script>
