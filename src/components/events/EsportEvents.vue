<template>
  <div>
    <events-list
      :events="esportEvents"
      :tab-id="selectedFilter.value"
      :key="key" />
  </div>
</template>

<script>
import EventsList from '@/components/events/EventsList'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import { CONTEXT_TO_START_STATUS_MAP } from '@/constants/graphql/event-start-statuses'
import { INACTIVE, SUSPENDED, MARKET_STOP_STATUSES } from '@/constants/graphql/event-market-statuses'
import { updateCacheList } from '@/helpers/graphql'
import {
  ESPORT_EVENTS,
  EVENTS_BET_STOPPED,
  KIND_EVENT_UPDATED,
  SPORT_EVENT_UPDATED,
} from '@/graphql'

export default {
  components: {
    EventsList
  },
  props: {
    selectedCategory: {
      type: Object,
      default: () => {}
    },
    selectedFilter: {
      type: Object,
      required: true
    }
  },
  apollo: {
    esportEvents () {
      return {
        ...this.query,
        subscribeToMore: [
          {
            document: this.eventsSubscription.document,
            variables: this.eventsSubscription.variables,
            updateQuery (currentData, { subscriptionData }) {
              const esportEvents = currentData.esportEvents

              if (!esportEvents) return

              const endpoint = Object.keys(subscriptionData.data)[0]
              const attributes = subscriptionData.data[endpoint]
              const startStatus = CONTEXT_TO_START_STATUS_MAP[this.context]
              const isRemoved = attributes.startStatus !== startStatus || !attributes.visible

              return { esportEvents: updateCacheList(esportEvents, attributes, isRemoved) }
            }
          },
          {
            document: EVENTS_BET_STOPPED,
            updateQuery (currentData, { subscriptionData: { data } }) {
              const esportEvents = currentData.esportEvents

              if (!esportEvents) return

              const subscriptionData = data.eventsBetStopped
              const marketStatus = subscriptionData.marketStatus

              if (MARKET_STOP_STATUSES.includes(marketStatus)) {
                const eventIndex = esportEvents.findIndex(esportEvents => esportEvents.id === subscriptionData.eventId)

                if (eventIndex === -1) return

                const market = esportEvents[eventIndex].dashboardMarket

                if (marketStatus === INACTIVE) esportEvents.splice(eventIndex, 1)
                if (marketStatus === SUSPENDED && market) {
                  market.odds.forEach(function (odd) { odd.status = INACTIVE })
                }
              }

              return { esportEvents: esportEvents }
            }
          }
        ]
      }
    }
  },
  data () {
    return {
      esportEvents: []
    }
  },
  computed: {
    query () {
      return {
        query: ESPORT_EVENTS,
        fetchPolicy: NETWORK_ONLY,
        variables: {
          titleId: this.selectedCategory ? this.selectedCategory.value : null,
          context: this.selectedFilter.value,
          withScopes: true
        }
      }
    },
    key () {
      if (!this.eventListProps) { return '' }
      return Object.values(this.eventListProps).join(':')
    },
    eventListProps () {
      if (!this.selectedFilter) { return null }

      return {
        titleId: this.selectedCategory ? this.selectedCategory.value : null,
        tournamentId: this.$route.params.tournamentId || null,
        context: this.selectedFilter ? this.selectedFilter.value : null
      }
    },
    eventsSubscription () {
      let document = null
      let variables = {}

      if (this.titleId) {
        document = SPORT_EVENT_UPDATED
        variables.title = this.titleId
      } else {
        document = KIND_EVENT_UPDATED
        variables.kind = this.$route.params.titleKind
      }

      return {
        document: document,
        variables: variables
      }
    }
  }
}
</script>
