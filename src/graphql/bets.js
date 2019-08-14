import gql from 'graphql-tag';

export const BETS_LIST_QUERY = gql`
  query bets ($kind: String = null, $settlement_status: String = null, $page: Int, $perPage: Int) {
    bets (kind: $kind, settlement_status: $settlement_status, page: $page, perPage: $perPage) {
      collection {
        id
        createdAt
        amount
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
      }
    }
  }
`
