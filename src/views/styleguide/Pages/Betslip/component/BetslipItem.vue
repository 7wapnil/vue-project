<template>
  <div>
    <b-card
      bg-variant="arc-clr-soil-dark"
      no-body
      class="p-2 mb-1">

      <b-row no-gutters>
        <b-col
          class="d-flex justify-content-center market-name">
          <small class="pt-1 text-arc-clr-iron-light">
            {{ bet.eventName }}
          </small>
        </b-col>
        <b-col
          cols="auto"
          class="d-flex justify-content-center">
          <icon
            size="12px"
            name="betslip-close"/>
        </b-col>
      </b-row>

      <b-row no-gutters>
        <b-col class="mt-2 d-flex justify-content-center">
          <h6>
            <strong>
              {{ bet.marketName }}
            </strong>
          </h6>
        </b-col>
      </b-row>

      <b-row no-gutters>
        <b-col cols="4">
          <b-row no-gutters>
            <b-col
              align="center"
              class="p-2">
              <small>
                {{ bet.oddName }}
              </small>
            </b-col>
          </b-row>

          <b-row no-gutters>
            <b-col>
              <b-button
                class="text-arc-clr-gold bg-arc-clr-soil-cover d-flex justify-content-center align-items-center p-0"
                variant="arc-betslip-odd">
                <small>
                  <strong>
                    {{ bet.currentOddValue }}
                  </strong>
                </small>
              </b-button>
            </b-col>
          </b-row>

        </b-col>

      </b-row>

      <b-row class="mt-2 pl-2 pr-1">
        <b-col cols="8">
          <small>Potential Return:</small>
        </b-col>
        <b-col
          cols="4"
          align="right">
          <small>
            120
          </small>
        </b-col>
      </b-row>
    </b-card>

    <b-card
      bg-variant="arc-clr-soil-dark"
      class="mb-1"
      no-body>
      <b-container class="py-3 pl-4 pr-2">
        <b-row no-gutters>
          <b-col>
            <b-row no-gutters>
              <b-col class="mb-1">
                <small class="text-arc-clr-iron">
                  <strong class="text-uppercase">
                    Stake:
                  </strong>
                </small>
              </b-col>
            </b-row>
            <b-row no-gutters>
              <b-col class="d-flex align-items-center">
                <icon
                  name="betslip-stake"
                  size="12px"
                  class="mr-1"/>
                <small class="text-arc-clr-iron-light">
                  Bet max
                </small>
              </b-col>
            </b-row>
          </b-col>
          <b-col
            class="d-flex align-items-center"
            style="max-width: 79px">
            <b-input
              :placeholder="$t('betslipItem.stake')"
              class="betslip-input"
              type="number"
              name="odd-value"
              min="0"/>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
  </div>
</template>

<script>
import OddButton from '@/components/markets/OddButton.vue'

export default {
  components: {
    OddButton
  },
  props: {
    bet: {
      type: Object,
      required: true
    },
  }
}
</script>
