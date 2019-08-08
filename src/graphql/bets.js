import gql from 'graphql-tag';

export const BETS_LIST_QUERY = gql`
  query bets ($kind: String = null, $status: String = null, $page: Int, $perPage: Int) {
    bets (kind: $kind, status: $status, page: $page, perPage: $perPage) {
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
