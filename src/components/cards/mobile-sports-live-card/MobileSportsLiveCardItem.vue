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
import SportsLiveCardItem from '@/components/cards/sports-live-card/SportsLiveCardItem'

export default {
  extends: SportsLiveCardItem
}
</script>
