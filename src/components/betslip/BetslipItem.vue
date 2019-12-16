<template>
  <b-card
    :style="{ 'margin-left': isMobile ? '0' : '6px' }"
    bg-variant="arc-clr-soil-dark"
    class="py-2 pl-3 pr-2 mb-1"
    no-body>

    <b-row
      class="mb-2"
      no-gutters>
      <b-col class="d-flex justify-content-start">
        <span
          :class="[ isBetDisabled ? 'opacity-2' : 'opacity-4']"
          class="event-name text-arc-clr-iron font-size-10 pr-3">
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
      class="mb-2"
      no-gutters>
      <b-col>
        <span
          :class="[ isBetDisabled ? 'text-arc-clr-iron' : 'text-arc-clr-iron-light']"
          class="market-name letter-spacing-2 text-truncate">
          {{ bet.marketName }}
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
    <b-row
      class="mb-2"
      no-gutters>
      <b-col>
        <b-row no-gutters>
          <b-col>
            <span
              :class="[ isBetDisabled ? 'opacity-2' : 'opacity-7']"
              class="text-arc-clr-iron font-size-11 letter-spacing-2 d-inline-block">
              {{ bet.oddName }}
            </span>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <div v-if="!isComboBetsMode">
      <b-row no-gutters>
        <b-col>
          <b-row no-gutters>
            <b-col class="mb-1">
              <b-row no-gutters>
                <b-col>
                  <small class="text-arc-clr-iron letter-spacing-2 opacity-4">
                    {{ $t('betslipItem.return') }}
                  </small>
                </b-col>
              </b-row>

              <b-row
                no-gutters
                class="mt-n1">
                <b-col class="potential-return pr-4 text-truncate">
                  <small
                    v-if="getUserActiveWallet"
                    class="text-arc-clr-iron" >
                    {{ formattedPotentialReturn }}
                  </small>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
        <b-col class="d-flex align-items-center justify-content-end">
          <masked-input
            :disabled="isDisabled"
            v-model="betStake"
            :placeholder="$t('betslipItem.stake')"
            :mask="mask"
            type="text"
            name="stake"
            class="betslip-input form-control"
          />
        </b-col>
      </b-row>
    </div>

    <betslip-item-message
      :bet="bet"
      :bet-market-status="betMarketStatus"
      :bet-odd-status="betOddStatus"/>
  </b-card>
</template>

<script>
import Bet from '@/models/bet'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { MARKET_BY_ID_QUERY, EVENT_BET_STOPPED, eventUpdatedSubscription } from '@/graphql'
import { INACTIVE_STATUS, SETTLED_STATUS, INACTIVE_STATUSES } from '@/models/market'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import MaskedInput from 'vue-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import BetslipItem from '@/views/styleguide/Pages/Betslip/component/BetslipItem'
import BetslipItemMessage from '@/components/betslip/BetslipItemMessage'

export default {
  components: {
    BetslipItem,
    BetslipItemMessage,
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
      betOddStatus: null
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
            const market = eventUpdated.dashboardMarket || {}
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
            this.handleMarketStatus({ status: eventBetStopped.marketStatus })
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters('betslip', [
      'getBets',
      'isComboBetsMode',
      'acceptAllChecked'
    ]),
    ...mapGetters(['getUserActiveWallet']),
    mask () {
      return createNumberMask({
        prefix: '',
        allowDecimal: true,
        allowLeadingZeroes: true,
        includeThousandsSeparator: false
      })
    },
    potentialReturn: function () {
      const stake = this.bet.stake > 0 ? this.bet.stake : 0
      return stake * this.bet.approvedOddValue
    },
    formattedPotentialReturn () {
      const currency = this.getUserActiveWallet.currency.code
      return `${parseFloat(this.potentialReturn.toFixed(2))} ${currency}`
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
    isBetDisabled () {
      return this.isDisabled || this.isSettled
    },
    isDisabled () {
      return this.betMarketStatus === Bet.statuses.disabled ||
        this.betOddStatus === Bet.statuses.disabled
    },
    isSettled () {
      return this.status === Bet.statuses.settled
    }
  },
  mounted () {
    this.$emit('betslip-item-mounted')
  },
  methods: {
    ...mapActions('betslip', ['removeBetFromBetslip']),
    ...mapMutations('betslip', ['setBetStake', 'updateBet']),
    updateOdds (market) {
      if (!market.hasOwnProperty('id')) return

      let marketHasOdd = market.odds.some((odd) => this.bet.oddId === odd.id)
      if (!marketHasOdd || INACTIVE_STATUSES.includes(market.status)) {
        this.betOddStatus = Bet.statuses.disabled
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

        if (this.acceptAllChecked && bet.oddsChanged) this.acceptNewOdds()
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
      if (market.status === SETTLED_STATUS) return this.settleBetByMarketStatus()

      this.betMarketStatus = null
      this.updateBet({
        oddId: this.bet.oddId,
        payload: { marketStatus: market.status }
      })
    },
    disableBetByMarketStatus () {
      this.betMarketStatus = Bet.statuses.disabled

      this.updateBet({
        oddId: this.bet.oddId,
        payload: { marketStatus: INACTIVE_STATUS }
      })
    },
    settleBetByMarketStatus () {
      this.betMarketStatus = Bet.statuses.settled

      this.updateBet({
        oddId: this.bet.oddId,
        payload: { marketStatus: SETTLED_STATUS }
      })
    },
    acceptNewOdds () {
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
.market-name {
  display:inline-block;
  max-width: 150px;
  font-size: 12px;
  line-height: 10px;
}
</style>
