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
    import EsportsLiveCardItem from '@/components/cards/esports-live-card/EsportsLiveCardItem'

    export default {
      extends: EsportsLiveCardItem,
      computed: {
        firstTeam () {
          return this.market.odds[0]
        },
        secondTeam () {
          if (this.hasDraw) {
            return this.market.odds[2]
          }
          return this.market.odds[1]
        }
      }
    }
</script>
