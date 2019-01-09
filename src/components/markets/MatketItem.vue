<template>
  <b-row
    :data-id="market.id"
    no-gutters>
    <small
      v-if="displayMarketName"
      class="text-arc-clr-gold-light">
      {{ market.name }}
    </small>
    <b-col
      v-for="odd in market.odds"
      :key="odd.id"
      class="mr-2 text-truncate">
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
import { mapGetters } from 'vuex'
import {
  SUSPENDED_STATUS,
  INACTIVE_STATUS as MARKET_INACTIVE_STATUS,
  SETTLED_STATUS,
  HANDED_OVER_STATUS
} from '@/models/market'
import OddButton from './OddButton'

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
    ...mapGetters('app', [
      'appState'
    ]),
    isDisabled () {
      const isDisabledByAPI = [
        SUSPENDED_STATUS,
        MARKET_INACTIVE_STATUS,
        SETTLED_STATUS,
        HANDED_OVER_STATUS
      ].includes(this.market.status)

      const isDisabledByAppState = this.event.live
        ? !this.appState.live_connected
        : !this.appState.pre_live_connected

      return isDisabledByAPI || isDisabledByAppState
    }
  }
}
</script>
