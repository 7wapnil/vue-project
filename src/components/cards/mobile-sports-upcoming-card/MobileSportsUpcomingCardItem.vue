<template>
  <b-row
    :data-id="market.id"
    class="market-odds"
    no-gutters>
    <b-col
      class="mr-2 market-odd">
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

    <b-col
      class="market-odd">
      <odd-button
        :odd="secondTeam"
        :disabled="isDisabled"
        :event="event"
        :market="market">
        <template #left>
          2
        </template>
      </odd-button>
    </b-col>
  </b-row>
</template>
<script>
import EsportsUpcomingCardItem from '@/components/cards/esports-upcoming-card/EsportsUpcomingCardItem'

export default {
  extends: EsportsUpcomingCardItem
}
</script>
