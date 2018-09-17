<template>
  <div
    :data-id="market.id"
    class="row">
    <div class="col">

      <b>{{ market.name }}</b>

      <div class="row">
        <div
          v-for="odd in market.odds"
          :key="odd.id"
          class="col">
          <odd-button
            :odd="odd"
            :disabled="isDisabled"
            :market="market"/>
        </div>
      </div>

    </div>
  </div>
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
