<template>
  <b-card
    :style="{ 'margin-left': isMobile ? '0' : '6px' }"
    bg-variant="arc-clr-soil-dark"
    class="py-2 pl-3 pr-2 mb-1"
    no-body>

    <b-row
      class="mb-1"
      no-gutters>
      <b-col class="d-flex justify-content-start">
        <span
          :class="[ isBetDisabled ? 'text-arc-clr-iron' : 'text-arc-clr-iron-light']"
          class="event-name font-size-12 font-weight-bold">
          {{ bet.eventName }}
        </span>
      </b-col>
      <b-col
        cols="auto"
        class="remove-odd d-flex justify-content-center"
        @click="removeOdd(bet.oddId)">
        <icon
          v-show="!bet.frozen"
          size="12px"
          name="betslip-close"/>
      </b-col>
    </b-row>
    <b-row
      class="mb-1"
      no-gutters>
      <b-col>
        <span
          :class="[ isBetDisabled ? 'text-arc-clr-iron' : 'text-arc-clr-iron-light']"
          class="market-name font-size-12 line-height-10">
          {{ bet.marketName }}
        </span>
      </b-col>
    </b-row>
    <b-row
      class="mb-2"
      no-gutters>
      <b-col>
        <b-row no-gutters>
          <b-col class="pr-2">
            <span
              :class="[ isBetDisabled ? 'text-arc-clr-iron' : 'text-arc-clr-iron-light']"
              class="font-size-12 font-weight-bold letter-spacing-2">
              {{ bet.oddName }}
            </span>
          </b-col>
          <b-col cols="auto">
            <b-button
              :disabled="isBetDisabled"
              variant="arc-betslip-odd">
              {{ bet.approvedOddValue }}
            </b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col>
        <b-row no-gutters>
          <b-col class="mb-1">
            <small class="text-arc-clr-iron text-uppercase font-weight-bold letter-spacing-2">
              Stake:
            </small>
          </b-col>
        </b-row>
      </b-col>
      <b-col class="d-flex align-items-center justify-content-end">
        <masked-input
          :disabled="isDisabled"
          v-model="betStake"
          :mask="mask"
          type="text"
          name="stake"
          class="betslip-input form-control"
        />
      </b-col>
    </b-row>
    <b-row
      class="pt-3"
      no-gutters>
      <b-col>
        <small class="text-arc-clr-iron letter-spacing-2">
          Potential Return:
        </small>
      </b-col>
      <b-col class="potential-return pr-4 text-right text-truncate">
        <small>
          {{ parseFloat(potentialReturn.toFixed(2)) }}
        </small>
      </b-col>
    </b-row>

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
              Odds changed:
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
          @click="confirmValue">
          Accept
        </b-button>
      </b-col>
    </b-row>

    <b-row
      v-show="oddsChanged"
      no-gutters>
      <b-col class="alert-odds-changed">
        {{ $t('betslip.betslipItem.oddsChanged') }}
      </b-col>
    </b-row>

    <b-alert
      :show="isFail"
      class="bet-message-alert mt-3 mx-auto p-2 text-center"
      variant="danger">
      {{ betMessage }}
    </b-alert>
    <b-alert
      :show="isSuccess"
      class="success-message mt-3 mx-auto p-2 text-center"
      variant="success">
      {{ successMessage }}
    </b-alert>
    <b-alert
      :show="isBetDisabled && !getAnyFrozenBet && !isAccepted"
      class="odd-disabled-message"
      variant="odd-disabled">
      {{ disabledMessage }}
    </b-alert>
  </b-card>
</template>

<script>
import Bet from '@/models/bet'
import { mapGetters, mapMutations } from 'vuex'
import { MESSAGE_SETTLED, MESSAGE_DISABLED, MESSAGE_SUCCESS } from '@/constants/betslip-messages'
import { MARKET_BY_ID_QUERY, EVENT_BET_STOPPED, eventUpdatedSubscription } from '@/graphql'
import { INACTIVE_STATUS, SETTLED_STATUS, INACTIVE_STATUSES } from '@/models/market'
import {
  PENDING_CANCELLATION,
  ENPENDING_MANUAL_CANCELLATIONDED,
  CANCELLED,
  REJECTED,
  CANCELLED_BY_SYSTEM,
  FAILED
} from '@/constants/bet-fail-statuses'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import MaskedInput from 'vue-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

const DISABLED = 'disabled'
const SETTLED = 'settled'

export default {
  components: {
    MaskedInput
  },
  props: {
    bet: {
      type: Bet,
      required: true
    }
  },
  data () {
    return {
      betMarketStatus: null,
      betOddStatus: null,
      disabledMessage: null,
      oddsChanged: false
    }
  },
  apollo: {
    market () {
      return {
        query: MARKET_BY_ID_QUERY,
        fetchPolicy: NETWORK_ONLY,
        manual: true,
        variables: {
          id: this.bet.marketId,
          eventId: this.bet.eventId
        },
        update: data => data.markets[0],
        result ({ data }) {
          const market = data.markets[0] || {}

          this.updateOdds(market)
          this.handleMarketStatus(market)
          this.handleMarketVisibility(market)
        }
      }
    },
    $subscribe: {
      eventUpdated () {
        return {
          query: eventUpdatedSubscription(this.bet.marketId),
          variables () {
            return { id: this.bet.eventId }
          },
          result ({ data: { eventUpdated } }) {
            const market = eventUpdated.markets[0] || {}
            const isMarketVisible = eventUpdated.visible && market.visible

            this.updateOdds(market)
            this.handleMarketStatus(market)
            this.handleMarketVisibility({ visible: isMarketVisible })
          }
        }
      },
      eventBetStopped () {
        return {
          query: EVENT_BET_STOPPED,
          variables () {
            return { id: this.bet.eventId }
          },
          result ({ data: { eventBetStopped } }) {
            this.bet.marketStatus = eventBetStopped.marketStatus
            this.handleMarketStatus({ status: eventBetStopped.marketStatus })
          }
        }
      }
    }
  },
  computed: {
    mask () {
      return createNumberMask({
        prefix: '',
        allowDecimal: true,
        allowLeadingZeroes: true,
        includeThousandsSeparator: false
      })
    },
    ...mapGetters('betslip', [
      'acceptAllChecked',
      'getBets',
      'getAnyFrozenBet'
    ]),
    potentialReturn: function () {
      const stake = this.bet.stake > 0 ? this.bet.stake : 0
      return stake * this.bet.approvedOddValue
    },
    betStake: {
      get () {
        return this.bet.stake ? this.bet.stake.toString() : null
      },
      set (value) {
        let stakeValue = value > 0 ? value : null
        this.setBetStake({ oddId: this.bet.oddId, stakeValue: stakeValue })
      }
    },
    valuesUnconfirmed () {
      if (!this.acceptAllChecked) {
        return this.bet.isAcceptable && this.bet.approvedOddValue !== this.bet.currentOddValue
      }

      return false
    },
    isSuccess () {
      if (!this.bet.status) return

      return this.bet.status === Bet.statuses.accepted || this.bet.status === Bet.statuses.settled
    },
    isAccepted () {
      if (!this.bet.status) return

      return this.bet.isStatusAccepted
    },
    isFail () {
      if (!this.bet.status) return

      return [ PENDING_CANCELLATION,
        ENPENDING_MANUAL_CANCELLATIONDED,
        CANCELLED,
        REJECTED,
        CANCELLED_BY_SYSTEM,
        FAILED].includes(this.bet.status)
    },
    isBetDisabled () {
      return this.isDisabled || this.isSettled
    },
    isDisabled () {
      return this.betMarketStatus === DISABLED || this.betOddStatus === DISABLED
    },
    isSettled () {
      return this.status === SETTLED
    },
    successMessage () {
      return MESSAGE_SUCCESS
    },
    betMessage () {
      return this.bet.message || this.$i18n.t('betslip.generic')
    }
  },
  mounted () {
    this.$emit('betslip-item-mounted')
  },
  methods: {
    ...mapMutations('betslip', [
      'setBetStake',
      'updateBet',
      'removeBetFromBetslip'
    ]),
    updateOdds (market) {
      if (!market.hasOwnProperty('id')) return

      let marketHasOdd = market.odds.some((odd) => this.bet.oddId === odd.id)
      if (!marketHasOdd || INACTIVE_STATUSES.includes(market.status)) {
        return this.disableBetByOddStatus()
      } else {
        this.betOddStatus = null
      }

      let bets = this.getBets

      market.odds.forEach((odd) => {
        let bet = bets.find(el => el.oddId === odd.id)

        if (!bet) return

        this.updateBet({
          oddId: bet.oddId,
          payload: { currentOddValue: odd.value, marketStatus: market.status }
        })

        if (bet.oddsChanged) {
          this.oddsChanged = true
          this.confirmValue()
        }
      })
    },
    disableBetByOddStatus () {
      this.disabledMessage = MESSAGE_DISABLED
      this.betOddStatus = DISABLED

      this.updateBet({
        oddId: this.bet.oddId,
        payload: { status: Bet.statuses.disabled }
      })
    },
    handleMarketVisibility (market) {
      if (!market.visible) {
        return this.disableBetByMarketStatus()
      }
    },
    handleMarketStatus (market) {
      if (!market.status || INACTIVE_STATUSES.includes(market.status)) {
        return this.disableBetByMarketStatus()
      }
      if (market.status === SETTLED_STATUS) { return this.settleBetByMarketStatus() }

      this.betMarketStatus = null
    },
    disableBetByMarketStatus () {
      this.disabledMessage = MESSAGE_DISABLED
      this.betMarketStatus = DISABLED

      this.updateBet({
        oddId: this.bet.oddId,
        payload: { marketStatus: INACTIVE_STATUS }
      })
    },
    settleBetByMarketStatus () {
      this.disabledMessage = MESSAGE_SETTLED
      this.betMarketStatus = SETTLED

      this.updateBet({
        oddId: this.bet.oddId,
        payload: { marketStatus: SETTLED_STATUS }
      })
    },
    confirmValue () {
      this.updateBet({
        oddId: this.bet.oddId,
        payload: { approvedOddValue: this.bet.currentOddValue }
      })
    },
    removeOdd (oddId) {
      this.removeBetFromBetslip(oddId)
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
