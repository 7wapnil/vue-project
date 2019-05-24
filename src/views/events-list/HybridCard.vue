<template>
  <component
    :is="cardType"
    :event="event">
    <markets-list
      :item-component="itemType"
      :event="event"
      :markets="[event.dashboardMarket]"/>
  </component>
</template>
<script>
import EsportsLiveCard from '@/components/cards/esports-live-card/EsportsLiveCard'
import EsportsUpcomingCard from '@/components/cards/esports-upcoming-card/EsportsUpcomingCard'
import SportsLiveCard from '@/components/cards/sports-live-card/SportsLiveCard'
import SportsUpcomingCard from '@/components/cards/sports-upcoming-card/SportsUpcomingCard'
import MarketsList from '@/components/markets/MarketsList'

export default {
  components: {
    EsportsLiveCard,
    EsportsUpcomingCard,
    SportsLiveCard,
    SportsUpcomingCard,
    MarketsList
  },
  props: {
    event: {
      type: Object,
      required: true
    },
    tabId: {
      type: String,
      required: true
    }
  },
  computed: {
    cardType () {
      let routeKind = this.$route.params.titleKind
      return `${routeKind}-${this.tabId}-card`
    },
    itemType () {
      return `${this.cardType}-item`
    }
  }
}
</script>
