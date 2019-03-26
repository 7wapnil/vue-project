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
  show_category_in_navigation
`

export const SCOPE_FIELDS = `
  id
  name
  kind
  event_scope_id
`

export const EVENT_FIELDS = `
  id
  name
  description
  status
  markets_count
  start_status
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
  state {
    id
    status_code
    status
    score
    time
    period_scores {
      id
      score
      status_code
      status
    }
    finished
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
  created_at
  amount
  oddValue
  status
  message
`

export const EVENT_BET_STOP_FIELDS = `
  id
  status
`
