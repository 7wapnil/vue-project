<template>
  <b-row
    :data-id="market.id"
    style="height: 76px; box-sizing: border-box;"
    class="market-odds mx-2"
    no-gutters>
    <b-col
      v-for="odd in market.odds"
      :key="odd.id"
      class="text-truncate market-odd px-2 pb-2 pt-1">

      <b-col class="text-center text-truncate pb-1">
        <small class="text-arc-clr-iron team-name">
          {{ odd.name }}
        </small>
      </b-col>

      <div class="w-100"/>

      <b-col class="p-0">
        <odd-button
          :odd="odd"
          :disabled="isDisabled"
          :event="event"
          :market="market"/>
      </b-col>

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
