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
import { NO_CACHE } from '@/constants/graphql/fetch-policy'

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
    $subscribe: {
      eventUpdated: {
        query () {
          return eventUpdatedSubscription(null, this.category.name.toLowerCase())
        },
        variables () {
          return {
            id: this.event.id
          }
        },
        result (subscriptionData) {
          const event = subscriptionData.data.eventUpdated
          this.markets = event.markets
        }
      },
      eventBetStopped: {
        query: EVENT_BET_STOPPED,
        variables () {
          return { id: this.event.id }
        },
        result (payload) {
          const subscriptionData = payload.data.eventBetStopped
          const marketStatus = subscriptionData.marketStatus

          if (MARKET_STOP_STATUSES.includes(marketStatus)) {
            if (marketStatus === INACTIVE) this.markets = []
            if (marketStatus === SUSPENDED) {
              this.markets
                .map(market => market.odds)
                .flat()
                .forEach(function (odd) { odd.status = INACTIVE })
            }
          }
        }
      }
    },
    markets () {
      return {
        query: MARKETS_LIST_QUERY,
        fetchPolicy: NO_CACHE,
        variables () {
          return {
            eventId: this.event.id,
            category: this.category.name.toLowerCase().replace(' ', '_')
          }
        }
      }
    }
  },
  data () {
    return {
      loading: 0,
      markets: []
    }
  }
}
</script>
