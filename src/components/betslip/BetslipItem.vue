<template>
  <b-card
    bg-variant="arc-clr-soil-dark"
    style="margin-left: 6px"
    class="py-2 pl-3 pr-2 mb-1"
    no-body>
    <b-row
      class="mb-2"
      no-gutters>
      <b-col class="d-flex justify-content-start">
        <span
          :class="[ isBetDisabled ? 'text-arc-clr-iron' : 'text-arc-clr-iron-light']"
          class="font-size-12 font-weight-bold line-height-10">
          {{ bet.marketName }}
        </span>
      </b-col>
      <b-col
        cols="auto"
        class="d-flex justify-content-center"
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
        <b-row no-gutters>
          <b-col class="pr-2">
            <span
              :class="[ isBetDisabled ? 'text-arc-clr-iron' : 'text-arc-clr-iron-light']"
              class="font-size-14 font-weight-bold letter-spacing-2">
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
    <b-row
      class="mb-2"
      no-gutters>
      <b-col>
        <span
          :class="[ isBetDisabled ? 'text-arc-clr-iron' : 'text-arc-clr-iron-light']"
          class="font-size-12">
          {{ bet.eventName }}
        </span>
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
        <b-row no-gutters>
          <b-col class="d-flex align-items-center">
            <icon
              name="betslip-stake"
              size="12px"
              class="mr-1"/>
            <small class="ml-1 text-arc-clr-iron-light">
              Bet max
            </small>
          </b-col>
        </b-row>
      </b-col>
      <b-col class="d-flex align-items-center justify-content-end">
        <b-form-input
          v-mask="['#.##', '##.##', '###.##', '####.##', '#####.##', '######.##']"
          v-model="betStake"
          :disabled="isDisabled"
          class="betslip-input"
          type="tel"
          name="stake"/>
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
      <b-col class="pr-4 text-right text-truncate">
        <small>
          {{ parseFloat(potentialReturn.toFixed(2)) }}
        </small>
      </b-col>
    </b-row>

    <b-row
      v-if="valuesUnconfirmed"
      class="alert-odd-value-changed mt-3"
      no-gutters>
      <b-col>
        <b-row
          class="pl-2 py-1"
          no-gutters>
          <b-col class="line-height-14">
            <small class="text-arc-clr-gold letter-spacing-2">
              Odd changed:
            </small>
          </b-col>
          <div class="w-100"/>
          <b-col class="line-height-14">
            <small>
              {{ bet.approvedOddValue }}
            </small>
            <small class="text-arc-clr-gold mx-2">
              >
            </small>
            <small>
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

    <b-alert
      :show="hasMessage"
      class="mt-3 mx-auto p-2 text-center"
      variant="danger">
      {{ bet.message }}
    </b-alert>
    <b-alert
      :show="isSuccess"
      class="mt-3 mx-auto p-2 text-center"
      variant="success">
      {{ successMessage }}
    </b-alert>
    <b-alert
      :show="isBetDisabled"
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
import {
  SUSPENDED_STATUS,
  INACTIVE_STATUS as MARKET_INACTIVE_STATUS,
  SETTLED_STATUS,
  CANCELLED_STATUS,
  HANDED_OVER_STATUS
} from '@/models/market'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import { mask } from 'vue-the-mask'

export default {
  directives: { mask },
  props: {
    bet: {
      type: Bet,
      required: true
    },
    parentRefs: {
      type: Object,
      required: false,
      default: null
    }
  },
  data () {
    return {
      status: null,
      isDisabled: false,
      isSettled: false,
      disabledMessage: null
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
          this.updateOdds(data.markets[0])
          this.handleMarketStatus(data.markets[0])
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
          result ({ data: { event_updated: eventUpdated } }) {
            this.updateOdds(eventUpdated.markets[0])
            this.handleMarketStatus(eventUpdated.markets[0])
          }
        }
      },
      eventBetStopped () {
        return {
          query: EVENT_BET_STOPPED,
          variables () {
            return { id: this.bet.eventId }
          },
          result ({ data: { event_bet_stopped: eventBetStopped } }) {
            this.bet.marketStatus = eventBetStopped.market_status
            this.handleMarketStatus({ status: eventBetStopped.market_status })
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters('betslip', [
      'acceptAllChecked',
      'getBets'
    ]),
    potentialReturn: function () {
      const stake = this.bet.stake > 0 ? this.bet.stake : 0

      return stake * this.bet.approvedOddValue
    },
    betStake: {
      get () {
        return this.bet.stake
      },
      set (value) {
        let stakeValue = value > 0 ? value : 0
        this.setBetStake({ oddId: this.bet.oddId, stakeValue: stakeValue })
      }
    },
    valuesUnconfirmed () {
      if (!this.acceptAllChecked) {
        return (
          this.bet.status !== Bet.statuses.accepted &&
                this.bet.approvedOddValue !== this.bet.currentOddValue
        )
      }

      return false
    },
    betStatus () {
      if (this.valuesUnconfirmed) {
        return 'warning'
      }

      return this.bet.status
    },
    isSuccess () {
      return this.bet.status === Bet.statuses.accepted
    },
    hasMessage () {
      return this.bet.message !== null
    },
    isBetDisabled () {
      return this.isDisabled || this.isSettled
    },
    successMessage () {
      return MESSAGE_SUCCESS
    },
  },
  mounted () {
    this.$nextTick(() => {
      this.parentRefs['parent-button'].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
    })
  },
  methods: {
    ...mapMutations('betslip', [
      'setBetStake',
      'updateBet',
      'removeBetFromBetslip'
    ]),
    updateOdds (market) {
      const bets = this.getBets
      const updateBet = this.updateBet
      const acceptAllChecked = this.acceptAllChecked

      market.odds.forEach(function (odd) {
        let bet = bets.find(el => el.oddId === odd.id)

        if (!bet) return
        updateBet({ oddId: bet.oddId, payload: { currentOddValue: odd.value, marketStatus: market.status } })

        if (acceptAllChecked && bet.currentOddValue !== bet.approvedOddValue) {
          updateBet({ oddId: bet.oddId, payload: { approvedOddValue: odd.value, status: 'warning', marketStatus: market.status } })
        }
      })
    },
    handleMarketStatus (market) {
      this.isSettled = market.status === SETTLED_STATUS

      this.isDisabled = [
        SUSPENDED_STATUS,
        MARKET_INACTIVE_STATUS,
        HANDED_OVER_STATUS,
        CANCELLED_STATUS
      ].includes(market.status)

      this.disabledMessage = this.isSettled ? MESSAGE_SETTLED : MESSAGE_DISABLED
    },
    confirmValue () {
      this.updateBet({ oddId: this.bet.oddId, payload: { approvedOddValue: this.bet.currentOddValue } })
    },
    removeOdd (oddId) {
      this.removeBetFromBetslip(oddId)
    }
  }
}
</script>
