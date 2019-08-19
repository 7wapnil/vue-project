<template>
  <b-row
    :data-id="market.id"
    class="market-odds"
    no-gutters>

    <b-col class="mr-2 market-odd">
      <odd-button
        :odd="firstTeam"
        :disabled="isDisabled"
        :event="event"
        :market="market">
        <template #left>
          1
        </template>
      </odd-button>
    </b-col>

    <b-col
      v-if="hasDraw"
      class="mr-2 market-odd">
      <odd-button
        :odd="draw"
        :disabled="isDisabled"
        :event="event"
        :market="market">
        <template #left>
          X
        </template>
      </odd-button>
    </b-col>

    <b-col class="market-odd">
      <odd-button
        :odd="secondTeam"
        :disabled="isDisabled"
        :event="event"
        :market="market"
        class="no-hover">
        <template #left>
          2
        </template>
      </odd-button>
    </b-col>

  </b-row>
</template>
<script>
import SportsLiveCardItem from '@/components/cards/sports-live-card/SportsLiveCardItem'

export default {
  extends: SportsLiveCardItem,
  computed: {
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
