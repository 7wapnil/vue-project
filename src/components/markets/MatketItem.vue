<template>
  <b-row
    :data-id="market.id"
    no-gutters>
    <b-col>
      <div>{market.name}</div>
      <b-row no-gutters>
        <b-col
          v-for="odd in market.odds"
          :key="odd.id"
          align="center">
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
      return [
        SUSPENDED_STATUS,
        MARKET_INACTIVE_STATUS,
        SETTLED_STATUS,
        HANDED_OVER_STATUS
      ].includes(this.market.status)
    }
  }
}
</script>
