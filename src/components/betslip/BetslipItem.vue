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
        @click="removeBetItem(bet.oddId)">
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
            @input="stakeChanged"
          />
        </b-col>
      </b-row>
    </div>

    <betslip-item-message :bet="bet"/>
  </b-card>
</template>

<script>
import Bet from '@/models/bet'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { MARKET_BY_ID_QUERY, EVENT_BET_STOPPED, eventUpdatedSubscription } from '@/graphql'
import { SETTLED_STATUS } from '@/models/market'
import { ACTIVE } from '@/constants/odd-statuses'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import MaskedInput from 'vue-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import BetslipItem from '@/views/styleguide/Pages/Betslip/component/BetslipItem'
import BetslipItemMessage from '@/components/betslip/BetslipItemMessage'
import { DIGITS_LIMIT_FOR_STAKE } from '@/constants/betslip-settings'

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
          const market = data.markets[0]

          if (!market) return this.disableBetWhenMarketNotFound()

          this.synchronizeMarket(market)
          this.synchronizeOdd(market)
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
            const market = eventUpdated.markets.find((item) => item.id === this.bet.marketId)

            if (!market) return this.disableBetWhenMarketNotFound()

            this.synchronizeEvent(eventUpdated)
            this.synchronizeMarket(market)
            this.synchronizeOdd(market)
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
            const isEnabled = eventBetStopped.marketStatus === ACTIVE && this.bet.marketVisible
            const market = {
              status: eventBetStopped.marketStatus,
              isEnabled: isEnabled,
              visible: this.bet.marketVisible
            }

            this.synchronizeMarket(market)
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
        includeThousandsSeparator: false,
        integerLimit: DIGITS_LIMIT_FOR_STAKE,
        decimalLimit: 2
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
      return !(this.bet.eventEnabled && this.bet.marketEnabled && this.bet.oddEnabled)
    },
    isSettled () {
      return this.bet.marketStatus === SETTLED_STATUS
    }
  },
  mounted () {
    this.$emit('betslip-item-mounted')
  },
  methods: {
    ...mapActions('betslip', ['removeBetFromBetslip', 'resetBetInBetslip']),
    ...mapMutations('betslip', ['setBetStake', 'updateBet']),
    disableBetWhenMarketNotFound () {
      return this.updateBet({
        oddId: this.bet.oddId,
        payload: {
          marketStatus: null,
          marketEnabled: false,
          marketVisible: null
        }
      })
    },
    synchronizeEvent (event) {
      this.updateBet({
        oddId: this.bet.oddId,
        payload: { eventEnabled: event.isEnabled }
      })
    },
    synchronizeMarket (market) {
      this.updateBet({
        oddId: this.bet.oddId,
        payload: {
          marketStatus: market.status,
          marketEnabled: market.isEnabled,
          marketVisible: market.visible
        }
      })
    },
    synchronizeOdd (market) {
      const odd = market.odds.find(item => this.bet.oddId === item.id)
      const oddEnabled = odd && odd.status === ACTIVE
      const approvedOddValue = this.acceptAllChecked && this.bet.oddsChanged
        ? this.bet.currentOddValue
        : this.bet.approvedOddValue

      this.updateBet({
        oddId: this.bet.oddId,
        payload: {
          currentOddValue: odd.value,
          approvedOddValue: approvedOddValue,
          oddEnabled: oddEnabled
        }
      })
    },
    removeBetItem (oddId) {
      this.removeBetFromBetslip(oddId)
    },
    stakeChanged () {
      if (this.bet.notificationCode === Bet.notificationCodes.liability_limit_reached_error) {
        this.resetBetInBetslip(this.bet.oddId)
      }
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
