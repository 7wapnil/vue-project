import gql from 'graphql-tag'
import { MARKET_FIELDS } from './markets'

export const EVENT_FIELDS = `
  id
  name
  description
  title_name
  start_at
  end_at
  markets @include(if: $withMarkets) {
    ${MARKET_FIELDS}
  }
`

export const EVENTS_LIST_QUERY = gql`
  query eventList ($limit: Int, $titleId: ID, $withMarkets: Boolean = false) {
    events (limit: $limit, filter: {
      titleId: $titleId
    }) {
      ${EVENT_FIELDS}
    }
  }
`

export const EVENT_BY_ID_QUERY = gql`
  query event($id: ID!) {
    event (id: $id) {
      ${EVENT_FIELDS}
    }
  }
`
