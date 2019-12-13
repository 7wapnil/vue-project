<template>
  <div>
    <b-row
      v-if="valuesUnconfirmed && !getAnyFrozenBet"
      class="alert-odd-value-changed mt-3"
      no-gutters>
      <b-col>
        <b-row
          class="pl-2 py-1"
          no-gutters>
          <b-col class="line-height-14">
            <small class="text-arc-clr-gold letter-spacing-2">
              {{ $t('betslipItem.oddsChanged') }}
            </small>
          </b-col>
          <div class="w-100"/>
          <b-col class="line-height-14">
            <small class="approved">
              {{ bet.approvedOddValue }}
            </small>
            <small class="text-arc-clr-gold mx-2">
              >
            </small>
            <small class="current">
              {{ bet.currentOddValue }}
            </small>
          </b-col>
        </b-row>
      </b-col>
      <b-col
        class="d-flex align-items-center justify-content-center"
        cols="auto">
        <b-button
          variant="arc-odd-changed"
          @click="acceptNewOdds">
          {{ $t('betslipItem.accept') }}
        </b-button>
      </b-col>
    </b-row>

    <b-alert
      :class="messageObject.classes"
      :variant="messageObject.variant"
      :show="showAlert"
      v-html="messageObject.text"/>
  </div>
</template>

<script>
import Bet from '@/models/bet'
import { mapGetters, mapMutations } from 'vuex'
import { MESSAGE_SUCCESS } from '@/constants/betslip-messages'
import { STATUSES as FAILURE_STATUSES } from '@/constants/bet-fail-statuses'

export default {
  props: {
    bet: {
      type: Bet,
      required: true
    },
    alertMessage: {
      type: String,
      default: null
    }
  },
  computed: {
    ...mapGetters('betslip', ['acceptAllChecked', 'getAnyFrozenBet']),
    valuesUnconfirmed () {
      return !this.acceptAllChecked && this.bet.isAcceptable && this.bet.oddsChanged
    },
    successMessage () {
      return MESSAGE_SUCCESS
    },
    betMessage () {
      return this.bet.message || this.$i18n.t('betslip.generic')
    },
    showAlert () {
      return !!this.messageObject.variant
    },
    messageObject () {
      if (this.isSuccess) return this.successMessageObject

      if (this.isFailure && !this.bet.oddsChanged) return this.failureMessageObject

      if (this.isBetDisabled && !this.getAnyFrozenBet && !this.isAccepted) {
        return this.disabledMessageObject
      }

      return {}
    },
    isSuccess () {
      if (!this.bet.status) return

      return this.bet.status === Bet.statuses.accepted || this.bet.status === Bet.statuses.settled
    },
    successMessageObject () {
      return {
        text: this.successMessage,
        variant: 'success',
        classes: 'success-message mt-3 mx-auto p-2 text-center'
      }
    },
    isFailure () {
      if (!this.bet.status) return false

      return FAILURE_STATUSES.includes(this.bet.status)
    },
    failureMessageObject () {
      return {
        text: this.betMessage,
        variant: 'danger',
        classes: 'bet-message-alert mt-3 mx-auto p-2 text-center'
      }
    },
    isBetDisabled () {
      return this.isDisabled || this.isSettled
    },
    isDisabled () {
      return this.betMarketStatus === Bet.statuses.disabled ||
        this.betOddStatus === Bet.statuses.disabled
    },
    isSettled () {
      return this.status === Bet.statuses.settled
    },
    isAccepted () {
      if (!this.bet.status) return

      return this.bet.isStatusAccepted
    },
    disabledMessageObject () {
      return {
        text: this.alertMessage,
        variant: 'odd-disabled',
        classes: 'odd-disabled-message'
      }
    }
  },
  mounted () {
    this.$emit('mounted:betslip-item')
  },
  methods: {
    ...mapMutations('betslip', ['updateBet']),
    acceptNewOdds () {
      this.updateBet({
        oddId: this.bet.oddId,
        payload: {
          id: null,
          status: Bet.statuses.initial,
          approvedOddValue: this.bet.currentOddValue
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.alert-odds-changed {
  margin-top:0.3rem;
  text-align: center;
  font-size: 0.8rem;
  border: 1px solid $arc-clr-gold;
  border-radius: 4px;
  padding: 0.3rem 0;
  color: $arc-clr-gold;
}
</style>
