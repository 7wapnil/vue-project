<template>
  <b-row
    :data-id="market.id"
    no-gutters>
    <b-col class="mr-2">
      <odd-button
        :odd="firstTeam"
        :disabled="isDisabled"
        :event="event"
        :market="market"/>
    </b-col>
    <b-col>
      <odd-button
        :odd="secondTeam"
        :disabled="isDisabled"
        :event="event"
        :market="market"/>
    </b-col>
  </b-row>
</template>
<script>
import EsportsUpcomingCardItem from '@/components/cards/esports-upcoming-card/EsportsUpcomingCardItem'

export default {
  extends: EsportsUpcomingCardItem
}
</script>
