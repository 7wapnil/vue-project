<template>
  <div>
    <b-row no-gutters>
      <b-col class="text-center pt-4 pb-3">
        <icon
          v-if="showicons"
          name="sidemenu-game-icon"
          color="arc-clr-iron"
          size="24px"/>
      </b-col>

      <b-col
        v-if="!!event.score"
        class="text-center pt-4 pb-3 pl-2">
        <span
          v-for="(score, index) in getScore"
          :key="index"
          class="mb-3 mr-3 font-weight-light text-arc-clr-iron font-size-18">
          {{ score }}
        </span>
      </b-col>
      <b-col
        v-if="!event.score"
        cols="auto"
        class="text-center pt-4">
        <h5
          class="font-weight-light text-arc-clr-iron mt-1 letter-spacing-2 opacity-4">
          VS
        </h5>
      </b-col>
      <b-col class="text-center pt-4 pb-3">
        <icon
          v-if="showicons"
          name="sidemenu-game-icon"
          color="arc-clr-iron"
          size="24px"/>
      </b-col>
    </b-row>
    <b-row
      :data-id="market.id"
      :class="market.odds.length > 2 ? 'draw-style' : ''"
      class="market-odds"
      no-gutters>
      <b-col
        v-for="odd in market.odds"
        :key="odd.id"
        class="text-truncate market-odd">
        <b-row no-gutters>
          <b-col class="text-center">
            <h6 class="mb-2 font-weight-bold text-arc-clr-iron team-name letter-spacing-2">
              {{ odd.name }}
            </h6>
          </b-col>
        </b-row>

        <b-col class="px-2">
          <odd-button
            :odd="odd"
            :disabled="isDisabled"
            :event="event"
            :market="market"/>
        </b-col>
      </b-col>
    </b-row>
  </div>
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
    },
    showicons: {
      type: Boolean,
      default: true
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
    },
    getScore () {
      if (this.event.score) {
        return this.event.score
      }
    }
  }
}
</script>
