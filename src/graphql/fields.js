export const PROVIDER_FIELDS = `
  id
  code
  state
`

export const BONUS_SUBSCTIPTION_LIST_FIELDS = `
  id
  rolloverBalance
  rolloverInitialValue
  status
`

export const BONUSES_LIST_FIELDS = `
  ${BONUS_SUBSCTIPTION_LIST_FIELDS}
  amount
  casino
  code
  expiresAt
  maxRolloverPerBet
  minOddsPerBet
  sportsbook
  validForDays
  minOddsPerBet
  minOddsPerBetLeg
`

export const WALLET_FIELDS = `
  id
  amount
  currency {
    id
    code
    kind
  }
  realMoneyBalance
  bonusBalance
  userBonus {
    casino
    sportsbook
  }
`

export const USER_FIELDS = `
  id
  dateOfBirth
  email
  firstName
  lastName
  phone
  username
  addressCountry
  addressState
  addressCity
  addressZipCode
  addressStreetAddress
  needMoreInfo
`

export const TITLE_FIELDS = `
  id
  externalName
  name
  shortName
  slug
  metaTitle
  metaDescription
  position
  showCategoryInNavigation
`

export const SCOPE_FIELDS = `
  id
  name
  slug
  metaTitle
  metaDescription
  kind
  eventScopeId
  position
`

export const EVENT_FIELDS = `
  id
  name
  slug
  metaTitle
  metaDescription
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
    slug
    metaTitle
    metaDescription
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
  },
  isEnabled
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
  isEnabled
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
  status
  message
  notificationCode
  betLegs {
    id
    oddId
    message
    notificationCode
    eventEnabled
    marketStatus
    marketVisible
    marketEnabled
    oddEnabled
  }
`

export const EVENT_BET_STOP_FIELDS = `
  eventId
  marketStatus
`

export const MTS_CONNECTION_STATUS_FIELDS = `
  status
`

export const PLAY_ITEM_FIELDS = `
  id
  name
  shortName
  description
  metaTitle
  metaDescription
  logoUrl
  backgroundImageUrl
  freeMode
  url
  slug
  metaTitle
  metaDescription
  type
`

export const CASINO_CATEGORY_FIELDS = `
  id
  label
  position
  context
  metaTitle
  metaDescription
`

export const OVERVIEW_FIELDS = `
  ${CASINO_CATEGORY_FIELDS}
  playItems {
    ${PLAY_ITEM_FIELDS}
  }
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
  launchUrl
  playItem {
    ${PLAY_ITEM_FIELDS}
  }
`

export const EVERY_MATRIX_TRANSACTION_FIELDS = `
  id
  userId
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

export const CASINO_RECOMMENDED_GAMES_FIELDS = `
  backgroundImageUrl
  description
  id
  logoUrl
  name
  shortName
  slug
  type
  url
`

export const GAME_PROVIDER_FIELDS = `
  id
  enabled
  logoUrl
  name
  internalImageName
  slug
  metaTitle
  metaDescription
`
