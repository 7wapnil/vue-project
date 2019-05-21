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
  showCategoryInNavigation
`

export const SCOPE_FIELDS = `
  id
  name
  kind
  eventScopeId
  position
`

export const EVENT_FIELDS = `
  id
  name
  description
  status
  marketsCount
  startStatus
  displayStatus
  score
  timeInSeconds
  title {
    ${TITLE_FIELDS}
  }
  tournament {
    id
    kind
    name
  }
  startAt
  endAt
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
  eventId
  marketStatus
`

export const MTS_CONNECTION_STATUS_FIELDS = `
  status
`
