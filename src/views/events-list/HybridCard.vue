<template>
  <component
    :is="cardType"
    :event="event">
    <markets-list
      :item-component="itemType"
      :event="event"
      :markets="markets"/>
  </component>
</template>
<script>
import EsportsLiveCard from '@/components/cards/esports-live-card/EsportsLiveCard'
import EsportsUpcomingCard from '@/components/cards/esports-upcoming-card/EsportsUpcomingCard'
import SportsLiveCard from '@/components/cards/sports-live-card/SportsLiveCard'
import SportsUpcomingCard from '@/components/cards/sports-upcoming-card/SportsUpcomingCard'
import MobileEsportsUpcomingCard from '@/components/cards/mobile-esports-upcoming-card/MobileEsportsUpcomingCard'
import MobileEsportsLiveCard from '@/components/cards/mobile-esports-live-card/MobileEsportsLiveCard'
import MobileSportsUpcomingCard from '@/components/cards/mobile-sports-upcoming-card/MobileSportsUpcomingCard'
import MarketsList from '@/components/markets/MarketsList'
import MobileSportsLiveCard from '@/components/cards/mobile-sports-live-card/MobileSportsLiveCard'

export default {
  components: {
    EsportsLiveCard,
    EsportsUpcomingCard,
    SportsLiveCard,
    SportsUpcomingCard,
    MarketsList,
    MobileEsportsUpcomingCard,
    MobileEsportsLiveCard,
    MobileSportsUpcomingCard,
    MobileSportsLiveCard
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
      let cardtype = `${routeKind}-${this.tabId}-card`
      if (this.isMobile) {
        return `mobile-${cardtype}`
      }
      return cardtype
    },
    itemType () {
      return `${this.cardType}-item`
    },
    markets () {
      return [this.event.dashboardMarket].filter((market) => market)
    }
  }
}
</script>
