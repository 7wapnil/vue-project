<template>
    <component
            :is="cardType"
            :event="event">
        <markets-list
            :event="event"
            :markets="[event.dashboard_market]"/>
    </component>
</template>
<script>
    import EsportsLiveCard from '@/components/cards/EsportsLiveCard'
    import EsportsUpcomingCard from '@/components/cards/EsportsUpcomingCard'
    import SportsLiveCard from '@/components/cards/SportsLiveCard'
    import SportsUpcomingCard from '@/components/cards/SportsUpcomingCard'
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
        cardType() {
          let routeKind = this.$route.params.titleKind
          return `${routeKind}-${this.tabId}-card`
        }
      }
    }
</script>
