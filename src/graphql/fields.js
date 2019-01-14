export const TITLE_FIELDS = `
  id
  name
`

export const SCOPE_FIELDS = `
  id
  name
  kind
`

export const EVENT_FIELDS = `
  id
  name
  description
  live
  tournament {
    id
    kind
    name
  }
  start_at
  end_at
  details {
    competitors {
      id
      name
    }
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
