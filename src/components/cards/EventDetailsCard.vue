<template>
  <b-card
    no-body
    class="mb-1 upcoming-card"
    bg-variant="arc-clr-soil-dark">
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
    <b-row
      no-gutters
      role="tablist">
      <b-col>
        <b-collapse
          :id="'event-details-market-' + `${market.id}`"
          visible>
          <b-row
            :data-id="market.id"
            no-gutters
            class="pl-2">
            <b-col
              v-for="odd in market.odds"
              :cols="computedCols"
              :key="odd.id"
              class="pr-2 mb-2">
              <b-row
                class="bg-arc-clr-soil-darker h-100"
                style="border-radius: 0 8px 8px 8px"
                no-gutters>
                <b-col
                  md="8"
                  class="text-break text-center px-4 py-2 d-flex align-items-center justify-content-center justify-content-md-start">
                  <h6
                    :class="{'text-truncate': !isMobile}"
                    class="text-arc-clr-iron-light mb-0">
                    {{ odd.name }}
                  </h6>
                </b-col>
                <div
                  v-if="isMobile"
                  class="w-100"/>
                <b-col
                  md="4"
                  class="d-flex align-items-end">
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
import { LIVE } from '@/constants/graphql/event-start-statuses'

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
    computedCols () {
      if (this.market.odds.length % 3 === 0) {
        return 4
      } else {
        return 6
      }
    },
    isDisabled () {
      const isDisabledByAPI = [
        SUSPENDED_STATUS,
        MARKET_INACTIVE_STATUS,
        SETTLED_STATUS,
        HANDED_OVER_STATUS
      ].includes(this.market.status)

      const isDisabledByAppState = this.event.startStatus === LIVE
        ? !this.isLiveConnected
        : !this.isPreLiveConnected

      return isDisabledByAPI || isDisabledByAppState
    }
  }
}
</script>
