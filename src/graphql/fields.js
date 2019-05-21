export const PROVIDER_FIELDS = `
  id
  code
  state
`

export const WALLET_FIELDS = `
  id
  amount
  currency {
    code
    id
  }
`

export const TITLE_FIELDS = `
  id
  name
  position
  show_category_in_navigation
`

export const SCOPE_FIELDS = `
  id
  name
  kind
  event_scope_id
  position
`

export const EVENT_FIELDS = `
  id
  name
  description
  status
  markets_count
  start_status
  display_status
  score
  time_in_seconds
  title {
    ${TITLE_FIELDS}
  }
  tournament {
    id
    kind
    name
  }
  start_at
  end_at
  competitors {
    id
    name
  }
`

export const MARKET_FIELDS = `
  id
  name
  priority
  status
  category
  odds {
    id
    name
    value
    status
  }
`

export const MARKET_CATEGORY_FIELDS = `
  id
  name
  count
`

export const BET_FIELDS = `
  id
  createdAt
  amount
  oddValue
  status
  message
`

export const EVENT_BET_STOP_FIELDS = `
  event_id
  market_status
`

export const MTS_CONNECTION_STATUS_FIELDS = `
  status
`
