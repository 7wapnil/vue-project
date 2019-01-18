<template>
  <div class="betslip-block">
    <b-container
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
            class="betslip-bet-count-round">
            <small>
              <strong>
                10
              </strong>
            </small>
          </span>
        </b-col>
        <b-col
          class="p-0"
          align="right">
          <b-link
            class="text-arc-clr-iron-light">
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
                  v-for="(bet, index) in bets"
                  :key="index">
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
              120
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
                260
              </strong>
            </h5>
          </b-col>
        </b-row>
      </b-card>

    </b-container>

    <b-card
      bg-variant="arc-clr-soil-black"
      class="px-2 py-2"
      no-body>
      <b-button
        variant="arc-primary"
        size="lg"
        block>
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

export default {
  components: {
    BetslipItem,
    NoBetsBlock
  },
  data () {
    return {
      messages: [],
      tabIndex: 0,
      bets: [{
        eventName: 'Super Event',
        marketName: 'Market',
        oddName: 'Super team',
        currentOddValue: 6,
      }]
    }
  },
  methods: {
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
