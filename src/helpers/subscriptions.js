import {
  TOURNAMENT_EVENT_UPDATED,
  SPORT_EVENT_UPDATED,
  KIND_EVENT_UPDATED,
  EVENTS_BET_STOPPED
} from '@/graphql'
import { CONTEXT_TO_START_STATUS_MAP } from '@/constants/graphql/event-start-statuses'
import { INACTIVE, SUSPENDED, MARKET_STOP_STATUSES } from '@/constants/graphql/event-market-statuses'
import { updateCacheList } from '@/helpers/graphql'

export const eventUpdatedSubscriber = (params) => {
  return {
    subscribeToMore: [
      {
        document: eventsSubscription(params).document,
        variables: eventsSubscription(params).variables,
        updateQuery (currentData, { subscriptionData }) {
          const events = currentData.events

          if (!events) return

          const endpoint = Object.keys(subscriptionData.data)[0]
          const attributes = subscriptionData.data[endpoint]
          const startStatus = CONTEXT_TO_START_STATUS_MAP[params.context]
          const isRemoved = attributes.startStatus !== startStatus || !attributes.visible

          // TODO: Check for error with different name of key
          return { events: updateCacheList(events, attributes, isRemoved) }
        }
      },
      {
        document: EVENTS_BET_STOPPED,
        updateQuery (currentData, { subscriptionData: { data } }) {
          const events = currentData.events

          if (!events) return

          const subscriptionData = data.eventsBetStopped
          const marketStatus = subscriptionData.marketStatus

          if (MARKET_STOP_STATUSES.includes(marketStatus)) {
            const eventIndex = events.findIndex(event => event.id === subscriptionData.eventId)

            if (eventIndex === -1) return

            const market = events[eventIndex].dashboardMarket

            if (marketStatus === INACTIVE) events.splice(eventIndex, 1)
            if (marketStatus === SUSPENDED && market) {
              market.odds.forEach(function (odd) { odd.status = INACTIVE })
            }
          }

          return { events: events }
        }
      }
    ]
  }
}

export const eventsSubscription = (params) => {
  let document = null
  let variables = {}

  if (params.tournamentId) {
    document = TOURNAMENT_EVENT_UPDATED
    variables.tournament = params.tournamentId
  } else if (params.titleId) {
    document = SPORT_EVENT_UPDATED
    variables.title = params.titleId
  } else {
    document = KIND_EVENT_UPDATED
    variables.kind = params.titleKind
  }

  return {
    document: document,
    variables: variables
  }
}
