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
            {{ betslipLength }}
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
          nav-wrapper-class="betslip-nav-wrapper">
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
                    :bet="betLeg"
                    @mounted:betslip-item="scrollSubmit"/>
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
                  :key="`combo-${betLeg.oddId}`"
                >
                  <betslip-item
                    :bet="betLeg"
                    :is-combo="true"
                    @mounted:betslip-item="scrollSubmit"
                  />
                </div>
              </b-col>
            </b-row>

            <betslip-stake
              :is-disabled="false"
              @stake-changed:betslip-stake="updateComboStake"/>
          </b-tab>

        </b-tabs>
      </b-card>

      <b-card
        bg-variant="arc-clr-soil-black"
        class="pl-3 pr-4 py-3"
        no-body>
        <b-row
          v-if="!isComboTab"
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
              {{ getReturn }}
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
const COMBO_TAB_INDEX = 1

export default {
  components: {
    BetslipItem,
    NoBetsBlock,
    SpinnerButton,
    BetslipStake
  },
  data () {
    return {
      tabIndex: 0,
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
      'getFundsToBet'
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

      let content = this.$i18n.t('betslip.tooltipMessages.defaultLoggedIn')

      const conditions = {
        unacceptableBets: !this.getAllBetsAcceptable,
        oddsNotConfirmed: !this.betslipValuesConfirmed,
        notEnoughMoney: !this.getIsEnoughFundsToBet,
        inactiveMarkets: this.getAnyInactiveMarket,
        betsBeingSubmitted: this.getAnySubmittedBet
      }

      if (this.isComboTab) {
        conditions.invalidStakeAmount = !this.isValidComboStake
        conditions.notEnoughBetLegs = !(this.betsLength > 1)
        conditions.notEnoughMoney = !this.isEnoughFundsCombo
      } else {
        conditions.invalidStakeAmount = this.getAnyEmptyStake
      }

      Object.keys(conditions).forEach((translationKey) => {
        const condition = conditions[translationKey]
        if (condition === true) {
          content = this.$i18n.t(`betslip.tooltipMessages.${translationKey}`)
        }
      })

      return content
    },
    betsLength () {
      if (this.getBets) {
        return (!this.isComboTab) ? this.getBets.length : 1
      }
    },
    betslipLength () {
      return this.isComboTab ? 1 : this.betsLength
    },
    isComboTab () {
      return this.tabIndex === COMBO_TAB_INDEX
    },
    getReturn () {
      if (this.isComboTab) {
        return this.getComboReturn
      } else {
        return parseFloat(this.getTotalReturn.toFixed(2))
      }
    },
    isBetslipSubmittable () {
      if (this.isComboTab) {
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
      const stake = this.comboStake
      const value = bets
        .map(el => (stake > 0 ? stake : 0) * el.approvedOddValue)
        .reduce((a, b) => Number(a) * Number(b), 1)
      return parseFloat(value.toFixed(2))
    }
  },
  watch: {
    betsLength (val) {
      if (this.isMobile && !val) {
        this.toggleBetslip()
      }

      if (!val) {
        this.resetBetslip()
      }
    }
  },
  created () {
    this.subscribeBets()
    setTimeout(this.refreshBetslip, REFRESH_BETSLIP_TIMEOUT)
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

      const payload = this.isComboTab ? this.getComboBetPayload() : this.getSingleBetPayload()

      this.placeBets({ payload, isCombo: this.isComboTab })
        .then(this.updateBetsFromResponse)
    },
    getComboBetPayload () {
      const payload = {
        amount: parseFloat(this.comboStake),
        odds: this.getBets.map(bet => {
          return { id: bet.oddId, value: bet.approvedOddValue }
        }),
        currencyCode: this.getUserActiveWallet.currency.code
      }

      return payload
    },
    getSingleBetPayload () {
      const payload = this.getBets.map((bet) => {
        return {
          amount: parseFloat(bet.stake),
          odds: [{ id: bet.oddId, value: bet.approvedOddValue }],
          currencyCode: this.getUserActiveWallet.currency.code
        }
      })

      return payload
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
      if (this.tabIndex === index) {
        return 'betslipActiveTab'
      } else {
        return 'betslipTab'
      }
    },
    resetBetslip () {
      this.tabIndex = 0
      this.clearComboStake()
    },
    updateComboStake (stake) {
      this.comboStake = stake
    },
    clearComboStake () {
      this.comboStake = ''
    }
  }
}
</script>
