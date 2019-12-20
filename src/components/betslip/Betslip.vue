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
            :size="24"
            :show="betsLength && !isComboBetsMode"
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
            :disabled="hasAnyFrozenBet && isComboBetsMode"
            :title-link-class="changeStyleTab(0)"
            :title="$t('betslip.tabs.singleBet.title')"
            no-body>
            <b-row no-gutters>
              <b-col>
                <div
                  v-for="betLeg in getBets"
                  :key="`single-${betLeg.oddId}`">
                  <betslip-item :bet="betLeg"/>
                </div>
              </b-col>
            </b-row>

            <div
              v-show="hasBetslipMessages"
              :style="{ 'margin-left': isMobile ? '0' : '6px' }"
              class="card pb-2 pl-3 pr-2 mb-1 bg-arc-clr-soil-dark">
              <betslip-message
                :message="getBetslipMessageObject"
                :show="hasBetslipMessages"/>
            </div>
          </b-tab>

          <b-tab
            :disabled="hasAnyFrozenBet && !isComboBetsMode"
            :title-link-class="changeStyleTab(1)"
            :title="$t('betslip.tabs.comboBets.title')"
            no-body>
            <b-row no-gutters>
              <b-col>
                <div
                  v-for="betLeg in getBets"
                  :key="`combo-${betLeg.oddId}`">
                  <betslip-item :bet="betLeg"/>
                </div>
              </b-col>
            </b-row>

            <div
              v-show="hasBetslipMessages"
              :style="{ 'margin-left': isMobile ? '0' : '6px' }"
              class="card pb-2 pl-3 pr-2 mb-1 mt-n1 bg-arc-clr-soil-dark">
              <betslip-message
                :message="getBetslipMessageObject"
                :show="hasBetslipMessages"/>
            </div>

            <betslip-stake/>
          </b-tab>

        </b-tabs>
      </b-card>

      <b-card
        bg-variant="arc-clr-soil-black"
        class="pl-3 pr-4 py-3"
        no-body>
        <b-row
          v-show="!isComboBetsMode"
          no-gutters
          class="mb-2">
          <b-col cols="8">
            <h6 class="m-0 text-arc-clr-iron">
              {{ $t('betslip.totalStake') }}
            </h6>
          </b-col>
          <b-col class="text-right mr-1">
            <h6 class="total-stake m-0 text-arc-clr-white">
              {{ formattedMoneyAmount(getTotalStakes) }}
            </h6>
          </b-col>
        </b-row>

        <b-row
          v-show="isComboBetsMode"
          no-gutters
          class="mb-2">
          <b-col cols="8">
            <h6 class="m-0 text-arc-clr-iron">
              {{ $t('betslip.totalOdds') }}
            </h6>
          </b-col>
          <b-col class="text-right mr-1">
            <h6 class="total-stake m-0 text-arc-clr-white">
              {{ totalOddsValue | normalizeFloat }}
            </h6>
          </b-col>
        </b-row>
        <b-row no-gutters>
          <b-col cols="8">
            <h5 class="m-0 text-arc-clr-iron">
              {{ $t('betslip.totalReturn') }}
            </h5>
          </b-col>
          <b-col class="text-right mr-1">
            <h5
              id="betslip-total-return"
              class="total-return m-0 text-arc-clr-white font-weight-bold">
              {{ formattedMoneyAmount(getReturn) }}
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
          class="accept-all-odds-checkbox mb-1">
          <span class="font-size-14 text-arc-clr-iron letter-spacing-2 ml-2 pointer">
            {{ $t('betslip.acceptAllCheckbox') }}
          </span>
        </b-form-checkbox>
        <b-form-checkbox
          v-model="keepAllSelections"
          class="accept-all-odds-checkbox">
          <span class="font-size-14 text-arc-clr-iron letter-spacing-2 ml-2 pointer">
            {{ $t('betslip.keepAllSelections') }}
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
          :disabled="!isSubmitButtonEnabled"
          variant="arc-primary"
          class="submit-bets text-uppercase"
          size="lg"
          block
          @click="submit">
          {{ submitButtonCaption }}
        </b-button>

        <spinner-button
          v-if="placingBetInProgress"
          class="submitting">
          {{ $t('betslip.cta.placementInProgress') }}
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
import BetslipMessage from '@/components/betslip/BetslipMessage'
import {
  SINGLE_BET_TAB_INDEX,
  COMBO_BETS_TAB_INDEX,
  DEPOSIT_TAB_INDEX,
  MAX_VALUABLE_RETURN_VALUE
} from '@/constants/betslip-settings'

const REFRESH_BETSLIP_AFTER_PLACING_BET_TIME = 3000
const REFRESH_BETSLIP_TIMEOUT = 1000
const SCROLL_ON_LOAD_TIMEOUT = 1500
const SCROLL_ON_UPDATE_TIMEOUT = 100

export default {
  components: {
    BetslipItem,
    NoBetsBlock,
    SpinnerButton,
    BetslipStake,
    BetslipMessage
  },
  filters: {
    numberize (value) {
      const number = value || 0

      return new Intl
        .NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        .format(number)
    },
    normalizeFloat (value) {
      const number = value || 0

      return parseFloat(number).toFixed(2)
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
      'hasInactiveBets',
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
      'getValidationMessages',
      'getBetslipMessageObject',
      'getBetslipMessageVariant',
      'hasBetslipMessages',
      'hasAnyFrozenBet',
      'getBetslipStake',
      'getBetslipStakeFloat',
      'keepAllSelectionsChecked'
    ]),
    ...mapGetters(['isLoggedIn', 'getUserActiveWallet']),
    acceptAllOdds: {
      get () {
        return this.acceptAllChecked
      },
      set (value) {
        if (value) { this.updateBets() }
        this.setAcceptAll(value)
      }
    },
    keepAllSelections: {
      get () {
        return this.keepAllSelectionsChecked
      },
      set (value) {
        this.setKeepAllSelections(value)
      }
    },
    getTooltipContent () {
      if (!this.isLoggedIn) return this.$i18n.t('betslip.tooltipMessages.default')
      if (!this.hasEnoughFundsOnBalance) return this.$i18n.t('betslip.tooltipMessages.notEnoughFundsOnBalance')

      if (this.isBetslipSubmittable) return

      if (this.hasValidationMessages) return this.getValidationMessages.join('\r\n')

      let content = this.$i18n.t('betslip.tooltipMessages.defaultLoggedIn')
      let conditions = {}

      if (this.isComboBetsMode) {
        conditions = {
          anyConflictedBets: this.anyConflictedBets,
          notEnoughFundsOnBalance: !this.isEnoughFundsCombo,
          notEnoughBetLegs: !(this.betsLength > 1),
          invalidStakeAmount: !this.isValidBetslipStake
        }
      } else {
        conditions = {
          invalidStakeAmount: this.getAnyEmptyStake,
          notEnoughFundsOnBalance: !this.getIsEnoughFundsToBet
        }
      }

      Object.assign(conditions, {
        betsBeingSubmitted: this.getAnySubmittedBet,
        hasInactiveBets: this.hasInactiveBets,
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
      return (this.isComboBetsMode) ? this.getComboReturn : this.getTotalReturn
    },
    isBetslipSubmittable () {
      if (this.hasValidationMessages) return false

      if (this.isComboBetsMode) {
        return this.isComboBetSubmittable
      } else {
        return this.betslipSubmittable
      }
    },
    isSubmitButtonEnabled () {
      return !this.isLoggedIn || !this.hasEnoughFundsOnBalance || this.isBetslipSubmittable
    },
    isValidBetslipStake () {
      return this.getBetslipStakeFloat > 0
    },
    isComboBetSubmittable () {
      return this.betslipComboSubmittable &&
        this.isValidBetslipStake &&
        this.isEnoughFundsCombo
    },
    isEnoughFundsCombo () {
      return this.getFundsToBet >= this.getBetslipStakeFloat
    },
    getComboReturn () {
      return this.getBetslipStakeFloat * this.totalOddsValue
    },
    totalOddsValue () {
      return this.getBets.reduce((totalOdd, bet) => {
        return totalOdd * bet.approvedOddValue
      }, 1)
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
    submitButtonCaption () {
      if (!this.isLoggedIn) return this.$i18n.t('betslip.cta.login')
      if (!this.hasEnoughFundsOnBalance) return this.$i18n.t('betslip.cta.deposit')

      return this.$i18n.t('betslip.cta.placeBet')
    },
    hasEnoughFundsOnBalance () {
      if (this.isComboBetsMode) {
        return this.isEnoughFundsCombo
      } else {
        return this.getIsEnoughFundsToBet
      }
    }
  },
  watch: {
    betsLength (val) {
      if (this.isMobile && !val) this.toggleBetslip()
    },
    isValidationInProgress (validating) {
      if (!validating) setTimeout(this.scrollSubmit, SCROLL_ON_UPDATE_TIMEOUT)
    },
    getBetslipMessageVariant (value) {
      if (value) setTimeout(this.scrollSubmit, SCROLL_ON_UPDATE_TIMEOUT)
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
      'placeBets',
      'refreshBetslip',
      'updateComboBetsMode',
      'clearBetslip'
    ]),
    ...mapMutations(['updateAuth']),
    ...mapMutations('betslip', [
      'setBetStatusAsSubmitted',
      'updateBet',
      'setAcceptAll',
      'toggleBetslip',
      'setKeepAllSelections'
    ]),
    ...mapMutations('tabs', ['changeTabIndex']),
    submit () {
      if (!this.isLoggedIn) return this.displayLoginModal()
      if (!this.hasEnoughFundsOnBalance) return this.displayDepositModal()

      this.setBetStatusAsSubmitted()

      const payload = this.isComboBetsMode ? this.getComboBetPayload() : this.getSingleBetPayload()

      this
        .placeBets(payload)
        .then(this.updateBetsFromResponse)
    },
    displayLoginModal () {
      this.updateAuth(0)
    },
    displayDepositModal () {
      this.changeTabIndex(DEPOSIT_TAB_INDEX)
      this.$bvModal.show('AccountModal')
    },
    getComboBetPayload () {
      return {
        amount: this.getBetslipStakeFloat,
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
    changeBettingTab (newTab) {
      this.updateComboBetsMode({ enabled: newTab === COMBO_BETS_TAB_INDEX })

      setTimeout(this.scrollSubmit, SCROLL_ON_UPDATE_TIMEOUT)
    },
    formattedMoneyAmount (value) {
      if (value <= MAX_VALUABLE_RETURN_VALUE) {
        return new Intl
          .NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          .format(value)
      } else {
        const formattedNumber = new Intl
          .NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          .format(MAX_VALUABLE_RETURN_VALUE)

        return this.$i18n.t('betslip.bigNumber', { number: formattedNumber })
      }
    },
  }
}
</script>
