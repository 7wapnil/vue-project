import gql from 'graphql-tag'
import { EVENT_FIELDS, MARKET_FIELDS, SCOPE_FIELDS } from './fields'

const SUBSCRIPTION_FIELDS = `
  ${EVENT_FIELDS}
  scopes {
    ${SCOPE_FIELDS}
  }
  markets (limit: 1) {
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
  subscription kindEventUpdated ($kind: String, $live: Boolean = false) {
    kind_event_updated (kind: $kind, live: $live) {
      ${SUBSCRIPTION_FIELDS}
    }
  }
`

export const SPORT_EVENT_UPDATED = gql`
  subscription sportEventUpdated ($title: ID, $live: Boolean = false) {
    sport_event_updated (title: $title, live: $live) {
      ${SUBSCRIPTION_FIELDS}
    }
  }
`

export const TOURNAMENT_EVENT_UPDATED = gql`
  subscription tournamentEventUpdated ($tournament: ID, $live: Boolean = false) {
    tournament_event_updated (tournament: $tournament, live: $live) {
      ${SUBSCRIPTION_FIELDS}
    }
  }
`

export const EVENT_UPDATED = gql`
  subscription eventUpdated ($id: ID) {
    event_updated (id: $id) {
      ${EVENT_FIELDS}
      scopes {
        ${SCOPE_FIELDS}
      }
    }
  }
`
