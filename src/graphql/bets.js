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
        odd {
          id
          name
        }
        oddValue
        status
        displayStatus
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
      pagination {
        ${PAGINATION_FIELDS}
      }
    }
  }
`
