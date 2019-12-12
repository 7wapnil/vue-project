<template>
  <div>
    <no-bets-block/>
    <b-container
      v-if="betsLength"
      class="p-0">
      <b-row
        no-gutters
        class="py-3 px-4 bg-arc-clr-soil-black">
        <b-col
          v-if="!!this.$slots.close"
          cols="1">
          <slot name="close"/>
        </b-col>
        <b-col
          :class="{ 'ml-2' : !!this.$slots.close }"
          class="p-0">
          <span class="mr-2 text-arc-clr-iron letter-spacing-2 font-size-11 text-uppercase">
            Betslip
          </span>
          <arc-circle
            v-show="betsLength"
            :size="24"
            class="bet-amount font-weight-bold font-size-12"
            bg-color="arc-clr-soil-cover"
            depends
            inline>
            {{ betsLength }}
          </arc-circle>
        </b-col>
        <b-col
          class="p-0"
          align="right">
          <b-link
            class="clear text-arc-clr-iron-light font-size-14"
            @click="clearBetslip">
            {{ $t('betslip.cta.clearAll') }}
          </b-link>
        </b-col>
      </b-row>
      <b-card
        no-body
        bg-variant="arc-clr-soil-black">
        <b-tabs
          v-model="tabIndex"
          nav-wrapper-class="betslip-nav-wrapper"
          @input="changeBettingTab">
          <b-tab
            :title-link-class="changeStyleTab(0)"
            title="Single"
            no-body>
            <b-row no-gutters>
              <b-col>
                <div
                  v-for="betLeg in getBets"
                  :key="`single-${betLeg.oddId}`">
                  <betslip-item
                    :bet="betLeg"/>
                </div>
              </b-col>
            </b-row>
          </b-tab>

          <b-tab
            :title-link-class="changeStyleTab(1)"
            title="Combo"
            no-body>
            <b-row no-gutters>
              <b-col>
                <div
                  v-for="betLeg in getBets"
                  :key="`combo-${betLeg.oddId}`">
                  <betslip-item
                    :bet="betLeg"/>
                </div>
              </b-col>
            </b-row>

            <betslip-stake
              :is-disabled="false"
              :integer-limit="digitsLimitForStake"
              :decimal-limit="2"
              @stake-changed:betslip-stake="updateComboStake"/>
          </b-tab>

        </b-tabs>
      </b-card>

      <b-card
        bg-variant="arc-clr-soil-black"
        class="pl-3 pr-4 py-3"
        no-body>
        <b-row
          v-if="!isComboBetsMode"
          no-gutters
          class="mb-2">
          <b-col cols="8">
            <h6 class="m-0 text-arc-clr-iron">
              Total stake:
            </h6>
          </b-col>
          <b-col class="text-right mr-1">
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
            <h5
              id="betslip-total-return"
              class="total-return m-0 text-arc-clr-white font-weight-bold">
              {{ formattedReturn }}
            </h5>
            <b-tooltip
              target="betslip-total-return"
              triggers="hover">
              {{ getReturn | numberize }}
            </b-tooltip>
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
      ref="betslip-submit"
      no-gutters
      class="p-2 bg-arc-clr-soil-black">
      <b-col>
        <b-button
          v-if="!getAnySubmittedBet && !getAnyBetInValidation"
          :disabled="!isBetslipSubmittable"
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
import BetslipStake from '@/components/betslip/BetslipStake'

const REFRESH_BETSLIP_AFTER_PLACING_BET_TIME = 3000
const REFRESH_BETSLIP_TIMEOUT = 1000
const SCROLL_ON_LOAD_TIMEOUT = 1000
const SCROLL_ON_UPDATE_TIMEOUT = 100
const SINGLE_BET_TAB_INDEX = 0
const COMBO_BETS_TAB_INDEX = 1
const MAX_VALUABLE_RETURN_VALUE = 1000000000
const DIGITS_LIMIT_FOR_STAKE = 7

export default {
  components: {
    BetslipItem,
    NoBetsBlock,
    SpinnerButton,
    BetslipStake
  },
  filters: {
    numberize (value) {
      return value ? new Intl.NumberFormat().format(value) : 0
    }
  },
  data () {
    return {
      comboStake: ''
    }
  },
  computed: {
    ...mapGetters('betslip', [
      'betslipSubmittable',
      'betslipComboSubmittable',
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
      'getAnyBetInValidation',
      'getFundsToBet',
      'isComboBetsMode',
      'anyConflictedBets',
      'isValidating',
      'hasValidationMessages',
      'getValidationMessages'
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
      if (this.isBetslipSubmittable) return
      if (!this.isLoggedIn) return this.$i18n.t('betslip.tooltipMessages.default')
      if (this.hasValidationMessages) return this.getValidationMessages.join('\r\n')

      let content = this.$i18n.t('betslip.tooltipMessages.defaultLoggedIn')
      let conditions = {}

      if (this.isComboBetsMode) {
        conditions = {
          anyConflictedBets: this.anyConflictedBets,
          notEnoughMoney: !this.isEnoughFundsCombo,
          notEnoughBetLegs: !(this.betsLength > 1),
          invalidStakeAmount: !this.isValidComboStake
        }
      } else {
        conditions = {
          invalidStakeAmount: this.getAnyEmptyStake,
          notEnoughMoney: !this.getIsEnoughFundsToBet
        }
      }

      Object.assign(conditions, {
        betsBeingSubmitted: this.getAnySubmittedBet,
        inactiveMarkets: this.getAnyInactiveMarket,
        oddsNotConfirmed: !this.betslipValuesConfirmed,
        unacceptableBets: !this.getAllBetsAcceptable,
      })

      const matchedKey = Object.keys(conditions).find((translationKey) => conditions[translationKey])
      if (matchedKey) {
        content = this.$i18n.t(`betslip.tooltipMessages.${matchedKey}`)
      }

      return content
    },
    betsLength () {
      return this.getBets ? this.getBets.length : 0
    },
    getReturn () {
      return (this.isComboBetsMode) ? this.getComboReturn : parseFloat(this.getTotalReturn.toFixed(2))
    },
    formattedReturn () {
      if (this.getReturn <= MAX_VALUABLE_RETURN_VALUE) {
        return new Intl.NumberFormat().format(this.getReturn)
      } else {
        return this.$i18n.t('betslip.bigNumber', {
          number: new Intl.NumberFormat().format(MAX_VALUABLE_RETURN_VALUE)
        })
      }
    },
    isBetslipSubmittable () {
      if (this.hasValidationMessages) return false

      if (this.isComboBetsMode) {
        return this.isComboBetSubmittable
      } else {
        return this.betslipSubmittable
      }
    },
    isValidComboStake () {
      return this.comboStake > 0
    },
    isComboBetSubmittable () {
      return this.betslipComboSubmittable &&
        this.isValidComboStake &&
        this.isEnoughFundsCombo
    },
    isEnoughFundsCombo () {
      return this.getFundsToBet > this.comboStake
    },
    getComboReturn () {
      const bets = this.getBets
      const totalOdd = bets.reduce((totalOdd, bet) => {
        return totalOdd * bet.approvedOddValue
      }, 1)

      return (Number(this.comboStake) * totalOdd).toFixed(2)
    },
    tabIndex: {
      get () {
        return this.isComboBetsMode ? COMBO_BETS_TAB_INDEX : SINGLE_BET_TAB_INDEX
      },
      set () {}
    },
    isValidationInProgress () {
      return this.isValidating
    },
    digitsLimitForStake () {
      return DIGITS_LIMIT_FOR_STAKE
    }
  },
  watch: {
    betsLength (val) {
      if (this.isMobile && !val) this.toggleBetslip()
      if (!val) this.resetBetslip()
    },
    isValidationInProgress (validating) {
      if (!validating) setTimeout(this.scrollSubmit, SCROLL_ON_UPDATE_TIMEOUT)
    }
  },
  created () {
    this.subscribeBets()
    setTimeout(this.refreshBetslip, REFRESH_BETSLIP_TIMEOUT)
  },
  mounted () {
    setTimeout(this.scrollSubmit, SCROLL_ON_LOAD_TIMEOUT)
  },
  methods: {
    ...mapActions('betslip', [
      'subscribeBets',
      'unsubscribeBets',
      'placeBets',
      'refreshBetslip',
      'removeBetFromBetslip',
      'updateComboBetsMode'
    ]),
    ...mapMutations('betslip', [
      'setBetStatusAsSubmitted',
      'updateBet',
      'clearBetslip',
      'updateAcceptAll',
      'toggleBetslip'
    ]),
    submit () {
      this.setBetStatusAsSubmitted()

      const payload = this.isComboBetsMode ? this.getComboBetPayload() : this.getSingleBetPayload()

      this
        .placeBets(payload)
        .then(this.updateBetsFromResponse)
    },
    getComboBetPayload () {
      return {
        amount: parseFloat(this.comboStake),
        odds: this.getBets.map(bet => {
          return { id: bet.oddId, value: bet.approvedOddValue }
        }),
        currencyCode: this.getUserActiveWallet.currency.code,
        oddsChange: this.acceptAllOdds
      }
    },
    getSingleBetPayload () {
      return this.getBets.map((bet) => {
        return {
          amount: parseFloat(bet.stake),
          odds: [{ id: bet.oddId, value: bet.approvedOddValue }],
          currencyCode: this.getUserActiveWallet.currency.code,
          oddsChange: this.acceptAllOdds
        }
      })
    },
    scrollSubmit () {
      const submitButton = this.$refs['betslip-submit']
      submitButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
    },
    updateBetsFromResponse (response) {
      const bets = this.getBets

      this.betListFromResponse(response).forEach((betPayload) => {
        const betFromPayload = betPayload.bet || {}
        const betLegs = betFromPayload.betLegs || []
        const betId = betFromPayload.id
        const betStatus = this.betStatusFromResponse(betFromPayload)

        betLegs.forEach(betLeg => {
          const bet = bets.find(el => el.oddId === betLeg.oddId)

          this.updateBet({
            oddId: bet.oddId,
            payload: {
              id: betId,
              status: betStatus,
              message: betPayload.message,
              externalId: betLeg.oddId,
              success: betPayload.success
            }
          })
        })
      })
      this.subscribeBets()
      setTimeout(this.refreshBetslip, REFRESH_BETSLIP_AFTER_PLACING_BET_TIME)
    },
    betListFromResponse (response) {
      if (!response.hasOwnProperty('data')) return []

      if (response.data.hasOwnProperty('placeBets')) {
        return response.data.placeBets
      } else if (response.data.hasOwnProperty('placeComboBets')) {
        return [response.data.placeComboBets]
      } else {
        return []
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
      return (this.tabIndex === index) ? 'betslipActiveTab' : 'betslipTab'
    },
    resetBetslip () {
      this.clearComboStake()
    },
    updateComboStake (stake) {
      this.comboStake = stake
    },
    clearComboStake () {
      this.comboStake = ''
    },
    changeBettingTab (newTab) {
      this.updateComboBetsMode({ enabled: newTab === COMBO_BETS_TAB_INDEX })

      setTimeout(this.scrollSubmit, SCROLL_ON_UPDATE_TIMEOUT)
    }
  }
}
</script>
