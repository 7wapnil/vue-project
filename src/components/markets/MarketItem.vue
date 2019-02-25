<template>
  <b-row
    :data-id="market.id"
    class="market-odds"
    no-gutters>

    <b-col
      v-for="odd in market.odds"
      :key="odd.id"
      class="mr-2 text-truncate market-odd">
      <b-row no-gutters>
        <b-col class="px-1 mb-1 text-center text-truncate">
          <small class="text-arc-clr-iron">
            {{ odd.name }}
          </small>
        </b-col>
      </b-row>
      <b-row no-gutters>
        <b-col>
          <odd-button
            :odd="odd"
            :disabled="isDisabled"
            :event="event"
            :market="market"/>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import {
  SUSPENDED_STATUS,
  INACTIVE_STATUS as MARKET_INACTIVE_STATUS,
  SETTLED_STATUS,
  HANDED_OVER_STATUS
} from '@/models/market'
import OddButton from './OddButton'
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
    },
    displayMarketName: {
      type: Boolean,
      default: false
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

      const isDisabledByAppState = this.event.start_status === LIVE
        ? !this.isLiveConnected
        : !this.isPreLiveConnected

      return isDisabledByAPI || isDisabledByAppState
    }
  }
}
</script>
