import {
  TOURNAMENT_EVENT_UPDATED,
  SPORT_EVENT_UPDATED,
  KIND_EVENT_UPDATED,
  EVENTS_BET_STOPPED
} from '@/graphql'
import { CONTEXT_TO_START_STATUS_MAP } from '@/constants/graphql/event-start-statuses'
import { INACTIVE, SUSPENDED, MARKET_STOP_STATUSES } from '@/constants/graphql/event-market-statuses'
import { updateCacheList } from '@/helpers/graphql'

export const SPORT_KIND = 'sports'
export const ESPORT_KIND = 'esports'
export const TOURNAMENT_EVENT = 'tournamentEvents'
export const ESPORT_EVENT = 'esportEvents'
export const SPORT_EVENT = 'sportEvents'

export const eventUpdatedSubscriber = (params) => {
  return {
    subscribeToMore: [
      {
        document: eventsSubscription(params).document,
        variables: eventsSubscription(params).variables,
        updateQuery (currentData, { subscriptionData }) {
          const events = currentData[event_variable_key(params)]

          if (!events) return

          const endpoint = Object.keys(subscriptionData.data)[0]
          const attributes = subscriptionData.data[endpoint]
          const startStatus = CONTEXT_TO_START_STATUS_MAP[params.context]
          const isRemoved = attributes.startStatus !== startStatus || !attributes.visible

          return {[event_variable_key(params)]: updateCacheList(events, attributes, isRemoved)}
        }
      },
      {
        document: EVENTS_BET_STOPPED,
        updateQuery (currentData, { subscriptionData: { data } }) {
          const events = currentData[event_variable_key(params)]

          if (!events) return

          const eventBetStopped = data.eventsBetStopped
          const marketStatus = eventBetStopped.marketStatus

          if (MARKET_STOP_STATUSES.includes(marketStatus)) {
            const eventIndex = events.findIndex(event => event.id === eventBetStopped.eventId)

            if (eventIndex === -1) return

            const market = events[eventIndex].dashboardMarket

            if (marketStatus === INACTIVE) events.splice(eventIndex, 1)
            if (marketStatus === SUSPENDED && market) {
              market.odds.forEach(function (odd) { odd.status = INACTIVE })
            }
          }

          return {[event_variable_key(params)]: events}
        }
      }
    ]
  }
}

export const event_variable_key = (params) => {
  if (params.tournamentId) {
    return TOURNAMENT_EVENT
  } else if (params.titleKind === SPORT_KIND) {
    return SPORT_EVENT
  } else if (params.titleKind === ESPORT_KIND) {
    return ESPORT_EVENT
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
