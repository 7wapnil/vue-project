<template>
  <div>
    <b-row
      v-if="suggestNewOddsValue"
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

    <betslip-message
      :message="messageObject"
      :show="!isMessageBlockHidden"
      :extended="suggestNewOddsValue"/>
  </div>
</template>

<script>
import Bet from '@/models/bet'
import { mapGetters, mapMutations } from 'vuex'
import {
  MESSAGE_SUCCESS, MESSAGE_DISABLED, MESSAGE_SETTLED,
  SUCCESS, DANGER, ODD_DISABLED
} from '@/constants/betslip-messages'
import { STATUSES as FAILURE_STATUSES } from '@/constants/bet-fail-statuses'
import BetslipMessage from '@/components/betslip/BetslipMessage'
import { SETTLED_STATUS } from '@/models/market'

export default {
  components: {
    BetslipMessage
  },
  props: {
    bet: {
      type: Bet,
      required: true
    }
  },
  computed: {
    ...mapGetters('betslip', [
      'acceptAllChecked',
      'hasAnyFrozenBet',
      'isComboBetsMode'
    ]),
    hasUnconfirmedValues () {
      return !this.acceptAllChecked && this.bet.isAcceptable && this.bet.oddsChanged
    },
    betMessage () {
      return this.bet.message || this.$i18n.t('betslip.generic')
    },
    messageObject () {
      if (this.isSuccess) return this.successMessageObject

      if (this.isBetDisabled && !this.hasAnyFrozenBet && !this.isAccepted) {
        return this.disabledMessageObject
      }

      if (this.isFailure && !this.bet.oddsChanged) return this.failureMessageObject

      return {}
    },
    isSuccess () {
      if (!this.bet.status) return

      return this.bet.status === Bet.statuses.accepted || this.bet.status === Bet.statuses.settled
    },
    successMessageObject () {
      return {
        text: MESSAGE_SUCCESS,
        variant: SUCCESS
      }
    },
    isFailure () {
      if (!this.bet.status) return false

      return FAILURE_STATUSES.includes(this.bet.status)
    },
    failureMessageObject () {
      return {
        text: this.betMessage,
        variant: DANGER
      }
    },
    isBetDisabled () {
      return this.isDisabled || this.isSettled
    },
    isDisabled () {
      return !(this.bet.eventEnabled && this.bet.marketEnabled && this.bet.oddEnabled)
    },
    isSettled () {
      return this.bet.marketStatus === SETTLED_STATUS
    },
    isAccepted () {
      return this.bet.status && this.bet.isStatusAccepted
    },
    disabledMessageObject () {
      return {
        text: this.disabledMessage,
        variant: ODD_DISABLED
      }
    },
    disabledMessage () {
      if (this.isSettled) return MESSAGE_SETTLED
      if (this.isDisabled) return MESSAGE_DISABLED

      return null
    },
    isMessageBlockHidden () {
      if (this.bet.oddsChanged) return true

      return this.isComboBetsMode &&
        !(this.bet.status === Bet.statuses.conflicted) &&
        (this.isSuccess || this.isFailure)
    },
    suggestNewOddsValue () {
      return this.hasUnconfirmedValues && !this.hasAnyFrozenBet
    }
  },
  mounted () {
    this.$emit('mounted:betslip-item')
  },
  methods: {
    ...mapMutations('betslip', ['updateBet']),
    acceptNewOdds () {
      const status = this.outdatedOddsError ? Bet.statuses.initial : this.bet.status

      this.updateBet({
        oddId: this.bet.oddId,
        payload: {
          id: null,
          status: status,
          approvedOddValue: this.bet.currentOddValue
        }
      })
    }
  }
}
</script>
