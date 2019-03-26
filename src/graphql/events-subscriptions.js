import gql from 'graphql-tag'
import { EVENT_FIELDS, MARKET_FIELDS, SCOPE_FIELDS, EVENT_BET_STOP_FIELDS } from './fields'

const SUBSCRIPTION_FIELDS = `
  ${EVENT_FIELDS}
  scopes {
    ${SCOPE_FIELDS}
  }
  dashboard_market {
    ${MARKET_FIELDS}
  }
`

export const EVENTS_UPDATED = gql`
  subscription eventsUpdated {
    events_updated {
      ${SUBSCRIPTION_FIELDS}
    }
  }
`

export const KIND_EVENT_UPDATED = gql`
  subscription kindEventUpdated ($kind: String) {
    kind_event_updated (kind: $kind) {
      ${SUBSCRIPTION_FIELDS}
    }
  }
`

export const SPORT_EVENT_UPDATED = gql`
  subscription sportEventUpdated ($title: ID) {
    sport_event_updated (title: $title) {
      ${SUBSCRIPTION_FIELDS}
    }
  }
`

export const CATEGORY_EVENT_UPDATED = gql`
  subscription categoryEventUpdated ($category: ID) {
    category_event_updated (category: $category) {
      ${SUBSCRIPTION_FIELDS}
    }
  }
`

export const TOURNAMENT_EVENT_UPDATED = gql`
  subscription tournamentEventUpdated ($tournament: ID) {
    tournament_event_updated (tournament: $tournament) {
      ${SUBSCRIPTION_FIELDS}
    }
  }
`

export const EVENT_UPDATED = gql`
  subscription eventUpdated ($id: ID, $category: String = null) {
    event_updated (id: $id) {
      ${EVENT_FIELDS}
      scopes {
        ${SCOPE_FIELDS}
      }
      markets (eventId: $id, id: "273657") {
        ${MARKET_FIELDS}
      }
    } 
  }
`

export const EVENTS_BET_STOPPED = gql`
  subscription eventsBetStopped {
    events_bet_stopped {
      ${EVENT_BET_STOP_FIELDS}
    } 
  }
`

export const EVENT_BET_STOPPED = gql`
  subscription eventBetStopped ($id: ID) {
    event_bet_stopped (id: $id) {
      ${EVENT_BET_STOP_FIELDS}
    } 
  }
`

export const eventUpdatedSubscription = (marketId = null, category = null) => {
  const marketArgs = ['eventId: $id']
  if (marketId) {
    marketArgs.push(`id: "${marketId}"`)
  }

  if (category) {
    marketArgs.push(`category: "${category}"`)
  }

  return gql`
    subscription eventUpdated ($id: ID) {
      event_updated (id: $id) {
        ${EVENT_FIELDS}
        scopes {
          ${SCOPE_FIELDS}
        }
        markets (${marketArgs.join(', ')}) {
          ${MARKET_FIELDS}
        }
      } 
    }
  `
}
