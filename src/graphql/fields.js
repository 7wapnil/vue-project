export const PROVIDER_FIELDS = `
  id
  code
  state
`

export const WALLET_FIELDS = `
  id
  amount
  currency {
    id
    code
    kind
  }
`

export const TITLE_FIELDS = `
  id
  externalName
  name
  shortName
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
  dashboardMarket {
    category
    eventId
    id
    name
    odds {
      id
      name
      status
      value
    }
    priority
    status
    visible
  }
  visible
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
  visible
  twitchUrl
  twitchStartTime
  twitchEndTime
  competitors {
    id
    name
    qualifier
  }
`

export const EVENT_CONTEXTS_FIELDS = `
  context
  show
`

export const MARKET_FIELDS = `
  id
  name
  priority
  status
  visible
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
  notificationCode
`

export const EVENT_BET_STOP_FIELDS = `
  eventId
  marketStatus
`

export const MTS_CONNECTION_STATUS_FIELDS = `
  status
`

export const GAME_FIELDS = `
  id
  backgroundImageUrl
  categories
  createdAt
  currencies
  defaultCoin
  description
  externalCreatedAt
  externalUpdatedAt
  fpp
  hasAnonymityMode
  hasFunMode
  hasRealMoneyMode
  helpUrl
  isFreeSpinBonusSupported
  isFreeSpinSupported
  isLaunchedInHtml5
  languages
  largeIconUrl
  logoUrl
  mediumIconUrl
  name
  popularityCoefficient
  popularityRanking
  restrictedTerritories
  shortName
  slug
  smallIconUrl
  theoreticalPayout
  thirdPartyFee
  thumbnailUrl
  topPrize
  updatedAt
  url
  vendor
`

export const PAGINATION_FIELDS = `
  count
  items
  page
  pages
  offset
  last
  next
  prev
  from
  to
`

export const EVERY_MATRIX_SESSION_FIELDS = `
  sessionId
`

export const EVERY_MATRIX_TRANSACTION_FIELDS = `
  id
  customerId
  debit
  credit
  balance
  currencyCode
  type
  transactionId
  gameName
  vendorName
  createdAt
`
