<template>
  <div>
    <no-bets-block/>
    <b-container
      v-if="getBets.length > 0"
      class="p-0">
      <b-row
        no-gutters
        class="py-3 px-4 bg-arc-clr-soil-black">
        <b-col
          v-if="!!this.$slots.close"
          cols="1">
          <slot name="close"/>
        </b-col>
        <b-col class="p-0">
          <span class="mr-2 text-arc-clr-iron letter-spacing-2 font-size-11">
            BETSLIP
          </span>
          <arc-circle
            v-show="getBets.length > 0"
            :size="24"
            class="bet-amount font-weight-bold font-size-12"
            bg-color="arc-clr-soil-cover"
            depends
            inline>
            {{ getBets.length }}
          </arc-circle>
        </b-col>
        <b-col
          class="p-0"
          align="right">
          <b-link
            class="clear text-arc-clr-iron-light font-size-14"
            @click="callBetslipClear">
            {{ $t('betslip.cta.clearAll') }}
          </b-link>
        </b-col>
      </b-row>
      <b-card
        no-body
        bg-variant="arc-clr-soil-black">
        <b-tabs
          v-model="tabIndex"
          nav-wrapper-class="betslip-nav-wrapper">
          <b-tab
            :title-link-class="changeStyleTab(0)"
            title="Single"
            no-body>
            <b-row no-gutters>
              <b-col>
                <div
                  v-for="(bet, index) in getBets"
                  :key="`${bet.oddId}-${index}`">
                  <betslip-item
                    :bet="bet"/>
                </div>
              </b-col>
            </b-row>
          </b-tab>

          <b-tab
            :title-link-class="changeStyleTab(1)"
            title="Combo"
            no-body>
            <p
              :style="{ 'margin-left': isMobile ? '0' : '6px' }"
              class="p-5 text-center bg-arc-clr-soil-dark">
              To be implemented
            </p>
          </b-tab>

        </b-tabs>
      </b-card>

      <b-card
        bg-variant="arc-clr-soil-black"
        class="pl-3 pr-4 py-3"
        no-body>
        <b-row
          no-gutters
          class="mb-2">
          <b-col cols="8">
            <h6 class="m-0 text-arc-clr-iron">
              Total stake:
            </h6>
          </b-col>
          <b-col class="text-right mr-4">
            <h6 class="total-stake m-0 text-arc-clr-white">
              {{ parseFloat(getTotalStakes.toFixed(2)) }}
            </h6>
          </b-col>
        </b-row>
        <b-row no-gutters>
          <b-col cols="8">
            <h5 class="m-0 text-arc-clr-iron">
              Total return:
            </h5>
          </b-col>
          <b-col class="text-right mr-1">
            <h5 class="total-return m-0 text-arc-clr-white font-weight-bold">
              {{ parseFloat(getTotalReturn.toFixed(2)) }}
            </h5>
          </b-col>
        </b-row>
      </b-card>
      <b-form-group
        class="px-3 pb-3 mb-0 bg-arc-clr-soil-black">
        <b-form-checkbox
          v-model="acceptAllOdds"
          class="accept-all-odds-checkbox">
          <span class="font-size-14 text-arc-clr-iron letter-spacing-2 ml-2 pointer">
            {{ $t('betslip.acceptAllCheckbox') }}
          </span>
        </b-form-checkbox>
      </b-form-group>
    </b-container>

    <b-row
      v-b-popover.hover.top="getTooltipContent"
      id="betslip-submit"
      no-gutters
      class="p-2 bg-arc-clr-soil-black">
      <b-col>
        <b-button
          v-if="!getAnySubmittedBet && !getAnyBetInValidation"
          :disabled="!betslipSubmittable"
          variant="arc-primary"
          class="submit-bets text-uppercase"
          size="lg"
          block
          @click="submit">
          {{ $t('betslip.cta.placeBet') }}
        </b-button>

        <spinner-button
          v-if="placingBetInProgress"
          class="submitting">
          Placing bet
        </spinner-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Bet from '@/models/bet'
import BetslipItem from './BetslipItem'
import NoBetsBlock from './NoBetsBlock'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import SpinnerButton from './SpinnerButton'

const REFRESH_SLIP_AFTER_PLACING_BET_TIME = 3 * 1000

export default {
  components: {
    BetslipItem,
    NoBetsBlock,
    SpinnerButton
  },
  data () {
    return {
      tabIndex: 0
    }
  },
  computed: {
    ...mapGetters('betslip', [
      'betslipSubmittable',
      'getBets',
      'getTotalReturn',
      'getTotalStakes',
      'acceptAllChecked',
      'betslipValuesConfirmed',
      'getIsEnoughFundsToBet',
      'getAnyInactiveMarket',
      'getAnySubmittedBet',
      'getAnyEmptyStake',
      'getAllBetsAcceptable',
      'placingBetInProgress',
      'getAnyBetInValidation'
    ]),
    ...mapGetters(['isLoggedIn', 'getUserActiveWallet']),
    acceptAllOdds: {
      get () {
        return this.acceptAllChecked
      },
      set (value) {
        if (value) { this.updateBets() }
        this.updateAcceptAll(value)
      }
    },
    getTooltipContent () {
      if (this.betslipSubmittable) return

      if (!this.isLoggedIn) return this.$i18n.t('betslip.tooltipMessages.default')

      let content = this.$i18n.t('betslip.tooltipMessages.defaultLoggedIn')

      const conditions = {
        unacceptableBets: !this.getAllBetsAcceptable,
        oddsNotConfirmed: !this.betslipValuesConfirmed,
        notEnoughMoney: !this.getIsEnoughFundsToBet,
        inactiveMarkets: this.getAnyInactiveMarket,
        betsBeingSubmitted: this.getAnySubmittedBet,
        invalidStakeAmount: this.getAnyEmptyStake
      }

      Object.keys(conditions).forEach((translationKey) => {
        const condition = conditions[translationKey]
        if (condition === true) {
          content = this.$i18n.t(`betslip.tooltipMessages.${translationKey}`)
        }
      })

      return content
    }
  },
  created () {
    this.subscribeBets()
    setTimeout(this.refreshBetslip, 1000)
  },
  methods: {
    ...mapActions('betslip', [
      'subscribeBets',
      'unsubscribeBets',
      'placeBets',
      'refreshBetslip'
    ]),
    ...mapMutations('betslip', [
      'setBetStatusAsSubmitted',
      'updateBet',
      'removeBetFromBetslip',
      'clearBetslip',
      'updateAcceptAll',
      'toggleBetslip'
    ]),
    submit () {
      this.setBetStatusAsSubmitted()

      const payload = this.getBets.map((bet) => {
        return {
          amount: parseFloat(bet.stake),
          oddId: bet.oddId,
          oddValue: bet.approvedOddValue,
          currencyCode: this.getUserActiveWallet.currency.code
        }
      })

      this.placeBets(payload)
        .then(this.updateBetsFromResponse)
    },
    updateBetsFromResponse (response) {
      const bets = this.getBets

      if (response.data && response.data.placeBets) {
        response.data.placeBets.forEach((betPayload) => {
          let bet = bets.find(el => el.oddId === betPayload.id)

          let betFromPayload = betPayload.bet || {}
          let betId = betFromPayload.id
          let betStatus = this.betStatusFromResponse(betFromPayload)

          this.updateBet({
            oddId: bet.oddId,
            payload: {
              id: betId,
              status: betStatus,
              message: betPayload.message,
              externalId: betPayload.id,
              success: betPayload.success
            }
          })
        })
        this.subscribeBets()
        setTimeout(this.refreshBetslip, REFRESH_SLIP_AFTER_PLACING_BET_TIME);
      }
    },
    betStatusFromResponse (bet) {
      if (bet.status === Bet.statuses.initial) { return Bet.statuses.submitted }
      if (bet.status) { return bet.status }

      return Bet.statuses.failed
    },
    updateBets () {
      this.getBets.forEach(bet => {
        this.updateBet({
          oddId: bet.oddId,
          payload: { approvedOddValue: bet.currentOddValue }
        })
      })
    },
    changeStyleTab (index) {
      if (this.tabIndex === index) {
        return 'betslipActiveTab'
      } else {
        return 'betslipTab'
      }
    },
    callBetslipClear () {
      if (this.isMobile) {
        this.clearBetslip()
        this.toggleBetslip()
      }
      this.clearBetslip()
    }
  }
}
</script>
