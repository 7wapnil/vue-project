<template>
  <div>
    <no-bets-block/>
    <b-container
      v-if="getBets.length > 0"
      class="p-0">
      <b-row
        no-gutters
        class="py-3 px-4">
        <b-col class="p-0">
          <span class="mr-2 text-arc-clr-iron letter-spacing-2 font-size-11">
            BETSLIP
          </span>
          <arc-circle
            v-show="getBets.length > 0"
            :size="24"
            class="font-weight-bold font-size-12"
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
            class="text-arc-clr-iron-light font-size-14"
            @click="clearBetslip">
            Clear all
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
                  :key="index">
                  <betslip-item
                    :parent-refs="$refs"
                    :bet="bet"/>
                </div>
              </b-col>
            </b-row>
          </b-tab>

          <b-tab
            :title-link-class="changeStyleTab(1)"
            title="Combo"
            no-body>
            <p class="p-5 text-center bg-arc-clr-soil-dark">
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
            <h6 class="m-0 text-arc-clr-white">
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
            <h5 class="m-0 text-arc-clr-white font-weight-bold">
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
            Accept all odd changes
          </span>
        </b-form-checkbox>
      </b-form-group>
    </b-container>

    <b-row
      v-b-popover.hover.top="getTooltipContent"
      id="betslip-submit"
      ref="parent-button"
      no-gutters
      class="p-2 bg-arc-clr-soil-black">
      <b-col>
        <b-button
          :disabled="!betslipSubmittable"
          variant="arc-primary"
          size="lg"
          block
          @click="submit">
          PLACE BET
        </b-button>

        <spinner-button v-if="false">
          Placing bet
        </spinner-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import BetslipItem from './BetslipItem'
import NoBetsBlock from './NoBetsBlock'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import wallets from '@/mixins/wallets'
import SpinnerButton from './SpinnerButton'

export default {
  components: {
    BetslipItem,
    NoBetsBlock,
    SpinnerButton
  },
  mixins: [wallets],
  data () {
    return {
      messages: [],
      tabIndex: 0,
      valuesUnconfirmed: false
    }
  },
  computed: {
    ...mapGetters('betslip', [
      'betslipSubmittable',
      'getBets',
      'getBetsCount',
      'getTotalReturn',
      'getTotalStakes',
      'acceptAllChecked',
      'betslipValuesConfirmed',
      'getIsEnoughFundsToBet',
      'getAnyInactiveMarket',
      'getAnySubmittedBet',
      'getAnyEmptyStake'
    ]),
    ...mapGetters(['isLoggedIn']),
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
      let content
      if (!this.betslipSubmittable) {
        if (!this.getBets.length) {
          this.isLoggedIn
            ? content = this.$i18n.t('betslip.tooltipMessages.defaultLoggedIn')
            : content = this.$i18n.t('betslip.tooltipMessages.default')
        } else {
          if (!this.betslipValuesConfirmed) {
            content = this.$i18n.t('betslip.tooltipMessages.oddsNotConfirmed')
          } else if (!this.getIsEnoughFundsToBet) {
            content = this.$i18n.t('betslip.tooltipMessages.notEnoughMoney')
          } else if (this.getAnyInactiveMarket) {
            content = this.$i18n.t('betslip.tooltipMessages.inactiveMarkets')
          } else if (this.getAnySubmittedBet) {
            content = this.$i18n.t('betslip.tooltipMessages.betsBeingSubmitted')
          } else if (this.getAnyEmptyStake) {
            content = this.$i18n.t('betslip.tooltipMessages.invalidStakeAmount')
          } else {
            content = this.$i18n.t('betslip.tooltipMessages.default')
          }
        }
      }
      return content
    }
  },
  created () {
    this.subscribeBets()
  },
  methods: {
    ...mapActions('betslip', [
      'subscribeBets',
      'unsubscribeBets',
      'placeBets'
    ]),
    ...mapMutations('betslip', [
      'setBetStatusAsSubmitted',
      'updateBet',
      'removeBetFromBetslip',
      'clearBetslip',
      'updateAcceptAll'
    ]),
    submit () {
      this.setBetStatusAsSubmitted()

      const payload = this.getBets.map((bet) => {
        return {
          amount: parseFloat(bet.stake),
          oddId: bet.oddId,
          oddValue: bet.approvedOddValue,
          currencyCode: this.activeWallet.currency.code
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
          let betId = (betPayload.bet) ? betPayload.bet.id : null

          this.updateBet({
            oddId: bet.oddId,
            payload: {
              id: betId,
              message: betPayload.message,
              externalId: betPayload.id,
              success: betPayload.success
            }
          })
        })
        this.subscribeBets()
      }
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
    }
  }
}
</script>
