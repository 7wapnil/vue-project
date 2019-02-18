<template>
  <div class="m-2">
    <no-bets-block/>
    <b-container
      v-if="getBets.length > 0"
      class="m-0 p-0">

      <b-row
        no-gutters
        class="betslip-header">
        <b-col class="p-0">
          <small>
            <strong class="mr-3 text-arc-clr-iron">
              Betslip
            </strong>
          </small>
          <span
            v-show="getBets.length > 0"
            class="betslip-bet-count-round">
            <small>
              <strong>
                {{ getBets.length }}
              </strong>
            </small>
          </span>
        </b-col>
        <b-col
          class="p-0"
          align="right">
          <b-link
            class="text-arc-clr-iron-light"
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
          nav-class="flex-nowrap"
          nav-wrapper-class="betslip-tabs-wrapper">
          <b-tab
            :title-link-class="changeStyleTab(0)"
            title="Single"
            no-body>
            <b-row no-gutters>
              <b-col>
                <div
                  v-for="bet in getBets"
                  :key="bet.oddId">
                  <betslip-item :bet="bet"/>
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
        v-if="getBets.length > 0"
        bg-variant="arc-clr-soil-black"
        class="px-4 py-3"
        no-body>
        <b-row
          no-gutters
          class="mb-2">
          <b-col cols="8">
            <h6 class="m-0 text-arc-clr-iron">
              Total stake:
            </h6>
          </b-col>
          <b-col class="text-right mr-1">
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
            <h5 class="m-0 text-arc-clr-white">
              <strong>
                {{ parseFloat(getTotalReturn.toFixed(2)) }}
              </strong>
            </h5>
          </b-col>
        </b-row>
      </b-card>
      <b-form-group
        class="“px-3”">
        <b-form-checkbox
          v-model="acceptAllOdds"
          plain>
          Accept all odd changes.
        </b-form-checkbox>
      </b-form-group>
    </b-container>

    <b-card
      bg-variant="arc-clr-soil-black"
      class="px-2 py-2"
      no-body>
      <b-button
        :disabled="!betslipSubmittable"
        variant="arc-primary"
        size="lg"
        block
        @click="submit">
        <span class="text-uppercase">
          Place bet
        </span>
      </b-button>
    </b-card>

  </div>
</template>

<script>
import BetslipItem from './BetslipItem'
import NoBetsBlock from './NoBetsBlock'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import wallets from '@/mixins/wallets'
import BetslipSerializer from '@/services/serializers/betslip'

const BET_DESTROY_TIMEOUT = 5000

export default {
  components: {
    BetslipItem,
    NoBetsBlock
  },
  mixins: [wallets],
  data () {
    return {
      messages: [],
      tabIndex: 0,
      marketIds: [],
      markets: [
        {
          odds: [
            {
              id: '3897271',
              name: 'Hv 71',
              status: 'active',
              value: 2.79
            }, {
              id: '3905832',
              name: 'Hv 71',
              status: 'active',
              value: 2.03
            },
            {
              id: '8392981',
              name: 'Hv 71',
              status: 'active',
              value: 2.03
            }
          ]
        },
        {
          odds: [
            {
              id: '8392981',
              name: 'Hv 71',
              status: 'active',
              value: 2.03
            }, {
              id: '3905831',
              name: 'Hv 71',
              status: 'active',
              value: 2.03
            },
            {
              id: '3897273',
              name: 'Hv 71',
              status: 'active',
              value: 2.03
            }
          ]
        }
      ]
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
      'getBetsMarketIds'
    ]),
    acceptAllOdds: {
      get () {
        return this.acceptAllChecked
      },
      set (value) {
        this.updateAcceptAll(value)
      }
    },
    marketId () {
      return this.getBetsMarketIds
    }
  },
  created () {
    this.updateOdds(this.markets)
  },
  methods: {
    ...mapActions('betslip', [
      'placeBets'
    ]),
    ...mapMutations('betslip', [
      'freezeBets',
      'updateBet',
      'removeBetFromBetslip',
      'clearBetslip',
      'updateAcceptAll',
      'updateOdds'
    ]),
    submit () {
      this.freezeBets()

      let betsPayload = BetslipSerializer.serialize({
        bets: this.getBets,
        currencyCode: this.activeWallet.currency.code
      })

      this.placeBets(betsPayload)
        .then(this.processBetsPlacementResponse)
    },
    processBetsPlacementResponse (response) {
      this.updateBetsFromResponse(response)
    },
    updateBetsFromResponse (response) {
      const bets = this.getBets

      if (response.data && response.data.placeBets) {
        response.data.placeBets.forEach((betPayload) => {
          let bet = bets.find(el => el.oddId === betPayload.id)

          this.updateBet({
            oddId: bet.oddId,
            payload: {
              status: betPayload.status,
              message: betPayload.message,
              externalId: betPayload.id,
              success: betPayload.success
            }
          })

          if (betPayload.success) {
            setTimeout(() => {
              this.removeBetFromBetslip(bet.oddId)
            }, BET_DESTROY_TIMEOUT)
          }
        })
      }
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
