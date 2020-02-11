<template>
  <div>
    <bonus-header v-if="!isMobile"/>
    <bonus-placeholder
      v-if="!getMainBonus"/>
    <bonus-information-section
      v-if="getMainBonus"
      :bonus-achieved="getCurrentBonusValue"
      :main-bonus="getMainBonus"
      @click-bonus-cancellation="showConfirmation"/>
    <bonus-cancellation-confirmation
      v-if="confirmationState"
      :cancel-bonus-confirmation-state="confirmBonusCancellationState"
      :amount="bonusAmount"
      @bonus-cancellation="cancellationResults"
      @hide-confirmation="hideConfirmation"
    />
    <bonus-alerts
      :cancel-bonus-status="cancelBonusStatus"
      :cancel-bonus-message="cancelBonusMessage"/>
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
import BonusAlerts from '@/views/account/account-bonus/BonusAlerts'
import BonusCancellationConfirmation from '@/views/account/account-bonus/BonusCancellationConfirmation'
import { BONUSES_LIST_QUERY } from '@/graphql'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import { ACTIVE } from '@/constants/bonus-statuses'
import { mapGetters } from 'vuex'

export default {
  components: {
    ProgressScale,
    BonusInformationSection,
    BonusItems,
    BonusPlaceholder,
    BonusHeader,
    BonusAlerts,
    BonusCancellationConfirmation
  },
  data () {
    return {
      bonuses: [],
      cancelBonusMessage: null,
      cancelBonusStatus: null,
      confirmBonusCancellationState: false
    }
  },
  computed: {
    ...mapGetters({
      bonusAmount: 'getUserCurrentBonusBalance'
    }),
    getCurrentBonusValue () {
      if (!this.getMainBonus) return null

      return parseFloat(
        (this.getMainBonus.rolloverInitialValue - this.getMainBonus.rolloverBalance).toFixed(2)
      )
    },
    getMainBonusPercentageValue () {
      if (!this.getMainBonus) return null

      let calculatedPercentage = (this.getCurrentBonusValue / this.getMainBonus.rolloverInitialValue) * 100
      return parseFloat(calculatedPercentage.toFixed(2))
    },
    getMainBonus () {
      return this.bonuses.find((bonus) => bonus.status === ACTIVE)
    },
    confirmationState () {
      return this.confirmBonusCancellationState
    }
  },
  methods: {
    cancellationResults (status, message) {
      this.cancelBonusStatus = status
      this.cancelBonusMessage = message
      this.$apollo.queries.bonuses.refetch()
    },
    showConfirmation () {
      this.confirmBonusCancellationState = true
    },
    hideConfirmation () {
      this.confirmBonusCancellationState = false
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
