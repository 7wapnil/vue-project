import gql from 'graphql-tag'
import { EVENT_FIELDS, MARKET_FIELDS, SCOPE_FIELDS, EVENT_BET_STOP_FIELDS } from './fields'

const SUBSCRIPTION_FIELDS = `
  ${EVENT_FIELDS}
  scopes {
    ${SCOPE_FIELDS}
  }
  dashboardMarket {
    ${MARKET_FIELDS}
  }
`

export const EVENTS_UPDATED = gql`
  subscription eventsUpdated {
    eventsUpdated {
      ${SUBSCRIPTION_FIELDS}
    }
  }
`

export const KIND_EVENT_UPDATED = gql`
  subscription kindEventUpdated ($kind: String) {
    kindEventUpdated (kind: $kind) {
      ${SUBSCRIPTION_FIELDS}
    }
  }
`

export const SPORT_EVENT_UPDATED = gql`
  subscription sportEventUpdated ($title: ID) {
    sportEventUpdated (title: $title) {
      ${SUBSCRIPTION_FIELDS}
    }
  }
`

export const CATEGORY_EVENT_UPDATED = gql`
  subscription categoryEventUpdated ($category: ID) {
    categoryEventUpdated (category: $category) {
      ${SUBSCRIPTION_FIELDS}
    }
  }
`

export const TOURNAMENT_EVENT_UPDATED = gql`
  subscription tournamentEventUpdated ($tournament: ID) {
    tournamentEventUpdated (tournament: $tournament) {
      ${SUBSCRIPTION_FIELDS}
    }
  }
`

export const EVENT_UPDATED = gql`
  subscription eventUpdated ($id: ID, $category: String = null) {
    eventUpdated (id: $id) {
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
    eventsBetStopped {
      ${EVENT_BET_STOP_FIELDS}
    } 
  }
`

export const EVENT_BET_STOPPED = gql`
  subscription eventBetStopped ($id: ID) {
    eventBetStopped (id: $id) {
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
      eventUpdated (id: $id) {
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
