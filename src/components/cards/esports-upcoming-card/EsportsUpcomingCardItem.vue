<template>
  <b-row
    :data-id="market.id"
    no-gutters
    style="max-height: 80px"
    class="market-odds">
    <b-col
      style="min-width: 135px"
      class="px-4 py-2 market-odd">
      <b-row no-gutters>
        <b-col class="px-3 text-truncate text-center">
          <span class="text-arc-clr-iron team-name font-weight-bold font-size-12 line-height-14 ">
            {{ firstTeam.name }}
          </span>
        </b-col>

        <div class="w-100"/>

        <b-col>
          <odd-button
            :odd="firstTeam"
            :disabled="isDisabled"
            :event="event"
            :market="market"/>
        </b-col>
      </b-row>
    </b-col>

    <b-col
      cols="auto"
      class="p-3 d-flex align-items-center justify-content-center">
      <icon
        v-if="showicons"
        name="sidemenu-game-icon"
        style="color: #808080"
        size="24px"/>
    </b-col>

    <!--Draw-->
    <b-col
      v-if="hasDraw"
      style="min-width: 135px"
      class="px-4 py-2">
      <b-row no-gutters>
        <b-col>
          <span
            style="opacity: .4"
            class="w-100 text-arc-clr-iron team-name font-weight-light font-size-12 d-inline-flex justify-content-center mb-1 line-height-14">
            Draw
          </span>
        </b-col>

        <div class="w-100"/>

        <odd-button
          :odd="draw"
          :disabled="isDisabled"
          :event="event"
          :market="market"/>
      </b-row>
    </b-col>

    <!--VS-->
    <b-col
      v-if="!hasDraw"
      cols="auto"
      class="px-2 d-flex align-items-center justify-content-center">
      <b-row no-gutters>
        <b-col class="px-3">
          <span class="font-weight-light text-arc-clr-iron font-size-12">
            VS
          </span>
        </b-col>
      </b-row>
    </b-col>

    <b-col
      cols="auto"
      class="p-3 d-flex align-items-center justify-content-center">
      <icon
        v-if="showicons"
        name="sidemenu-game-icon"
        style="color: #808080"
        size="24px"/>
    </b-col>
    <b-col
      style="min-width: 135px"
      class="px-4 py-2 market-odd">
      <b-row no-gutters>
        <b-col class="px-3 text-truncate text-center">
          <span class="mb-2 text-arc-clr-iron team-name font-weight-bold font-size-12 line-height-14">
            {{ secondTeam.name }}
          </span>
        </b-col>
        <div class="w-100"/>
        <b-col>
          <odd-button
            :odd="secondTeam"
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
    firstTeam () {
      return this.market.odds[0]
    },
    secondTeam () {
      if (this.hasDraw) {
        return this.market.odds[2]
      }
      return this.market.odds[1]
    },
    draw () {
      return this.market.odds[1]
    },
    hasDraw () {
      return this.market.odds.length > 2
    }
  }
}
</script>
