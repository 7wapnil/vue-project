<template>
  <div>
    <h1>Sport</h1>
    <events-list :events="[]" />
  </div>
</template>

<script>
import EventsList from '@/components/events/EventsList'

export default {
  components: {
    EventsList
  },
  props: {
    selectedCategory: {
      type: Object,
      required: true
    },
    selectedFilter: {
      type: Object,
      required: true
    }
  },
  // apollo: {
  //   events () {
  //     return {
  //       ...this.query,
  //       subscribeToMore: [
  //         {
  //           document: this.eventsSubscription.document,
  //           variables: this.eventsSubscription.variables,
  //           updateQuery (currentData, { subscriptionData }) {
  //             const events = currentData.events

  //             if (!events) return

  //             const endpoint = Object.keys(subscriptionData.data)[0]
  //             const attributes = subscriptionData.data[endpoint]
  //             const startStatus = CONTEXT_TO_START_STATUS_MAP[this.context]
  //             const isRemoved = attributes.startStatus !== startStatus || !attributes.visible

  //             return { events: updateCacheList(events, attributes, isRemoved) }
  //           }
  //         },
  //         {
  //           document: EVENTS_BET_STOPPED,
  //           updateQuery (currentData, { subscriptionData: { data } }) {
  //             const events = currentData.events

  //             if (!events) return

  //             const subscriptionData = data.eventsBetStopped
  //             const marketStatus = subscriptionData.marketStatus

  //             if (MARKET_STOP_STATUSES.includes(marketStatus)) {
  //               const eventIndex = events.findIndex(event => event.id === subscriptionData.eventId)

  //               if (eventIndex === -1) return

  //               const market = events[eventIndex].dashboardMarket

  //               if (marketStatus === INACTIVE) events.splice(eventIndex, 1)
  //               if (marketStatus === SUSPENDED && market) {
  //                 market.odds.forEach(function (odd) { odd.status = INACTIVE })
  //               }
  //             }

  //             return { events: events }
  //           }
  //         }
  //       ]
  //     }
  //   }
  // },
  // data () {
  //   return {
  //     loading: 0,
  //     events: []
  //   }
  // },
  // computed: {
  //   query () {
  //     return {
  //       query: EVENTS_LIST_QUERY,
  //       fetchPolicy: NETWORK_ONLY,
  //       variables: {
  //         titleKind: this.$route.params.titleKind,
  //         titleId: this.titleId,
  //         tournamentId: this.tournamentId,
  //         categoryId: this.categoryId,
  //         context: this.context,
  //         withScopes: true
  //       }
  //     }
  //   },
  //   eventsSubscription () {
  //     let document = null
  //     let variables = {}

  //     if (this.titleId) {
  //       document = SPORT_EVENT_UPDATED
  //       variables.title = this.titleId
  //     } else {
  //       document = KIND_EVENT_UPDATED
  //       variables.kind = this.$route.params.titleKind
  //     }

  //     return {
  //       document: document,
  //       variables: variables
  //     }
  //   },
  //   parentizeEvents () {
  //     return this.events.map((event) => {
  //       const { title, scopes } = event
  //       const category = scopes.find(s => s.kind === 'category')
  //       const tournament = scopes.find(s => s.kind === 'tournament')

  //       return {
  //         ...event,
  //         type: 'event',
  //         title: event.title,
  //         parent: {
  //           ...tournament,
  //           type: 'tournament',
  //           title: event.title,
  //           parent: {
  //             ...category,
  //             type: 'category',
  //             title: event.title,
  //             parent: {
  //               ...title,
  //               type: 'title'
  //             }
  //           }
  //         }
  //       }
  //     })
  //   },
  //   groupedEvents () {
  //     return this.buildEventBranch(this.parentizeEvents)
  //   }
  // }
}
</script>
