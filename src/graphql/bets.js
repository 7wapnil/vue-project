import gql from 'graphql-tag'
import { PAGINATION_FIELDS } from './fields'

export const BETS_LIST_QUERY = gql`
  query bets ($kind: String = null,
              $settlementStatus: String = null,
              $excludedStatuses: [BetsStatusEnum] = [],
              $dateRange: String = null,
              $page: Int,
              $perPage: Int) {
    bets (kind: $kind,
          settlementStatus: $settlementStatus,
          excludedStatuses: $excludedStatuses,
          dateRange: $dateRange,
          page: $page,
          perPage: $perPage) {
      collection {
        id
        createdAt
        amount
        oddValue
        betLegs {
          id
          oddId
          displayStatus
          oddValue
          odd {
            id
            name
          }
          market {
            id
            name
          }
          event {
            id
            name
          }
          title {
            kind
          }
        }
        status
        displayStatus
      }
      pagination {
        ${PAGINATION_FIELDS}
      }
    }
  }
`
