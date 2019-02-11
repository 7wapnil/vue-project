<template>
  <b-card
    no-body
    style="min-width: 714px"
    class="mb-1 upcoming-card"
    bg-variant="arc-clr-soil-dark">
    <b-card-body class="h-100 p-0">
      <b-row
        v-b-toggle="'event-details-market-' + market.id"
        no-gutters
        role="tab"
        style="height: 44px">
        <b-col
          cols="auto"
          class="px-4 py-3 d-flex align-items-center justify-content-center">
          <icon
            role="button"
            tabindex="0"
            size="7.5px"
            name="event-details-chevron-down"/>
        </b-col>
        <b-col class="d-flex align-items-center">
          <h6 class="mb-0 font-weight-bold text-arc-clr-iron-light">
            {{ market.name }}
          </h6>
        </b-col>
      </b-row>
    </b-card-body>
    <b-row
      no-gutters
      role="tablist">
      <b-col style="min-height: 0">
        <b-collapse
          :id="'event-details-market-' + `${market.id}`"
          visible>
          <b-row
            :data-id="market.id"
            no-gutters
            class="pb-2 pl-3 market-odds"
            style="border-radius: 0 0 4px 4px">
            <b-col
              v-for="odd in market.odds"
              :key="odd.id"
              class="mr-3 text-truncate market-odd">
              <b-row
                align-v="center"
                class="bg-arc-clr-soil-darker"
                style="border-radius: 0 6px 6px 6px"
                no-gutters>
                <b-col class="pl-3 mr-3 d-inline-block text-truncate text-arc-clr-iron-light font-size-md">
                  {{ odd.name }}
                </b-col>
                <b-col
                  cols="3"
                  style="min-width: 90px">
                  <odd-button
                    :odd="odd"
                    :disabled="isDisabled"
                    :event="event"
                    :market="market"
                    variant="arc-event-page-odd"/>
                </b-col>
              </b-row>
            </b-col>
          </b-row>

        </b-collapse>
      </b-col>
    </b-row>
  </b-card>
</template>
<script>
import {
  SUSPENDED_STATUS,
  INACTIVE_STATUS as MARKET_INACTIVE_STATUS,
  SETTLED_STATUS,
  HANDED_OVER_STATUS
} from '@/models/market'
import OddButton from '@/components/markets/OddButton'

export default {
  components: {
    OddButton
  },
  props: {
    event: {
      type: Object,
      required: true
    },
    market: {
      type: Object,
      required: true
    }
  },
  computed: {
    isDisabled () {
      const isDisabledByAPI = [
        SUSPENDED_STATUS,
        MARKET_INACTIVE_STATUS,
        SETTLED_STATUS,
        HANDED_OVER_STATUS
      ].includes(this.market.status)

      const isDisabledByAppState = this.event.live
        ? !this.isLiveConnected
        : !this.isPreLiveConnected

      return isDisabledByAPI || isDisabledByAppState
    }
  }
}
</script>
