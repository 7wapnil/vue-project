<template>
  <div>
    <loader v-if="loading"/>

    <slot
      v-if="!loading"
      :markets="markets"/>
  </div>
</template>

<script>
import { MARKETS_LIST_QUERY, EVENT_BET_STOPPED, eventUpdatedSubscription } from '@/graphql'
import { INACTIVE, SUSPENDED, MARKET_STOP_STATUSES } from '@/constants/graphql/event-market-statuses'
import MarketsList from './MarketsList'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'

export default {
  components: {
    MarketsList
  },
  props: {
    event: {
      type: Object,
      required: true
    },
    category: {
      type: Object,
      required: true
    }
  },
  apollo: {
    markets () {
      return {
        ...this.query,
        subscribeToMore: [
          {
            document: eventUpdatedSubscription(null, this.category.name.toLowerCase()),
            variables () {
              return {
                id: this.event.id
              }
            },
            updateQuery ({ markets }, { subscriptionData }) {
              const event = subscriptionData.data.eventUpdated
              return { markets: event.markets }
            }
          },
          {
            document: EVENT_BET_STOPPED,
            variables: { id: this.event.id },
            updateQuery ({ markets }, { subscriptionData: { data } }) {
              const subscriptionData = data.eventBetStopped
              const marketStatus = subscriptionData.marketStatus

              if (MARKET_STOP_STATUSES.includes(marketStatus)) {
                if (marketStatus === INACTIVE) markets = []
                if (marketStatus === SUSPENDED) {
                  markets
                    .map(market => market.odds)
                    .flat()
                    .forEach(function (odd) { odd.status = INACTIVE })
                }
              }

              return { markets }
            }
          }
        ]
      }
    }
  },
  data () {
    return {
      loading: 0,
      markets: []
    }
  },
  computed: {
    query () {
      return {
        query: MARKETS_LIST_QUERY,
        fetchPolicy: NETWORK_ONLY,
        variables () {
          return {
            eventId: this.event.id,
            category: this.category.name.toLowerCase()
          }
        }
      }
    }
  },
}
</script>
